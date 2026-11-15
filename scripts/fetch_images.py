import urllib.request, urllib.parse, json, concurrent.futures, ssl

QUERIES = {
    # London Hero & Hotel & Sights
    "london_hero": "Big Ben Palace of Westminster London twilight",
    "langham_london": "Langham Hotel Portland Place London",
    "regent_street_lights": "Regent Street Christmas lights London",
    "burlington_arcade": "Burlington Arcade London interior",
    "bond_street": "New Bond Street London luxury",
    "berkeley_square": "Berkeley Square Mayfair London",
    "borough_market": "Borough Market London stalls food",
    "tower_of_london": "Tower of London White Tower",
    "tower_bridge": "Tower Bridge London dusk",
    "thames_cruise": "Westminster Pier River Thames boat London",
    "hms_belfast": "HMS Belfast London",
    "shakespeares_globe": "Shakespeare's Globe London",
    "st_pauls_millennium": "Millennium Bridge St Paul's Cathedral London",
    # Tower of London Highlights
    "crown_jewels": "Imperial State Crown UK",
    "koh_i_noor": "Crown of Queen Elizabeth The Queen Mother",
    "white_tower_armour": "White Tower London Line of Kings armour",
    "yeoman_warder": "Yeoman Warder Tower of London",
    "tower_ravens": "Raven Tower of London",
    "beauchamp_tower": "Beauchamp Tower inscription London",
    # British Library Highlights
    "british_library": "British Library Piazza London",
    "kings_library": "King's Library British Library tower",
    "magna_carta": "Magna Carta British Library Cotton MS Augustus II.106",
    "shakespeare_first_folio": "First Folio Shakespeare title page 1623",
    "gutenberg_bible": "Gutenberg Bible page",
    "leonardo_notebook": "Codex Arundel Leonardo da Vinci",
    # British Museum Highlights
    "british_museum": "British Museum Great Court roof London",
    "rosetta_stone": "Rosetta Stone British Museum",
    "parthenon_marbles": "Elgin Marbles Parthenon British Museum",
    "assyrian_lion_hunt": "Dying lion Nineveh British Museum",
    "amaravati_india": "Amaravati stupa relief British Museum",
    "sutton_hoo": "Sutton Hoo helmet British Museum",
    "lewis_chessmen": "Lewis chessmen British Museum",
    # National Gallery Highlights
    "national_gallery": "National Gallery Trafalgar Square London",
    "van_eyck_turban": "Portrait of a Man in a Turban Jan van Eyck",
    "arnolfini_portrait": "The Arnolfini portrait Jan van Eyck",
    "van_eyck_leal_souvenir": "Léal Souvenir Jan van Eyck",
    "holbein_ambassadors": "The Ambassadors Hans Holbein the Younger",
    "fighting_temeraire": "The Fighting Temeraire Turner",
    "van_gogh_sunflowers": "Sunflowers Vincent van Gogh National Gallery",
    # Natural History Museum Highlights
    "nhm_london": "Natural History Museum London Hintze Hall blue whale",
    "nhm_exterior": "Natural History Museum London exterior",
    "stegosaurus_nhm": "Sophie the Stegosaurus Natural History Museum London",
    "trex_nhm": "Tyrannosaurus rex Natural History Museum London",
    "archaeopteryx_london": "Archaeopteryx lithographica London specimen",
    # V&A Highlights
    "va_museum": "Victoria and Albert Museum London courtyard",
    "va_cast_courts": "Cast Courts Victoria and Albert Museum",
    "raphael_cartoons": "Miraculous Draught of Fishes Raphael V&A",
    "tipus_tiger": "Tipu's Tiger Victoria and Albert Museum",
    "va_jewellery": "Queen Victoria sapphire and diamond coronet",
    "chihuly_va": "Dale Chihuly chandelier Victoria and Albert Museum",
    # Shopping Saturday
    "palm_court_tea": "Afternoon tea scones clotted cream London",
    "liberty_london": "Liberty department store Tudor building London",
    "carnaby_street": "Carnaby Street London arch lights",
    "harrods": "Harrods Knightsbridge exterior lights",
    "selfridges": "Selfridges Oxford Street London",
    # Cotswolds Sunday
    "stow_on_the_wold": "St Edward's Church Stow-on-the-Wold door yew trees",
    "lower_slaughter": "Old Mill Lower Slaughter Cotswolds",
    "bourton_on_the_water": "Bourton-on-the-Water River Windrush bridges",
    "royal_albert_hall": "Royal Albert Hall auditorium London",
    # Monday Wallace, Frameless, Faraday, Wilton's
    "wallace_collection": "Hertford House Wallace Collection London",
    "churchill_painting": "Winston Churchill painting Marrakech Chartwell",
    "fragonard_swing": "The Swing Jean-Honoré Fragonard",
    "laughing_cavalier": "Laughing Cavalier Frans Hals",
    "wallace_armoury": "Oriental Armoury Wallace Collection",
    "frameless_art": "The Great Wave off Kanagawa Hokusai",
    "royal_institution": "Royal Institution Albemarle Street London",
    "faraday_lab": "Michael Faraday laboratory Royal Institution",
    "faraday_ring": "Faraday electromagnetic induction ring Royal Institution",
    "wiltons_music_hall": "Wilton's Music Hall auditorium London",
    # Dining photos
    "indian_fine_dining": "Modern Indian fine dining scallops curry London",
    "raclette_borough": "Raclette melted cheese Borough Market",
    "neapolitan_pizza": "Pizza Margherita Napoletana",
    # Showcase Cities: Rome & Kyoto
    "rome_hero": "Colosseum Rome sunset",
    "vatican_school_athens": "School of Athens Raphael",
    "sistine_chapel": "Creation of Adam Michelangelo",
    "apollo_daphne": "Apollo and Daphne Bernini Galleria Borghese",
    "birth_of_venus": "Birth of Venus Botticelli",
    "carbonara_rome": "Spaghetti alla carbonara Rome",
    "kyoto_hero": "Kinkaku-ji Golden Pavilion Kyoto",
    "fushimi_inari": "Fushimi Inari-taisha torii gates Kyoto",
    "ryoan_ji": "Ryoan-ji rock garden Kyoto",
    "nishiki_market": "Nishiki Market Kyoto lanterns",
    "kaiseki_kyoto": "Kaiseki cuisine Kyoto",
}

