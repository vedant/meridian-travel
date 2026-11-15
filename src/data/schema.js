/**
 * Universal Meridian Itinerary & Cultural Companion Schema
 * Supports any city, multi-track days, room-by-room museum tours with synchronized
 * audiobook chapters, internet-featured restaurant dish guides, and multi-platform review links.
 */

/**
 * Helper to create standardized external review & navigation links for any venue.
 * Guarantees TripAdvisor, Google Maps, Apple Maps (iOS native), Official Website,
 * and optional Michelin / OpenTable / Time Out links.
 */
export function buildVenueLinks({
  name,
  city = 'London',
  lat,
  lng,
  tripadvisorUrl,
  officialUrl,
  michelinUrl,
  openTableUrl,
  timeOutUrl,
  extraLinks = [],
}) {
  const query = encodeURIComponent(`${name} ${city}`);
  const appleMapsUrl =
    lat && lng
      ? `https://maps.apple.com/?q=${query}&ll=${lat},${lng}&dirflg=w`
      : `https://maps.apple.com/?q=${query}`;
  const googleMapsUrl =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${query}`
      : `https://www.google.com/maps/search/?api=1&query=${query}`;
  const taUrl =
    tripadvisorUrl ||
    `https://www.tripadvisor.com/Search?q=${query}`;

  const links = [
    { label: 'TripAdvisor', platform: 'tripadvisor', url: taUrl },
    { label: 'Google Reviews & Map', platform: 'google', url: googleMapsUrl },
    { label: 'Apple Maps (iOS)', platform: 'apple', url: appleMapsUrl },
  ];
  if (michelinUrl) {
    links.push({ label: 'Michelin Guide', platform: 'michelin', url: michelinUrl });
  }
  if (openTableUrl) {
    links.push({ label: 'Reserve / OpenTable', platform: 'opentable', url: openTableUrl });
  }
  if (timeOutUrl) {
    links.push({ label: 'Time Out', platform: 'timeout', url: timeOutUrl });
  }
  if (officialUrl) {
    links.push({ label: 'Official Website', platform: 'official', url: officialUrl });
  }
  for (const extra of extraLinks) {
    if (extra && extra.url) links.push(extra);
  }
  return links;
}

/**
 * Expected Stop Categories:
 * - 'museum'      : Museums, galleries, historic libraries, immersive art
 * - 'historic'    : Castles, monuments, historic palaces, sightseeing cruises
 * - 'dining'      : Restaurants, afternoon tea, food markets, curated lunch picks
 * - 'shopping'    : Luxury arcades, flagship streets, department stores, village boutiques
 * - 'performance' : Theatre, opera, concert halls
 * - 'scenic'      : Countryside villages, walks, photo sessions, squares
 * - 'hotel'       : Base hotel check-in, rest blocks
 * - 'transit'     : Flights, Heathrow transfers, train/tube legs
 *
 * Expected Museum Tour Highlight structure (`stop.museumTour`):
 * {
 *   tourId: string,
 *   tourTitle: string,
 *   narrator: string, // e.g. "Dr. Julian Vance · Senior Cultural Historian (British Audio)"
 *   voiceId: 'en-GB-RyanNeural' | 'en-GB-SoniaNeural',
 *   totalDurationMinutes: number,
 *   routeStrategy: string, // Practical floor-by-floor pacing & entry advice
 *   introAudioUrl: string, // `/audio/${tourId}-intro.mp3`
 *   introTranscript: string, // Rich 70-110 word spoken introduction to the museum/tour
 *   highlights: [
 *     {
 *       id: string, // e.g. 'rosetta-stone'
 *       order: number,
 *       title: string,
 *       artistOrOrigin: string, // e.g. '196 BC · Ptolemaic Egypt (Granodiorite)'
 *       location: string, // Exact wing, floor & room, e.g. 'Ground Floor · Room 4 (Egyptian Sculpture)'
 *       durationMinutes: number,
 *       image: string, // `/images/<image_key>.jpg`
 *       summary: string, // Informative curatorial story
 *       lookClosely: string, // Specific visual detail to spot in person
 *       audioUrl: string, // `/audio/${tourId}-${id}.mp3`
 *       audioScript: string, // Rich, engaging 85-130 word spoken narration script!
 *     }
 *   ]
 * }
 *
 * Expected Dining Guide structure (`stop.diningGuide`):
 * {
 *   cuisine: string,
 *   priceRange: string, // e.g. '££££'
 *   accolades: string[], // e.g. ['1 Michelin Star', 'TripAdvisor 4.3★ (3,400+ reviews)']
 *   vibe: string,
 *   dressCode?: string,
 *   featuredDishes: [
 *     {
 *       name: string,
 *       badge: string, // e.g. 'Internet Icon', 'Chef Signature', 'Vegetarian Star', 'Must-Order Dessert'
 *       description: string, // Why reviewers/TikTok/TripAdvisor/Michelin rave about it
 *       dietary?: string, // e.g. 'Vegetarian', 'Seafood', 'Meat', 'Sweet'
 *     }
 *   ],
 *   nearbyOptions?: [ // Used when itinerary says "Lunch in Bloomsbury" or "Lunch near Mayfair"
 *     {
 *       name: string,
 *       cuisine: string,
 *       walkTime: string,
 *       famousFor: string,
 *       tripadvisorUrl: string,
 *       googleMapsUrl: string,
 *     }
 *   ]
 * }
 *
 * Expected Shopping Guide structure (`stop.shoppingGuide`):
 * {
 *   priceTier: string, // e.g. '£££££'
 *   bestFor: string,
 *   walkFromHotel: string,
 *   highlights: [
 *     {
 *       storeName: string,
 *       category: string,
 *       mustSee: string,
 *       locationNote: string,
 *     }
 *   ],
 *   photographyTip?: string,
 * }
 */
