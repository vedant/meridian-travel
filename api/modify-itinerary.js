import {
  callHydrogenJson,
  fetchWikiImage,
  buildStandardStopLinks,
} from './_lib/hydrogen.js';

async function hydrateStopMedia(stop, city, fallbackImage = '/images/london_hero.jpg') {
  if (!stop.id) {
    stop.id = `stop-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  }
  if (!stop.image || stop.wikiImageQuery) {
    const wikiImg = await fetchWikiImage(
      stop.wikiImageQuery || `${stop.title} ${city || ''}`
    );
    stop.image = wikiImg || stop.image || fallbackImage;
  }
  if (!Array.isArray(stop.links) || stop.links.length === 0) {
    stop.links = buildStandardStopLinks({
      name: stop.title,
      city,
      lat: stop.coordinates?.lat,
      lng: stop.coordinates?.lng,
    });
  }
  if (stop.museumTour && Array.isArray(stop.museumTour.highlights)) {
    stop.museumTour.tourId =
      stop.museumTour.tourId || `tour-${stop.id}-${Date.now().toString(36)}`;
    for (const hl of stop.museumTour.highlights) {
      if (!hl.id) {
        hl.id = `hl-${Math.random().toString(36).slice(2, 7)}`;
      }
      if (!hl.image || hl.wikiImageQuery) {
        const hlImg = await fetchWikiImage(
          hl.wikiImageQuery || `${hl.title} ${stop.title}`
        );
        hl.image = hlImg || hl.image || stop.image;
      }
    }
  }
  return stop;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      action = 'enrich_stop',
      city = 'London',
      country = '',
      dayContext = null,
      stopRequest = '',
      instruction = '',
      heroImage = '/images/london_hero.jpg',
    } = req.body || {};

    if (action === 'enrich_stop') {
      if (!stopRequest || stopRequest.trim().length < 2) {
        return res.status(400).json({ error: 'Please describe the stop to add.' });
      }

      const systemInstruction = `You are Meridian's real-time itinerary concierge powered by Gemini 4 Hydrogen.
Create a single rich, historically & culturally detailed stop object for ${city}${country ? `, ${country}` : ''}.
Rules:
1. If the stop is a museum, gallery, historic landmark, cathedral, palace, or park tour, populate "museumTour" with 3-4 specific room/area highlights, exact locations, "lookClosely" details, and an engaging 80-110 word spoken "audioScript" for each highlight. Omit "diningGuide" unless it's also a food market.
2. If the stop is a restaurant, café, bar, afternoon tea, or food market, populate "diningGuide" with 3-5 internet-featured dishes raved about on TripAdvisor, Michelin, food blogs, and social media.
3. If the stop is a shopping street, boutique, or department store, populate "shoppingGuide" with priceTier, bestFor, and 2-3 flagship store highlights.
4. Include accurate coordinates { "lat": number, "lng": number } in ${city}.
5. Return ONLY valid JSON with shape:
{
  "stop": {
    "id": "slug",
    "time": "e.g. 2:00–3:30 p.m.",
    "title": "Venue Name",
    "subtitle": "Short evocative subtitle",
    "category": "museum | dining | shopping | historic | performance | scenic | hotel | transit",
    "bookingStatus": "confirmed | proposed | action_needed | included",
    "neighborhood": "Neighborhood",
    "address": "Full street address",
    "coordinates": { "lat": 0.0, "lng": 0.0 },
    "walkOrTransit": "Practical transit or walking tip",
    "wikiImageQuery": "Wikipedia photo search query",
    "summary": "2-3 sentence rich overview",
    "insiderTips": ["Practical tip 1", "Practical tip 2"],
    "museumTour": null,
    "diningGuide": null,
    "shoppingGuide": null
  },
  "insertIndex": null
}`;

      const existingSummary = (dayContext?.stops || [])
        .map((s, i) => `${i}: [${s.time}] ${s.title}`)
        .join('\n');

      const { data, modelUsed } = await callHydrogenJson({
        systemInstruction,
        userPrompt: `Day: ${dayContext?.fullDate || 'Selected Day'} (${dayContext?.title || ''})
Existing stops on this day:
${existingSummary || '(none)'}

User request for new stop: "${stopRequest}"
Determine the best chronological "insertIndex" (0-based integer, or null to append at end) and generate the complete "stop" object.`,
        temperature: 0.4,
      });

      if (!data?.stop?.title) {
        throw new Error('Hydrogen returned an incomplete stop.');
      }

      // Clean nulls
      if (!data.stop.museumTour) delete data.stop.museumTour;
      if (!data.stop.diningGuide) delete data.stop.diningGuide;
      if (!data.stop.shoppingGuide) delete data.stop.shoppingGuide;

      const hydratedStop = await hydrateStopMedia(data.stop, city, heroImage);
      return res.status(200).json({
        stop: hydratedStop,
        insertIndex:
          typeof data.insertIndex === 'number' ? data.insertIndex : null,
        modelUsed,
      });
    }

    if (action === 'natural_edit') {
      if (!instruction || !dayContext) {
        return res
          .status(400)
          .json({ error: 'Provide both dayContext and modification instruction.' });
      }

      // Send a compact representation of existing stops by ID so unchanged stops retain all local images & MP3s!
      const compactStops = (dayContext.stops || []).map((s) => ({
        existingStopId: s.id,
        time: s.time,
        title: s.title,
        subtitle: s.subtitle,
        category: s.category,
        bookingStatus: s.bookingStatus,
        neighborhood: s.neighborhood,
      }));

      const systemInstruction = `You are Meridian's live itinerary editor powered by Gemini 4 Hydrogen.
Modify a day's itinerary in ${city} according to the traveler's on-the-fly request.
CRITICAL PRESERVATION RULE:
- For any existing stop that stays in the schedule (even if its "time", "bookingStatus", or order changes), return an entry with "keepExistingId": "<existingStopId>" plus any updated fields ("time", "title", "subtitle", "bookingStatus", "summaryOverride"). That preserves its offline photos & studio MP3 audio!
- For any BRAND NEW stop being added, omit "keepExistingId" and provide a full "newStop" object (with coordinates, summary, insiderTips, wikiImageQuery, and museumTour with 3 highlights + audioScripts if museum/historic, or diningGuide with featuredDishes if dining, or shoppingGuide if shopping).
- Removed stops should simply be omitted from the output "plan" array.
Return ONLY valid JSON:
{
  "dayTitle": "Updated or original day title",
  "dayTheme": "Updated or original day theme",
  "changeSummary": "1 concise sentence explaining what changed",
  "plan": [
    {
      "keepExistingId": "existing-stop-id-if-kept",
      "time": "updated or original time",
      "bookingStatus": "updated or original status",
      "titleOverride": null,
      "summaryOverride": null,
      "newStop": null
    }
  ]
}`;

      const { data, modelUsed } = await callHydrogenJson({
        systemInstruction,
        userPrompt: `City: ${city}
Current Day: ${dayContext.fullDate} — ${dayContext.title}
Current Stops:
${JSON.stringify(compactStops, null, 2)}

Traveler's On-the-Fly Modification Request:
"${instruction}"`,
        temperature: 0.35,
      });

      const byId = new Map((dayContext.stops || []).map((s) => [s.id, s]));
      const rebuiltStops = [];

      for (const item of data?.plan || []) {
        if (item.keepExistingId && byId.has(item.keepExistingId)) {
          const orig = byId.get(item.keepExistingId);
          rebuiltStops.push({
            ...orig,
            time: item.time || orig.time,
            bookingStatus: item.bookingStatus || orig.bookingStatus,
            title: item.titleOverride || orig.title,
            summary: item.summaryOverride || orig.summary,
          });
        } else if (item.newStop && item.newStop.title) {
          const ns = item.newStop;
          if (!ns.museumTour) delete ns.museumTour;
          if (!ns.diningGuide) delete ns.diningGuide;
          if (!ns.shoppingGuide) delete ns.shoppingGuide;
          const hydrated = await hydrateStopMedia(ns, city, heroImage);
          rebuiltStops.push(hydrated);
        }
      }

      return res.status(200).json({
        updatedDay: {
          ...dayContext,
          title: data.dayTitle || dayContext.title,
          theme: data.dayTheme || dayContext.theme,
          stops: rebuiltStops,
        },
        changeSummary: data.changeSummary || 'Updated itinerary schedule.',
        modelUsed,
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || 'Failed to modify itinerary' });
  }
}