def search_commons(key_query):
    key, query = key_query
    params = urllib.parse.urlencode({
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": "6",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|dimensions",
        "iiurlwidth": "960",
        "format": "json"
    })
    url = f"https://commons.wikimedia.org/w/api.php?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "MeridianTravelCompanion/1.0 (https://github.com/vedant)"})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            best = None
            # Sort by index if present
            sorted_pages = sorted(pages.values(), key=lambda p: p.get("index", 999))
            for p in sorted_pages:
                ii = p.get("imageinfo", [{}])[0]
                thumb = ii.get("thumburl") or ii.get("url")
                w = ii.get("width", 0)
                h = ii.get("height", 0)
                if thumb and w >= 450 and not thumb.lower().endswith(".tif") and not thumb.lower().endswith(".pdf"):
                    best = {
                        "url": thumb,
                        "title": p.get("title", "").replace("File:", ""),
                        "w": w, "h": h
                    }
                    break
            return key, best
    except Exception as e:
        return key, {"error": str(e)}

results = {}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    for k, res in ex.map(search_commons, QUERIES.items()):
        results[k] = res

ok = sum(1 for v in results.values() if v and "url" in v)
missing = [k for k, v in results.items() if not v or "url" not in v]
print(f"Resolved {ok}/{len(QUERIES)} images. Missing: {missing}")
with open("/home/vedant/src/meridian-travel/scripts/resolved_images.json", "w") as f:
    json.dump(results, f, indent=2)
