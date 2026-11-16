const CACHE_MEDIA = 'meridian-media-v2';
const CACHE_SHELL = 'meridian-shell-v2';
const IDB_NAME = 'meridian_offline_db';
const IDB_STORE = 'itineraries';

function openOfflineDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return resolve(null);
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveItineraryToIdb(itinerary) {
  try {
    const db = await openOfflineDb();
    if (!db || !itinerary?.id) return;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put({
        id: itinerary.id,
        itinerary,
        cachedAt: new Date().toISOString(),
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore IDB quota errors
  }
}

function latLngToTile(lat, lng, zoom) {
  const latRad = (lat * Math.PI) / 180;
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y, z: zoom };
}

/**
 * Collects every image, audio file, missing custom TTS script, and map tile
 * required to run `itinerary` 100% offline with zero internet.
 */
export function collectItineraryAssets(itinerary) {
  const images = new Set();
  const audioUrls = new Set();
  const ttsJobs = [];
  const coords = [];

  if (!itinerary) return { images: [], audioUrls: [], ttsJobs: [], mapTiles: [] };

  const addImg = (u) => {
    if (!u || typeof u !== 'string') return;
    if (u.startsWith('http') && u.includes('wikimedia.org')) {
      images.add(`/api/image-proxy?url=${encodeURIComponent(u)}`);
    } else {
      images.add(u);
    }
  };

  addImg(itinerary.heroImage);
  if (itinerary.baseHotel?.image) addImg(itinerary.baseHotel.image);
  if (itinerary.baseHotel?.coordinates?.lat) {
    coords.push(itinerary.baseHotel.coordinates);
  }

  const districts = Array.isArray(itinerary.shoppingAtlas)
    ? itinerary.shoppingAtlas
    : itinerary.shoppingAtlas?.districts || [];
  for (const d of districts) {
    if (d.image) addImg(d.image);
    if (d.coordinates?.lat) coords.push(d.coordinates);
  }

  for (const day of itinerary.days || []) {
    const stops = [
      ...(day.stops || []),
      ...(day.alternateTrack?.stops || []),
    ];
    for (const stop of stops) {
      if (stop.image) addImg(stop.image);
      if (stop.coordinates?.lat) coords.push(stop.coordinates);

      if (stop.museumTour) {
        const t = stop.museumTour;
        if (t.introAudioUrl) {
          audioUrls.add(t.introAudioUrl);
        } else if (t.introTranscript) {
          const synthKey = `/offline-tts/${t.tourId || stop.id}-intro.wav`;
          t.introAudioUrl = synthKey;
          ttsJobs.push({
            cachePath: synthKey,
            text: t.introTranscript,
            voice: t.voiceId || 'Charon',
          });
        }

        for (const hl of t.highlights || []) {
          if (hl.image) addImg(hl.image);
          if (hl.audioUrl) {
            audioUrls.add(hl.audioUrl);
          } else if (hl.audioScript) {
            const synthKey = `/offline-tts/${t.tourId || stop.id}-${hl.id || hl.order}.wav`;
            hl.audioUrl = synthKey;
            ttsJobs.push({
              cachePath: synthKey,
              text: hl.audioScript,
              voice: t.voiceId || 'Charon',
            });
          }
        }
      }
    }
  }

  // Compute z=13 & z=14 map tiles around stop coordinates (capped at 48 tiles so sync is fast & compact)
  const tileSet = new Set();
  for (const c of coords) {
    if (typeof c.lat === 'number' && typeof c.lng === 'number') {
      for (const z of [13, 14]) {
        const center = latLngToTile(c.lat, c.lng, z);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (tileSet.size < 48) {
              tileSet.add(
                `https://a.basemaps.cartocdn.com/rastertiles/voyager/${z}/${center.x + dx}/${center.y + dy}.png`
              );
            }
          }
        }
      }
    }
  }

  return {
    images: [...images],
    audioUrls: [...audioUrls],
    ttsJobs,
    mapTiles: [...tileSet],
  };
}

/**
 * Checks whether an itinerary's core media assets (photos + audio) are already cached offline.
 */
export async function getItineraryOfflineStatus(itinerary) {
  if (typeof caches === 'undefined' || !itinerary) {
    return { ready: false, cached: 0, total: 0 };
  }
  const { images, audioUrls } = collectItineraryAssets(itinerary);
  const coreUrls = [...images, ...audioUrls];
  if (coreUrls.length === 0) return { ready: true, cached: 0, total: 0 };

  const cache = await caches.open(CACHE_MEDIA);
  let cachedCount = 0;
  for (const rawUrl of coreUrls) {
    const absUrl = new URL(rawUrl, window.location.origin).toString();
    const hit = await cache.match(absUrl);
    if (hit) cachedCount++;
  }

  return {
    ready: cachedCount >= coreUrls.length,
    cached: cachedCount,
    total: coreUrls.length,
    imageCount: images.length,
    audioCount: audioUrls.length,
  };
}

