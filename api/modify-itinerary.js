import {
  runHydrogenWebSearchResearch,
  callHydrogenJson,
  fetchWikiImage,
  buildStandardStopLinks,
} from './_lib/hydrogen.js';

async function hydrateStopMedia(
  stop,
  city,
  fallbackImage = '/images/london_hero.jpg',
  grounding = null
) {
  if (!stop.id) {
    stop.id = `stop-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
  }
  if (!stop.image || stop.wikiImageQuery) {
    const wikiImg = await fetchWikiImage(
      stop.wikiImageQuery || `${stop.title} ${city || ''}`
    );
    stop.image = wikiImg || stop.image || fallbackImage;
  }

  const groundedSources = grounding?.sources || [];
  stop.links = buildStandardStopLinks({
    name: stop.title,
    city,
    lat: stop.coordinates?.lat,
    lng: stop.coordinates?.lng,
    tripadvisorUrl: stop.tripadvisorUrl,
    michelinUrl: stop.michelinUrl,
    openTableUrl: stop.openTableUrl,
    timeOutUrl: stop.timeOutUrl,
    officialUrl: stop.officialUrl,
    groundedSources,
  });

  if (grounding && (grounding.searchQueries?.length || groundedSources.length)) {
    stop.webGrounding = {
      grounded: true,
      modelUsed: grounding.modelUsed,
      searchQueries: grounding.searchQueries || [],
      sources: groundedSources
        .filter((s) => !s.url.includes('grounding-api-redirect'))
        .slice(0, 6),
    };
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

    // =========================================================================
    // MODE A: ADD & ENRICH STOP ON THE FLY (2-Pass Live Google Search + Hydrogen)
    // =========================================================================
    if (action === 'enrich_stop') {
      if (!stopRequest || stopRequest.trim().length < 2) {
        return res
          .status(400)
          .json({ error: 'Please describe the stop to add.' });
      }

      // Pass 1: Live Google Search Grounding via Gemini 4 Hydrogen
      const research = await runHydrogenWebSearchResearch({
        researchPrompt: `Use Google Search to research live, accurate details for this itinerary addition in ${city}${
          country ? `, ${country}` : ''
        } (date context: ${dayContext?.fullDate || '2026'}):
User request: "${stopRequest}"

Find and verify:
1. Exact venue name, street address, neighborhood, nearest transit/Tube station, and current opening hours / status.
2. If a museum, gallery, historic landmark, or tour: top 3–4 must-see highlights/artworks, their exact gallery/floor/room locations, and any current temporary exhibitions.
3. If a restaurant, café, afternoon tea, bar, or food market: Michelin/TripAdvisor accolades and the top 4–5 signature or viral dishes featured on TripAdvisor, Michelin Guide, Eater, The Infatuation, and food social media.
4. If a shopping venue: price tier, flagship brands/departments, and standout features.
5. Canonical TripAdvisor URL, Michelin Guide URL (if applicable), and Official Website URL.`,
      });

      const sourcesListText = (research.sources || [])
        .map((s) => `- ${s.title}: ${s.url}`)
        .join('\n');

      // Pass 2: Structured Meridian JSON Synthesis conditioned on live web research
      const systemInstruction = `You are Meridian's real-time itinerary concierge powered by Gemini 4 Hydrogen.
Condition strictly on the LIVE WEB SEARCH FINDINGS and VERIFIED URLS provided below to create a rich, factually grounded stop object for ${city}${
        country ? `, ${country}` : ''
      }.
Rules:
1. Incorporate real opening hours, current exhibitions, exact street addresses, and authentic critic/reviewer notes from the web research.
2. If the stop is a museum, gallery, historic landmark, cathedral, palace, or guided walk, populate "museumTour" with 3-4 specific room/area highlights, exact floor/gallery locations, "lookClosely" visual details, and an engaging 85-110 word spoken "audioScript" for each highlight. Omit "diningGuide" unless it's also a food market.
3. If the stop is a restaurant, café, bar, afternoon tea, or food market, populate "diningGuide" with 3-5 real internet-featured dishes found in the web search, explaining why diners and critics rave about them.
4. If the stop is a shopping street, boutique, or department store, populate "shoppingGuide" with priceTier, bestFor, and 2-3 flagship highlights.
5. Populate "tripadvisorUrl", "michelinUrl", and "officialUrl" ONLY from the verified URLs list if present (otherwise set null).
6. Return ONLY valid JSON:
{
  "stop": {
    "id": "slug",
    "time": "e.g. 2:00–3:30 p.m.",
    "title": "Venue Name",
    "subtitle": "Short evocative subtitle",
    "category": "museum | dining | shopping | historic | performance | scenic | hotel | transit",
    "bookingStatus": "confirmed | proposed | action_needed | included",
    "neighborhood": "Neighborhood",
    "address": "Verified street address",
    "coordinates": { "lat": 0.0, "lng": 0.0 },
    "walkOrTransit": "Practical transit or walking tip + current hours note",
    "wikiImageQuery": "Wikipedia photo search query",
    "summary": "2-3 sentence rich overview grounded in search results",
    "insiderTips": ["Practical grounded tip 1", "Practical grounded tip 2"],
    "tripadvisorUrl": null,
    "michelinUrl": null,
    "officialUrl": null,
    "museumTour": {
      "tourTitle": "Curated Highlights Audio Tour",
      "routeStrategy": "Floor/room sequence",
      "introTranscript": "70-90 word spoken introduction",
      "highlights": [
        {
          "id": "slug",
          "order": 1,
          "title": "Artwork or Room Highlight",
          "artistOrOrigin": "Artist / Period",
          "location": "Exact Floor / Wing / Gallery",
          "durationMinutes": 12,
          "wikiImageQuery": "Wikipedia search query",
          "summary": "Why it matters",
          "lookClosely": "Visual detail to spot",
          "audioScript": "85-110 word spoken audiobook script"
        }
      ]
    },
    "diningGuide": {
      "cuisine": "Cuisine style",
      "priceRange": "£££",
      "accolades": ["Michelin / TripAdvisor accolades from search"],
      "vibe": "Atmosphere description",
      "featuredDishes": [
        {
          "name": "Exact Dish Name",
          "badge": "Signature / Internet Favorite / Michelin Pick",
          "description": "Why critics & reviewers rave about this dish",
          "dietary": "Meat / Seafood / Vegetarian / Dessert"
        }
      ]
    },
    "shoppingGuide": {
      "priceTier": "££££",
      "bestFor": "What to shop for here",
      "walkFromHotel": "Transit or walk note",
      "highlights": [
        {
          "storeName": "Boutique or Department",
          "category": "Specialty",
          "mustSee": "Standout items",
          "locationNote": "Floor or street corner"
        }
      ]
    }
  },
  "insertIndex": null
}
(Set museumTour, diningGuide, or shoppingGuide to null when not applicable to the stop's category — NEVER leave diningGuide null for a restaurant/café/market, and NEVER leave museumTour null for a museum/gallery/landmark!)`;

      const existingSummary = (dayContext?.stops || [])
        .map((s, i) => `${i}: [${s.time}] ${s.title}`)
        .join('\n');

      const { data, modelUsed } = await callHydrogenJson({
        systemInstruction,
        userPrompt: `Day: ${dayContext?.fullDate || 'Selected Day'} (${
          dayContext?.title || ''
        })
Existing stops on this day:
${existingSummary || '(none)'}

Traveler's request: "${stopRequest}"

=== LIVE WEB SEARCH FINDINGS ===
${research.groundedBrief || '(No external search summary available; use verified knowledge)'}

=== VERIFIED WEB URLS FROM SEARCH ===
${sourcesListText || '(none)'}

Determine the best chronological "insertIndex" (0-based integer, or null to append at end) and generate the complete "stop" object.`,
        temperature: 0.3,
      });

      if (!data?.stop?.title) {
        throw new Error('Hydrogen returned an incomplete stop.');
      }

      if (!data.stop.museumTour) delete data.stop.museumTour;
      if (!data.stop.diningGuide) delete data.stop.diningGuide;
      if (!data.stop.shoppingGuide) delete data.stop.shoppingGuide;

      const hydratedStop = await hydrateStopMedia(
        data.stop,
        city,
        heroImage,
        research
      );
      return res.status(200).json({
        stop: hydratedStop,
        insertIndex:
          typeof data.insertIndex === 'number' ? data.insertIndex : null,
        modelUsed,
        webGrounding: {
          grounded: Boolean(research.searchQueries?.length),
          searchQueries: research.searchQueries || [],
          sourceCount: research.sources?.length || 0,
        },
      });
    }

    // =========================================================================
    // MODE B: NATURAL-LANGUAGE ITINERARY UPDATE (2-Pass Live Search + Hydrogen)
    // =========================================================================
    if (action === 'natural_edit') {
      if (!instruction || !dayContext) {
        return res.status(400).json({
          error: 'Provide both dayContext and modification instruction.',
        });
      }

      const compactStops = (dayContext.stops || []).map((s) => ({
        existingStopId: s.id,
        time: s.time,
        title: s.title,
        subtitle: s.subtitle,
        category: s.category,
        bookingStatus: s.bookingStatus,
        neighborhood: s.neighborhood,
      }));

      // Pass 1: Live Google Search Grounding for any new venues, hours, exhibitions, or dishes implied by the edit!
      const research = await runHydrogenWebSearchResearch({
        researchPrompt: `A traveler in ${city}${
          country ? `, ${country}` : ''
        } on ${dayContext.fullDate || 'their trip'} is modifying their itinerary on the fly:
Modification request: "${instruction}"

Current stops on that day: ${compactStops.map((s) => `${s.time} ${s.title}`).join(' | ')}

Use Google Search to verify live facts for any newly requested or affected venues in ${city}:
- Exact venue names, street addresses, neighborhoods, transit links, and opening hours on ${
          dayContext.fullDate || 'that day'
        }.
- For any new museum/landmark: top 3 gallery/room highlights, exact locations, and current exhibitions.
- For any new restaurant/café/bar/tea spot: top 3–5 internet-featured signature dishes (TripAdvisor, Michelin, Eater, Infatuation) and reservation notes.
- Canonical TripAdvisor, Michelin Guide, and Official Website URLs.`,
      });

      const sourcesListText = (research.sources || [])
        .map((s) => `- ${s.title}: ${s.url}`)
        .join('\n');

      // Pass 2: Structured Day Reconstruction preserving untouched stops' offline assets while grounding new ones
      const systemInstruction = `You are Meridian's live itinerary editor powered by Gemini 4 Hydrogen, conditioned on LIVE WEB SEARCH FINDINGS.
Modify a day's itinerary in ${city} according to the traveler's request.
CRITICAL PRESERVATION RULE:
- For any existing stop that stays in the schedule (even if its "time", "bookingStatus", or order changes), return an entry with "keepExistingId": "<existingStopId>" plus any updated fields ("time", "bookingStatus", "titleOverride", "summaryOverride"). That preserves its offline photos & studio MP3 audio!
- For any BRAND NEW stop being added, omit "keepExistingId" and provide a full "newStop" object grounded in the LIVE WEB SEARCH FINDINGS below (with accurate coordinates, verified address, hours tip, summary, insiderTips, wikiImageQuery, tripadvisorUrl/michelinUrl/officialUrl from verified URLs if matched, and museumTour with 3 highlights + audioScripts if museum/historic, or diningGuide with 3-5 real featuredDishes if dining, or shoppingGuide if shopping).
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
      "newStop": {
        "id": "slug",
        "time": "e.g. 1:30–3:00 p.m.",
        "title": "Venue Name",
        "subtitle": "Subtitle",
        "category": "museum | dining | shopping | historic | performance | scenic | hotel | transit",
        "bookingStatus": "included",
        "neighborhood": "Neighborhood",
        "address": "Verified street address",
        "coordinates": { "lat": 0.0, "lng": 0.0 },
        "walkOrTransit": "Transit + opening hours note",
        "wikiImageQuery": "Wikipedia photo query",
        "summary": "2-3 sentence grounded overview",
        "insiderTips": ["Tip 1", "Tip 2"],
        "tripadvisorUrl": null,
        "michelinUrl": null,
        "officialUrl": null,
        "museumTour": {
          "tourTitle": "Highlights Audio Tour",
          "routeStrategy": "Route",
          "introTranscript": "70-90 word intro",
          "highlights": [
            {
              "id": "h1",
              "order": 1,
              "title": "Highlight",
              "artistOrOrigin": "Period",
              "location": "Floor / Room",
              "durationMinutes": 12,
              "wikiImageQuery": "Query",
              "summary": "Summary",
              "lookClosely": "Detail",
              "audioScript": "85-110 word spoken script"
            }
          ]
        },
        "diningGuide": {
          "cuisine": "Cuisine",
          "priceRange": "£££",
          "accolades": ["Accolades"],
          "vibe": "Vibe",
          "featuredDishes": [
            {
              "name": "Dish Name",
              "badge": "Internet Favorite",
              "description": "Why diners rave about it",
              "dietary": "Category"
            }
          ]
        },
        "shoppingGuide": null
      }
    }
  ]
}
(For kept stops, set "newStop": null. For new stops, set museumTour, diningGuide, or shoppingGuide to null when not applicable to that stop's category.)`;

      const { data, modelUsed } = await callHydrogenJson({
        systemInstruction,
        userPrompt: `City: ${city}
Current Day: ${dayContext.fullDate} — ${dayContext.title}
Current Stops:
${JSON.stringify(compactStops, null, 2)}

Traveler's On-the-Fly Modification Request:
"${instruction}"

=== LIVE WEB SEARCH FINDINGS ===
${research.groundedBrief || '(No external search summary)'}

=== VERIFIED WEB URLS FROM SEARCH ===
${sourcesListText || '(none)'}`,
        temperature: 0.3,
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
          // Scope grounded sources relevant to this newStop so multiple added stops don't cross-wire links
          const stopWords = ns.title
            .toLowerCase()
            .split(/\W+/)
            .filter((w) => w.length > 3);
          const relevantSources = (research.sources || []).filter((s) =>
            stopWords.some((w) =>
              `${s.title} ${s.url}`.toLowerCase().includes(w)
            )
          );
          const hydrated = await hydrateStopMedia(ns, city, heroImage, {
            ...research,
            sources: relevantSources.length ? relevantSources : research.sources,
          });
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
        webGrounding: {
          grounded: Boolean(research.searchQueries?.length),
          searchQueries: research.searchQueries || [],
          sourceCount: research.sources?.length || 0,
        },
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || 'Failed to modify itinerary' });
  }
}
