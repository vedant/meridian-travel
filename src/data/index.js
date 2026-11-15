import { LONDON_META, LONDON_DAYS_PART1 } from './londonPart1.js';
import { LONDON_DAYS_PART2 } from './londonPart2b.js';
import { WORLD_ITINERARIES } from './worldItineraries.js';

export const LONDON_ITINERARY = {
  ...LONDON_META,
  days: [...LONDON_DAYS_PART1, ...LONDON_DAYS_PART2],
};

export const BUILTIN_ITINERARIES = [
  LONDON_ITINERARY,
  ...WORLD_ITINERARIES,
];
