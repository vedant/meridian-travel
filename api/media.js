import { getServerGeminiKey } from './_lib/hydrogen.js';

const TTS_MODELS = ['gemini-3.8-flash-tts', 'gemini-2.5-flash-preview-tts'];

export default async function handler(req, res) {
  const action = req.query?.action || (req.method === 'GET' ? 'image' : 'tts');

  // 1. CORS-friendly Image Proxy so Offline Vault can cache external Wikimedia/Wikipedia thumbnails seamlessly!
  if (action === 'image' && req.method === 'GET') {
    const rawUrl = req.query?.url || '';
    if (!rawUrl) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }
    try {
      const parsed = new URL(rawUrl);
      const allowedHosts = [
        'upload.wikimedia.org',
        'commons.wikimedia.org',
        'en.wikipedia.org',
      ];
      if (
        !allowedHosts.some(
          (h) => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`)
        )
      ) {
        return res.status(403).json({ error: 'Host not permitted' });
      }
      const upstream = await fetch(parsed.toString(), {
        headers: { 'User-Agent': 'MeridianTravelCompanion/2.0' },
      });
      if (!upstream.ok) {
        return res.status(upstream.status).end();
      }
      const contentType = upstream.headers.get('content-type') || 'image/jpeg';
      const arrayBuf = await upstream.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(Buffer.from(arrayBuf));
    } catch (err) {
      return res.status(502).json({ error: err.message });
    }
  }

  // 2. Neural TTS Audio Synthesis on Server using Owner's API Key (for custom/modified stops so they work offline!)
  if (action === 'tts' && (req.method === 'POST' || req.method === 'GET')) {
    const apiKey = getServerGeminiKey();
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }
    const text =
      req.method === 'POST' ? req.body?.text : req.query?.text;
    const voiceName =
      (req.method === 'POST' ? req.body?.voice : req.query?.voice) || 'Charon';

    if (!text || String(text).trim().length < 2) {
      return res.status(400).json({ error: 'Missing text to synthesize' });
    }

    const cleanVoice = ['Charon', 'Kore', 'Puck', 'Fenrir', 'Aoede'].includes(
      voiceName
    )
      ? voiceName
      : voiceName.includes('Sonia')
      ? 'Aoede'
      : 'Charon';

    let lastErr = null;
    for (const model of TTS_MODELS) {
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
              contents: [{ parts: [{ text: String(text).slice(0, 1800) }] }],
              generationConfig: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: cleanVoice },
                  },
                },
              },
            }),
          }
        );
        if (!resp.ok) {
          lastErr = `TTS ${model} HTTP ${resp.status}`;
          continue;
        }
        const data = await resp.json();
        const inline = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (inline?.data) {
          const buf = Buffer.from(inline.data, 'base64');
          const mime = inline.mimeType || 'audio/wav';
          res.setHeader('Content-Type', mime);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('Accept-Ranges', 'bytes');
          return res.status(200).send(buf);
        }
      } catch (err) {
        lastErr = err.message;
      }
    }

    return res.status(502).json({ error: lastErr || 'TTS synthesis failed' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
