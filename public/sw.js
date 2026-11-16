const CACHE_SHELL = 'meridian-shell-v2';
const CACHE_MEDIA = 'meridian-media-v2';

// Replaced at build time by scripts/inject-sw-manifest.mjs with exact hashed JS/CSS bundle URLs
const PRECACHE_SHELL = /* __PRECACHE_MANIFEST__ */ [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_SHELL).then(async (cache) => {
      for (const url of PRECACHE_SHELL) {
        try {
          await cache.add(url);
        } catch {
          // Ignore individual optional asset failure during install
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_SHELL && k !== CACHE_MEDIA)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/**
 * Serves RFC-compliant 206 Partial Content byte-range slices from a cached full Audio Response.
 * Essential for iOS Safari / WebKit <audio>, which sends `Range: bytes=0-` on every audio play!
 */
async function serveAudioWithRangeSupport(request) {
  const cleanUrl = request.url;
  const mediaCache = await caches.open(CACHE_MEDIA);
  let cachedResp = await mediaCache.match(cleanUrl);

  if (!cachedResp) {
    try {
      // Fetch full audio file without Range header so we can store the complete file in CacheStorage
      const fullFetch = await fetch(cleanUrl);
      if (fullFetch.ok && fullFetch.status === 200) {
        await mediaCache.put(cleanUrl, fullFetch.clone());
        cachedResp = fullFetch;
      } else {
        return fetch(request);
      }
    } catch {
      return new Response('Offline audio unavailable', { status: 503 });
    }
  }

  const rangeHeader = request.headers.get('range');
  const contentType = cachedResp.headers.get('content-type') || 'audio/mpeg';
  const buf = await cachedResp.arrayBuffer();
  const total = buf.byteLength;

  if (!rangeHeader) {
    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(total),
        'Accept-Ranges': 'bytes',
      },
    });
  }

  const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
  if (!match) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` },
    });
  }

  const start = parseInt(match[1], 10);
  const end = match[2] ? Math.min(parseInt(match[2], 10), total - 1) : total - 1;

  if (start >= total || start > end) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` },
    });
  }

  const chunk = buf.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    headers: {
      'Content-Type': contentType,
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': String(chunk.byteLength),
    },
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Audio files (/audio/* or cached synthetic /offline-tts/*) — full 206 Range offline support!
  if (
    url.pathname.startsWith('/audio/') ||
    url.pathname.startsWith('/offline-tts/')
  ) {
    event.respondWith(serveAudioWithRangeSupport(request));
    return;
  }

  // 2. Live API endpoints (except /api/image-proxy which IS offline-cached!)
  if (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/image-proxy')) {
    return;
  }

  // 3. Cache-first for itinerary images, icons, proxied images, fonts & map tiles
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/api/image-proxy') ||
    url.hostname.includes('basemaps.cartocdn.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.open(CACHE_MEDIA).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh && (fresh.ok || fresh.type === 'opaque')) {
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return cached || new Response('', { status: 504 });
        }
      })
    );
    return;
  }

  // 4. App Shell & JS/CSS bundles: Stale-While-Revalidate / Offline-First
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_SHELL).then(async (cache) => {
        const isNav = request.mode === 'navigate';
        const cached = isNav
          ? (await cache.match('/index.html')) || (await cache.match('/')) || (await cache.match(request))
          : await cache.match(request);

        const networkPromise = fetch(request)
          .then((fresh) => {
            if (fresh && fresh.status === 200) {
              cache.put(isNav ? '/index.html' : request, fresh.clone());
            }
            return fresh;
          })
          .catch(() => null);

        if (cached) {
          event.waitUntil(networkPromise);
          return cached;
        }
        const netResp = await networkPromise;
        if (netResp) return netResp;
        return (await cache.match('/index.html')) || (await cache.match('/')) || new Response('Offline', { status: 503 });
      })
    );
  }
});
