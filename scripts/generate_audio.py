import asyncio, json, os, subprocess

JOBS_PATH = "/home/vedant/src/meridian-travel/scripts/audio_jobs.json"
PUB_DIR = "/home/vedant/src/meridian-travel/public"
EDGE_TTS = "/home/vedant/.local/bin/edge-tts"

async def synth_one(sem, idx, total, job):
    rel = job["url"].lstrip("/")
    out_path = os.path.join(PUB_DIR, rel)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    if os.path.exists(out_path) and os.path.getsize(out_path) > 4000:
        return True

    raw_path = f"/tmp/meridian_tts_{idx}.mp3"
    voice = job.get("voice") or "en-GB-RyanNeural"
    text = job["text"]

    async with sem:
        for attempt in range(3):
            proc = await asyncio.create_subprocess_exec(
                EDGE_TTS, "--voice", voice, "--text", text, "--write-media", raw_path,
                stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.PIPE
            )
            _, err = await proc.communicate()
            if proc.returncode == 0 and os.path.exists(raw_path) and os.path.getsize(raw_path) > 3000:
                # Re-encode to crisp 48k mono 24kHz MP3 for tiny footprint & iOS Safari compatibility
                subprocess.run(
                    ["ffmpeg", "-y", "-loglevel", "error", "-i", raw_path, "-ac", "1", "-ar", "24000", "-b:a", "48k", out_path],
                    check=True
                )
                os.remove(raw_path)
                if (idx + 1) % 10 == 0 or idx + 1 == total:
                    print(f"[{idx+1}/{total}] Synthesized {rel}", flush=True)
                return True
            await asyncio.sleep(1.0 * (attempt + 1))
        print(f"FAILED {rel}", flush=True)
        return False

async def main():
    jobs = json.load(open(JOBS_PATH))
    sem = asyncio.Semaphore(6)
    res = await asyncio.gather(*(synth_one(sem, i, len(jobs), j) for i, j in enumerate(jobs)))
    print(f"Completed {sum(res)}/{len(jobs)} MP3 tracks!", flush=True)

asyncio.run(main())
