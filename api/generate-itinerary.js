const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
];

async function fetchWikiImage(searchQuery) {
  if (!searchQuery) return '/images/london_hero.jpg';
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      searchQuery
    )}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=900&format=json&origin=*`;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'MeridianTravelCompanion/1.0' },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const pages = data?.query?.pages;
    if (!pages) return null;
    const first = Object.values(pages)[0];
    return first?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

function buildLinks({ name, city, lat, lng }) {
  const q = encodeURIComponent(`${name} ${city || ''}`.trim());
  return [
    {
      label: 'TripAdvisor',
      platform: 'tripadvisor',
      url: `https://www.tripadvisor.com/Search?q=${q}`,
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
        lat && lng
          ? `https://maps.apple.com/?q=${q}&ll=${lat},${lng}&dirflg=w`
          : `https://maps.apple.com/?q=${q}`,
    },
  ];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
    });
  }

  try {
    const { destinationPrompt = '', pastedText = '' } = req.body || {};
    const combinedInput = `${destinationPrompt}\n\n${pastedText}`.trim();
    if (!combinedInput || combinedInput.length < 4) {
      return res.status(400).json({ error: 'Please enter a destination or paste itinerary notes.' });
    }

    const systemInstruction = `You are Meridian, an elite cultural historian, museum docent, and culinary concierge.
Convert the user's destination request or pasted itinerary notes into a rich, structured JSON travel companion object.
Requirements:
1. Preserve all specific dates, venues, hotels, and preferences if the user pasted an itinerary; otherwise design an extraordinary 2-to-4 day cultural & culinary itinerary for the requested city.
2. For EVERY museum, gallery, temple, palace, or major monument stop, include a "museumTour" object with 3-4 specific room/area highlights, exact floor/gallery locations, what to look closely at, and an engaging 75-100 word spoken "audioScript" for each highlight so the app can play it as an audiobook tour.
3. For EVERY restaurant, food market, café, or dining stop, include a "diningGuide" object with 3-4 specific dishes highlighted/famous on the internet (TripAdvisor, Michelin, food blogs, social media) explaining why diners rave about them.
4. Provide accurate latitude and longitude coordinates ("lat", "lng") for the baseHotel and every stop.
5. Return ONLY valid JSON matching this structure:
{
  "id": "slug-id",
  "city": "City Name",
  "country": "Country",
  "region": "Neighborhoods covered",
  "title": "Evocative Trip Title",
  "subtitle": "Dates or Duration · Base Area",
  "travelers": "Custom Curated Companion",
  "dates": "Flexible or Specific Dates",
  "currency": "Currency Code & Symbol",
  "timezone": "Timezone",
  "wikiImageQuery": "Landmark search term for hero photo",
  "summary": "2-3 sentence editorial overview",
  "stats": [
    { "label": "Days", "value": "3" },
    { "label": "Audio Tours", "value": "3" },
    { "label": "Dining Guides", "value": "4" },
    { "label": "Highlights", "value": "15+" }
  ],
  "baseHotel": {
    "name": "Recommended Iconic Hotel",
    "address": "Full street address",
    "coordinates": { "lat": 0.0, "lng": 0.0 },
    "wikiImageQuery": "Hotel or neighborhood landmark",
    "notes": "Why this base works well"
  },
  "pendingReservations": [
    { "id": "res-1", "day": "Day 1", "title": "Key ticket or table to reserve", "status": "action_needed", "note": "Booking advice", "url": "https://www.tripadvisor.com" }
  ],
  "days": [
    {
      "id": "day-1",
      "dayNumber": 1,
      "dateLabel": "Day 1",
      "fullDate": "Day 1 Schedule",
      "title": "Day Title",
      "theme": "Focus of the day",
      "shoppingSummary": "Shopping or neighborhood browsing notes",
      "weatherTip": "Practical pacing or attire tip",
      "stops": [
        {
          "id": "stop-1",
          "time": "10:00 a.m.–12:00 p.m.",
          "title": "Venue Name",
          "subtitle": "Short descriptor",
          "category": "museum | dining | shopping | historic | performance | scenic | hotel",
          "bookingStatus": "confirmed | proposed | action_needed | included",
          "neighborhood": "District",
          "address": "Street address",
          "coordinates": { "lat": 0.0, "lng": 0.0 },
          "walkOrTransit": "How to get here",
          "wikiImageQuery": "Specific Wikipedia search query for photo",
          "summary": "Detailed 2-3 sentence engaging guide",
          "insiderTips": ["Tip 1", "Tip 2"],
          "museumTour": {
            "tourId": "unique-tour-slug",
            "tourTitle": "Curated Highlights Audio Tour",
            "narrator": "Meridian Cultural Audio Guide",
            "voiceId": "en-GB-RyanNeural",
            "totalDurationMinutes": 45,
            "routeStrategy": "How to move through the rooms",
            "introTranscript": "70-90 word spoken welcome to the venue",
            "highlights": [
              {
                "id": "h-1",
                "order": 1,
                "title": "Masterpiece or Highlight Name",
                "artistOrOrigin": "Artist / Period",
                "location": "Exact Floor / Wing / Gallery Room",
                "durationMinutes": 10,
                "wikiImageQuery": "Specific artwork or monument Wikipedia query",
                "summary": "Why it matters",
                "lookClosely": "Specific detail to spot",
                "audioScript": "85-110 word engaging spoken audiobook narration"
              }
            ]
          },
          "diningGuide": {
            "cuisine": "Cuisine style",
            "priceRange": "$$$",
            "accolades": ["Local Icon", "Highly Rated on TripAdvisor"],
            "vibe": "Atmosphere description",
            "featuredDishes": [
              {
                "name": "Dish Name",
                "badge": "Internet Favorite",
                "description": "Why reviewers and food lovers rave about this dish",
                "dietary": "Category"
              }
            ]
          }
        }
      ]
    }
  ]
}`;

    let rawJsonText = null;
    let lastErr = null;

    for (const model of GEMINI_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [
              {
                role: 'user',
                parts: [{ text: `Build a complete Meridian itinerary JSON for:\n${combinedInput}` }],
              },
            ],
            generationConfig: {
              temperature: 0.5,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (!response.ok) {
          lastErr = `Model ${model} HTTP ${response.status}`;
          continue;
        }
        const payload = await response.json();
        const candidateText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          rawJsonText = candidateText;
          break;
        }
      } catch (err) {
        lastErr = err.message;
      }
    }

    if (!rawJsonText) {
      return res.status(502).json({ error: `AI generation failed: ${lastErr || 'No response'}` });
    }

    const itinerary = JSON.parse(rawJsonText);
    itinerary.id = `${(itinerary.id || itinerary.city || 'custom').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
    itinerary.isCustom = true;

    // Resolve real Wikipedia photos in parallel
    const heroImg = await fetchWikiImage(itinerary.wikiImageQuery || itinerary.city);
    itinerary.heroImage = heroImg || '/images/london_hero.jpg';

    if (itinerary.baseHotel) {
      const hotelImg = await fetchWikiImage(itinerary.baseHotel.wikiImageQuery || `${itinerary.baseHotel.name} ${itinerary.city}`);
      itinerary.baseHotel.image = hotelImg || itinerary.heroImage;
      itinerary.baseHotel.links = buildLinks({
        name: itinerary.baseHotel.name,
        city: itinerary.city,
        lat: itinerary.baseHotel.coordinates?.lat,
        lng: itinerary.baseHotel.coordinates?.lng,
      });
    }

    for (const day of itinerary.days || []) {
      for (const stop of day.stops || []) {
        const stopImg = await fetchWikiImage(stop.wikiImageQuery || `${stop.title} ${itinerary.city}`);
        stop.image = stopImg || itinerary.heroImage;
        stop.links = buildLinks({
          name: stop.title,
          city: itinerary.city,
          lat: stop.coordinates?.lat,
          lng: stop.coordinates?.lng,
        });
        if (stop.museumTour && Array.isArray(stop.museumTour.highlights)) {
          for (const hl of stop.museumTour.highlights) {
            const hlImg = await fetchWikiImage(hl.wikiImageQuery || `${hl.title} ${stop.title}`);
            hl.image = hlImg || stop.image;
          }
        }
      }
    }

    return res.status(200).json({ itinerary });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to generate itinerary' });
  }
}
