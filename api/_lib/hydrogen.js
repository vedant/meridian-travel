const DEFAULT_HYDROGEN_MODEL = process.env.HYDROGEN_MODEL || 'gemini-4-hydrogen';
const FALLBACK_MODELS = [
  DEFAULT_HYDROGEN_MODEL,
  'gemini-4-argon',
  'gemini-3.8-flash',
];

export function getServerGeminiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
}

/**
 * Resolves a Vertex/Google grounding redirect URL (`vertexaisearch.cloud.google.com/grounding-api-redirect/...`)
 * to its actual canonical destination URL via a fast 2.5s manual HEAD check.
 */
export async function resolveGroundingRedirectUrl(rawUri) {
  if (!rawUri || typeof rawUri !== 'string') return null;
  if (!rawUri.includes('grounding-api-redirect')) return rawUri;

  try {
    const resp = await fetch(rawUri, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(2500),
    });
    const loc = resp.headers.get('location');
    if (loc && loc.startsWith('http')) return loc;
  } catch {
    // Fall through to GET abort fallback if server blocks HEAD
  }

  try {
    const resp = await fetch(rawUri, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(2500),
    });
    const loc = resp.headers.get('location');
    if (loc && loc.startsWith('http')) return loc;
  } catch {
    // Ignore timeout
  }
  return rawUri;
}

/**
 * Pass 1: Runs Gemini 4 Hydrogen conditioned on LIVE Google Search (`tools: [{ googleSearch: {} }]`).
 * Note: Kept separate from `responseMimeType: "application/json"` because Gemini skips Google Search
 * execution when strict JSON MIME mode is forced in the same request.
 */
export async function runHydrogenWebSearchResearch({
  researchPrompt,
  thinkingLevel = 'LOW',
}) {
  const apiKey = getServerGeminiKey();
  if (!apiKey) {
    throw new Error('Server GEMINI_API_KEY is not configured.');
  }

  const models = [...new Set(FALLBACK_MODELS)];
  let lastError = null;

  for (const model of models) {
    try {
      const generationConfig = { temperature: 0.2 };
      if (model.startsWith('gemini-4') || model.startsWith('gemini-3')) {
        generationConfig.thinkingConfig = { thinkingLevel };
      }

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: researchPrompt }] }],
            tools: [{ googleSearch: {} }],
            generationConfig,
          }),
        }
      );

      if (!resp.ok) {
        const errBody = await resp.text().catch(() => '');
        lastError = `Search pass ${model} HTTP ${resp.status}: ${errBody.slice(0, 180)}`;
        continue;
      }

      const payload = await resp.json();
      const cand = payload?.candidates?.[0];
      const parts = cand?.content?.parts || [];
      const groundedBrief = [...parts]
        .filter((p) => typeof p?.text === 'string' && !p.thought)
        .map((p) => p.text)
        .join('\n')
        .trim();

      const gm = cand?.groundingMetadata || {};
      const searchQueries = Array.isArray(gm.webSearchQueries)
        ? gm.webSearchQueries
        : [];
      const rawChunks = Array.isArray(gm.groundingChunks)
        ? gm.groundingChunks.slice(0, 12)
        : [];

      const resolvedSources = (
        await Promise.all(
          rawChunks.map(async (ch) => {
            const uri = ch?.web?.uri;
            if (!uri) return null;
            const resolvedUrl = await resolveGroundingRedirectUrl(uri);
            return {
              title: ch?.web?.title || 'Web Source',
              url: resolvedUrl || uri,
            };
          })
        )
      ).filter(Boolean);

      // Deduplicate by URL
      const seenUrls = new Set();
      const uniqueSources = [];
      for (const src of resolvedSources) {
        if (!seenUrls.has(src.url)) {
          seenUrls.add(src.url);
          uniqueSources.push(src);
        }
      }

      return {
        groundedBrief,
        searchQueries,
        sources: uniqueSources,
        modelUsed: model,
      };
    } catch (err) {
      lastError = err.message;
    }
  }

  // Graceful fallback so transient search errors don't break editing
  return {
    groundedBrief: '',
    searchQueries: [],
    sources: [],
    modelUsed: DEFAULT_HYDROGEN_MODEL,
    searchWarning: lastError,
  };
}

/**
 * Calls Gemini 4 Hydrogen on the server using the owner's API key via x-goog-api-key header.
 * Properly skips internal `thought: true` parts when extracting structured JSON output.
 */
