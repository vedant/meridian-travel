import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { BUILTIN_ITINERARIES, LONDON_ITINERARY } from '../src/data/index.js';

const PUBLIC_DIR = path.resolve('/home/vedant/src/meridian-travel/public');

test('London itinerary has all 7 days, alternate tracks, reservations, and 8 shopping areas', () => {
  assert.equal(LONDON_ITINERARY.id, 'london-anniversary-2026');
  assert.equal(LONDON_ITINERARY.days.length, 7);
  assert.ok(LONDON_ITINERARY.pendingReservations.length >= 4);

  const sat = LONDON_ITINERARY.days[3];
  assert.ok(sat.alternateTrack, 'Saturday Nov 21 must include Nutan’s Harrods alternate track');
  assert.ok(sat.alternateTrack.stops.some((s) => s.title.toLowerCase().includes('harrods')));

  const districts = Array.isArray(LONDON_ITINERARY.shoppingAtlas)
    ? LONDON_ITINERARY.shoppingAtlas
    : LONDON_ITINERARY.shoppingAtlas.districts;
  assert.equal(districts.length, 8);
  assert.equal(LONDON_ITINERARY.langhamShoppingWalk.length, 7);
});

test('Multi-city infrastructure includes London, Rome/Florence, and Kyoto with verified local images and MP3s', () => {
  assert.ok(BUILTIN_ITINERARIES.length >= 3);

  let museumToursChecked = 0;
  let diningGuidesChecked = 0;

  for (const itin of BUILTIN_ITINERARIES) {
    assert.ok(itin.city && itin.heroImage);
    const heroDisk = path.join(PUBLIC_DIR, itin.heroImage.replace(/^\//, ''));
    assert.ok(fs.existsSync(heroDisk), `Missing hero image: ${itin.heroImage}`);

    for (const day of itin.days) {
      const allStops = [...(day.stops || []), ...(day.alternateTrack?.stops || [])];
      for (const stop of allStops) {
        assert.ok(stop.title && stop.image, `Stop missing title/image: ${stop.id}`);
        const imgDisk = path.join(PUBLIC_DIR, stop.image.replace(/^\//, ''));
        assert.ok(fs.existsSync(imgDisk), `Missing stop image on disk: ${stop.image}`);

        assert.ok(Array.isArray(stop.links) && stop.links.length >= 2, `Stop missing external links: ${stop.title}`);
        assert.ok(
          stop.links.some((l) => l.platform === 'tripadvisor' && l.url.includes('tripadvisor.')),
          `Stop missing TripAdvisor link: ${stop.title}`
        );

        if (stop.museumTour) {
          museumToursChecked++;
          const tour = stop.museumTour;
          assert.ok(tour.highlights.length >= 1, `Museum tour has no highlights: ${stop.title}`);
          if (tour.introAudioUrl) {
            const introDisk = path.join(PUBLIC_DIR, tour.introAudioUrl.replace(/^\//, ''));
            assert.ok(fs.existsSync(introDisk) && fs.statSync(introDisk).size > 3000, `Missing intro MP3: ${tour.introAudioUrl}`);
          }
          for (const hl of tour.highlights) {
            assert.ok(hl.location, `Highlight missing gallery/room location: ${hl.title}`);
            const hlImg = path.join(PUBLIC_DIR, hl.image.replace(/^\//, ''));
            assert.ok(fs.existsSync(hlImg), `Missing highlight photo: ${hl.image}`);
            const hlAudio = path.join(PUBLIC_DIR, hl.audioUrl.replace(/^\//, ''));
            assert.ok(fs.existsSync(hlAudio) && fs.statSync(hlAudio).size > 3000, `Missing highlight MP3: ${hl.audioUrl}`);
          }
        }

        if (stop.diningGuide) {
          diningGuidesChecked++;
          assert.ok(
            stop.diningGuide.featuredDishes.length >= 1,
            `Dining stop missing internet-featured dishes: ${stop.title}`
          );
        }
      }
    }
  }

  assert.ok(museumToursChecked >= 14, `Expected >= 14 museum tours, got ${museumToursChecked}`);
  assert.ok(diningGuidesChecked >= 10, `Expected >= 10 dining guides, got ${diningGuidesChecked}`);
});
