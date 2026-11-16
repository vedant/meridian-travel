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
 * Calls Gemini 4 Hydrogen on the server using the owner's API key via x-goog-api-key header.
 * Properly skips internal `thought: true` parts when extracting structured JSON output.
 */
export async function callHydrogenJson({
  systemInstruction,
  userPrompt,
  temperature = 0.4,
}) {
  const apiKey = getServerGeminiKey();
  if (!apiKey) {
    throw new Error('Server GEMINI_API_KEY is not configured.');
  }

  let lastError = null;
  const models = [...new Set(FALLBACK_MODELS)];

  for (const model of models) {
    try {
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
            generationConfig: {
              temperature,
              responseMimeType: 'application/json',
            },
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
    // Route external Wiki thumbnails through our own /api/image-proxy so Offline Vault can cache them cleanly with CORS!
    return `/api/image-proxy?url=${encodeURIComponent(thumb)}`;
  } catch {
    return null;
  }
}

export function buildStandardStopLinks({ name, city, lat, lng, tripadvisorUrl, officialUrl }) {
  const q = encodeURIComponent(`${name} ${city || ''}`.trim());
  const links = [
    {
      label: 'TripAdvisor',
      platform: 'tripadvisor',
      url: tripadvisorUrl || `https://www.tripadvisor.com/Search?q=${q}`,
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
  if (officialUrl) {
    links.push({ label: 'Official Website', platform: 'official', url: officialUrl });
  }
  return links;
}