/**
 * Downloads & caches EVERY asset needed for `itinerary` (shell, JSON, photos, MP3s,
 * synthesized custom TTS audio, and map tiles) so the app works 100% offline.
 */
export async function offlineEntireItinerary(itinerary, onProgress = null) {
  if (typeof caches === 'undefined' || !itinerary) {
    return { ok: false, cached: 0, total: 0 };
  }

  await saveItineraryToIdb(itinerary);

  // Also ensure current HTML & JS/CSS bundles in DOM are stored in CACHE_SHELL
  try {
    const shellCache = await caches.open(CACHE_SHELL);
    const domAssets = [
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/favicon.svg',
      '/apple-touch-icon.png',
      ...Array.from(document.querySelectorAll('script[src], link[rel="stylesheet"]'))
        .map((el) => el.src || el.href)
        .filter((u) => u && u.startsWith(window.location.origin)),
    ];
    for (const u of domAssets) {
      const existing = await shellCache.match(u);
      if (!existing) {
        await fetch(u)
          .then((r) => r.ok && shellCache.put(u, r))
          .catch(() => {});
      }
    }
  } catch {
    // Ignore shell warm-up error
  }

  const { images, audioUrls, ttsJobs, mapTiles } = collectItineraryAssets(itinerary);
  const mediaCache = await caches.open(CACHE_MEDIA);

  const tasks = [
    ...images.map((url) => ({ kind: 'image', url })),
    ...audioUrls.map((url) => ({ kind: 'audio', url })),
    ...ttsJobs.map((job) => ({ kind: 'tts', job })),
    ...mapTiles.map((url) => ({ kind: 'tile', url })),
  ];

  const total = tasks.length;
  let completed = 0;
  let cachedOk = 0;

  if (onProgress) onProgress({ completed: 0, total, percent: 0 });

  const CONCURRENCY = 5;
  let cursor = 0;

  async function worker() {
    while (cursor < tasks.length) {
      const item = tasks[cursor++];
      try {
        if (item.kind === 'tts') {
          const absKey = new URL(item.job.cachePath, window.location.origin).toString();
          const hit = await mediaCache.match(absKey);
          if (hit) {
            cachedOk++;
          } else if (navigator.onLine) {
            const resp = await fetch('/api/tts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                text: item.job.text,
                voice: item.job.voice,
              }),
            });
            if (resp.ok) {
              await mediaCache.put(absKey, resp.clone());
              cachedOk++;
            }
          }
        } else if (item.kind === 'tile') {
          const hit = await mediaCache.match(item.url);
          if (hit) {
            cachedOk++;
          } else if (navigator.onLine) {
            const req = new Request(item.url, { mode: 'cors' });
            const resp = await fetch(req);
            if (resp.ok) {
              await mediaCache.put(item.url, resp.clone());
              cachedOk++;
            }
          }
        } else {
          const absUrl = new URL(item.url, window.location.origin).toString();
          const hit = await mediaCache.match(absUrl);
          if (hit) {
            cachedOk++;
          } else if (navigator.onLine) {
            const resp = await fetch(absUrl);
            if (resp.ok && resp.status === 200) {
              await mediaCache.put(absUrl, resp.clone());
              cachedOk++;
            }
          }
        }
      } catch {
        // Individual network miss shouldn't abort remaining assets
      } finally {
        completed++;
        if (onProgress) {
          onProgress({
            completed,
            total,
            percent: total ? Math.round((completed / total) * 100) : 100,
          });
        }
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, tasks.length || 1) }, () => worker())
  );

  const coreStatus = await getItineraryOfflineStatus(itinerary);
  return {
    ok: coreStatus.ready,
    cached: coreStatus.cached,
    total: coreStatus.total,
    imageCount: images.length,
    audioCount: audioUrls.length + ttsJobs.length,
    tileCount: mapTiles.length,
  };
}

/**
 * Direct CacheStorage -> Blob ObjectURL lookup so <audio> plays reliably on iOS Safari
 * when completely offline even before a Service Worker reload!
 */
export async function getOfflineCachedAudioBlobUrl(audioUrl) {
  if (typeof caches === 'undefined' || !audioUrl) return null;
  try {
    const mediaCache = await caches.open(CACHE_MEDIA);
    const absUrl = new URL(audioUrl, window.location.origin).toString();
    const match = await mediaCache.match(absUrl);
    if (!match) return null;
    const blob = await match.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}
