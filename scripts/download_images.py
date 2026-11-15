import json, os, time, urllib.request, urllib.parse, subprocess

OUT_DIR = "/home/vedant/src/meridian-travel/public/images"
os.makedirs(OUT_DIR, exist_ok=True)

resolved = json.load(open("/home/vedant/src/meridian-travel/scripts/resolved_images.json"))

# Wikipedia REST summary page fallbacks (zero rate limits, canonical lead images!)
WIKI_PAGES = {
    "va_jewellery": "Crown_of_Queen_Victoria",
    "carnaby_street": "Carnaby_Street",
    "churchill_painting": "Chartwell",
    "faraday_ring": "Faraday%27s_law_of_induction",
    "wiltons_music_hall": "Wilton%27s_Music_Hall",
    "indian_fine_dining": "Indian_cuisine",
    "raclette_borough": "Raclette",
    "butter_chicken": "Butter_chicken",
    "scones_tea": "Cream_tea",
    "fish_and_chips": "Fish_and_chips",
    "sausage_roll": "Sausage_roll",
    "bloomsbury_london": "Bloomsbury",
    "heathrow_airport": "Heathrow_Airport",
    "national_theatre": "Royal_National_Theatre",
    "oxford_street": "Oxford_Street",
    "covent_garden": "Covent_Garden",
}

UA = "MeridianTravelCompanion/1.0 (https://github.com/vedant; travel-pwa)"

for k, page in WIKI_PAGES.items():
    if k not in resolved or not resolved[k] or "url" not in resolved[k]:
        try:
            req = urllib.request.Request(f"https://en.wikipedia.org/api/rest_v1/page/summary/{page}", headers={"User-Agent": UA})
            d = json.loads(urllib.request.urlopen(req, timeout=10).read().decode())
            img = (d.get("originalimage") or {}).get("source") or (d.get("thumbnail") or {}).get("source")
            if img:
                resolved[k] = {"url": img, "title": d.get("title", k)}
        except Exception as e:
            print("Wiki summary err", k, e)

json.dump(resolved, open("/home/vedant/src/meridian-travel/scripts/resolved_images.json", "w"), indent=2)

ok_count = 0
fail_keys = []
for k, info in resolved.items():
    dest = os.path.join(OUT_DIR, f"{k}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        ok_count += 1
        continue
    url = (info or {}).get("url")
    if not url:
        fail_keys.append(k)
        continue
    tmp = f"/tmp/img_{k}"
    success = False
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            raw = urllib.request.urlopen(req, timeout=15).read()
            with open(tmp, "wb") as f:
                f.write(raw)
            # Resize & convert to progressive JPEG max width 900px via ffmpeg
            r = subprocess.run(
                ["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-vf", "scale='min(900,iw)':-2", "-q:v", "5", dest],
                capture_output=True
            )
            if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 3000:
                success = True
                ok_count += 1
                if os.path.exists(tmp): os.remove(tmp)
                break
        except Exception as e:
            time.sleep(0.6 * (attempt + 1))
    if not success:
        fail_keys.append(k)
    time.sleep(0.18) # Gentle throttle so Wikimedia never 429s

print(f"Downloaded & optimized {ok_count}/{len(resolved)} local images. Failed: {fail_keys}")
