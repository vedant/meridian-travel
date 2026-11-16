import {
  callHydrogenJson,
  fetchWikiImage,
  buildStandardStopLinks,
} from './_lib/hydrogen.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { destinationPrompt = '', pastedText = '' } = req.body || {};
    const combinedInput = `${destinationPrompt}\n\n${pastedText}`.trim();
    if (!combinedInput || combinedInput.length < 3) {
      return res
        .status(400)
        .json({ error: 'Please enter a destination or paste itinerary notes.' });
    }

    const systemInstruction = `You are Meridian, an elite cultural historian, museum docent, and culinary concierge running on Gemini 4 Hydrogen.
Convert the user's destination request or pasted itinerary notes into a rich, structured JSON travel companion object.
Requirements:
1. Preserve all specific dates, venues, hotels, and preferences if the user pasted an itinerary; otherwise design an extraordinary 2-to-4 day cultural & culinary itinerary for the requested city.
2. For EVERY museum, gallery, temple, palace, or major monument stop, include a "museumTour" object with 3-4 specific room/area highlights, exact floor/gallery locations, what to look closely at, and an engaging 80-110 word spoken "audioScript" for each highlight so the app can play & offline-cache it as an audiobook tour.
3. For EVERY restaurant, food market, café, or dining stop, include a "diningGuide" object with 3-4 specific dishes highlighted/famous on the internet (TripAdvisor, Michelin, food blogs, social media) explaining why diners rave about them.
4. Provide accurate latitude and longitude coordinates ("lat", "lng") for the baseHotel and every stop.
5. Return ONLY valid JSON matching this exact structure:
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
            "voiceId": "Charon",
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

    const { data: itinerary, modelUsed } = await callHydrogenJson({
      systemInstruction,
      userPrompt: `Build a complete Meridian itinerary JSON for:\n${combinedInput}`,
      temperature: 0.45,
    });

    itinerary.id = `${(itinerary.id || itinerary.city || 'custom')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
    itinerary.isCustom = true;
    itinerary.generatedBy = modelUsed;
    itinerary.updatedAt = new Date().toISOString();

    const heroImg = await fetchWikiImage(itinerary.wikiImageQuery || itinerary.city);
    itinerary.heroImage = heroImg || '/images/london_hero.jpg';

    if (itinerary.baseHotel) {
      const hotelImg = await fetchWikiImage(
        itinerary.baseHotel.wikiImageQuery ||
          `${itinerary.baseHotel.name} ${itinerary.city}`
      );
      itinerary.baseHotel.image = hotelImg || itinerary.heroImage;
      itinerary.baseHotel.links = buildStandardStopLinks({
        name: itinerary.baseHotel.name,
        city: itinerary.city,
        lat: itinerary.baseHotel.coordinates?.lat,
        lng: itinerary.baseHotel.coordinates?.lng,
      });
    }

    for (const day of itinerary.days || []) {
      for (const stop of day.stops || []) {
        const stopImg = await fetchWikiImage(
          stop.wikiImageQuery || `${stop.title} ${itinerary.city}`
        );
        stop.image = stopImg || itinerary.heroImage;
        stop.links = buildStandardStopLinks({
          name: stop.title,
          city: itinerary.city,
          lat: stop.coordinates?.lat,
          lng: stop.coordinates?.lng,
        });
        if (stop.museumTour && Array.isArray(stop.museumTour.highlights)) {
          const tourId =
            stop.museumTour.tourId || `tour-${stop.id}-${Date.now().toString(36)}`;
          stop.museumTour.tourId = tourId;
          for (const hl of stop.museumTour.highlights) {
            const hlImg = await fetchWikiImage(
              hl.wikiImageQuery || `${hl.title} ${stop.title}`
            );
            hl.image = hlImg || stop.image;
          }
        }
      }
    }

    return res.status(200).json({ itinerary, modelUsed });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || 'Failed to generate itinerary' });
  }
}