export async function callHydrogenJson({
  systemInstruction,
  userPrompt,
  temperature = 0.35,
  thinkingLevel = 'LOW',
}) {
  const apiKey = getServerGeminiKey();
  if (!apiKey) {
    throw new Error('Server GEMINI_API_KEY is not configured.');
  }

  let lastError = null;
  const models = [...new Set(FALLBACK_MODELS)];

  for (const model of models) {
    try {
      const generationConfig = {
        temperature,
        responseMimeType: 'application/json',
      };
      if (model.startsWith('gemini-4') || model.startsWith('gemini-3')) {
        generationConfig.thinkingConfig = { thinkingLevel };
      }

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            ...(systemInstruction
              ? { systemInstruction: { parts: [{ text: systemInstruction }] } }
              : {}),
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig,
          }),
        }
      );

      if (!resp.ok) {
        const errBody = await resp.text().catch(() => '');
        lastError = `Model ${model} HTTP ${resp.status}: ${errBody.slice(0, 180)}`;
        continue;
      }

      const payload = await resp.json();
      const parts = payload?.candidates?.[0]?.content?.parts || [];
      const textPart = [...parts]
        .reverse()
        .find((p) => typeof p?.text === 'string' && !p.thought);

      if (textPart?.text) {
        return {
          data: JSON.parse(textPart.text),
          modelUsed: model,
        };
      }
      lastError = `Model ${model} returned empty text`;
    } catch (err) {
      lastError = err.message;
    }
  }

  throw new Error(lastError || 'Hydrogen model invocation failed.');
}

export async function fetchWikiImage(searchQuery) {
  if (!searchQuery) return null;
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      searchQuery
    )}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=900&format=json&origin=*`;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'MeridianTravelCompanion/2.0' },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const first = Object.values(pages)[0];
    const thumb = first?.thumbnail?.source;
    if (!thumb) return null;
    return `/api/image-proxy?url=${encodeURIComponent(thumb)}`;
  } catch {
    return null;
  }
}

export function buildStandardStopLinks({
  name,
  city,
  lat,
  lng,
  tripadvisorUrl,
  michelinUrl,
  openTableUrl,
  timeOutUrl,
  officialUrl,
  groundedSources = [],
}) {
  const q = encodeURIComponent(`${name} ${city || ''}`.trim());

  // Automatically pick up canonical verified URLs from Google Search grounding sources when available!
  const findGroundedUrl = (domainSubstring) =>
    groundedSources.find(
      (s) =>
        typeof s?.url === 'string' &&
        s.url.toLowerCase().includes(domainSubstring) &&
        !s.url.includes('grounding-api-redirect')
    )?.url || null;

  const resolvedTa =
    (tripadvisorUrl && tripadvisorUrl.includes('tripadvisor.') ? tripadvisorUrl : null) ||
    findGroundedUrl('tripadvisor.') ||
    `https://www.tripadvisor.com/Search?q=${q}`;

  const resolvedMichelin =
    (michelinUrl && michelinUrl.includes('michelin.') ? michelinUrl : null) ||
    findGroundedUrl('guide.michelin.');

  const resolvedTimeOut =
    (timeOutUrl && timeOutUrl.includes('timeout.com') ? timeOutUrl : null) ||
    findGroundedUrl('timeout.com');

  const resolvedOpenTable =
    (openTableUrl && openTableUrl.includes('opentable.') ? openTableUrl : null) ||
    findGroundedUrl('opentable.');

  const excludedDomains = [
    'tripadvisor.',
    'michelin.',
    'timeout.com',
    'opentable.',
    'wikipedia.org',
    'reddit.com',
    'yelp.',
    'instagram.com',
    'tiktok.com',
    'facebook.com',
  ];
  const resolvedOfficial =
    (officialUrl && officialUrl.startsWith('http') ? officialUrl : null) ||
    groundedSources.find(
      (s) =>
        typeof s?.url === 'string' &&
        s.url.startsWith('http') &&
        !s.url.includes('grounding-api-redirect') &&
        !excludedDomains.some((d) => s.url.toLowerCase().includes(d))
    )?.url ||
    null;

  const links = [
    {
      label: 'TripAdvisor',
      platform: 'tripadvisor',
      url: resolvedTa,
    },
    {
      label: 'Google Reviews & Map',
      platform: 'google',
      url: `https://www.google.com/maps/search/?api=1&query=${q}`,
    },
    {
      label: 'Apple Maps (iOS)',
      platform: 'apple',
      url:
        typeof lat === 'number' && typeof lng === 'number'
          ? `https://maps.apple.com/?q=${q}&ll=${lat},${lng}&dirflg=w`
          : `https://maps.apple.com/?q=${q}`,
    },
  ];

  if (resolvedMichelin) {
    links.push({
      label: 'Michelin Guide',
      platform: 'michelin',
      url: resolvedMichelin,
    });
  }
  if (resolvedOpenTable) {
    links.push({
      label: 'Reserve / OpenTable',
      platform: 'opentable',
      url: resolvedOpenTable,
    });
  }
  if (resolvedTimeOut) {
    links.push({
      label: 'Time Out',
      platform: 'timeout',
      url: resolvedTimeOut,
    });
  }
  if (resolvedOfficial) {
    links.push({
      label: 'Official Website',
      platform: 'official',
      url: resolvedOfficial,
    });
  }
  return links;
}
