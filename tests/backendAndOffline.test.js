import test from 'node:test';
import assert from 'node:assert/strict';
import { encryptJson, decryptJson } from '../api/_lib/session.js';
import { buildStandardStopLinks } from '../api/_lib/hydrogen.js';
import authDriveHandler from '../api/auth-drive.js';

test('buildStandardStopLinks promotes verified TripAdvisor, Michelin & Official URLs from Google Search grounding sources', () => {
  const links = buildStandardStopLinks({
    name: 'Gymkhana',
    city: 'London',
    lat: 51.5094,
    lng: -0.1419,
    groundedSources: [
      { title: 'gymkhanarestaurants.com', url: 'https://gymkhanarestaurants.com/london/' },
      { title: 'michelin.com', url: 'https://guide.michelin.com/us/en/greater-london/london/restaurant/gymkhana' },
      { title: 'tripadvisor.com', url: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d5001122-Reviews-Gymkhana-London_England.html' },
    ],
  });
  const ta = links.find((l) => l.platform === 'tripadvisor');
  const mich = links.find((l) => l.platform === 'michelin');
  const off = links.find((l) => l.platform === 'official');
  assert.equal(ta.url, 'https://www.tripadvisor.com/Restaurant_Review-g186338-d5001122-Reviews-Gymkhana-London_England.html');
  assert.equal(mich.url, 'https://guide.michelin.com/us/en/greater-london/london/restaurant/gymkhana');
  assert.equal(off.url, 'https://gymkhanarestaurants.com/london/');
});

test('AES-256-GCM session encryption round-trips OAuth payload and rejects tampering', () => {
  const payload = {
    user: { email: 'test@example.com', name: 'Traveler' },
    accessToken: 'ya29.mock_token',
    refreshToken: '1//mock_refresh',
    expiresAt: Date.now() + 3600_000,
  };
  const token = encryptJson(payload);
  assert.equal(typeof token, 'string');
  const decoded = decryptJson(token);
  assert.deepEqual(decoded, payload);

  const tampered = token.slice(0, -4) + 'XXXX';
  assert.equal(decryptJson(tampered), null);
});

test('GET /api/auth/session returns clean unauthenticated JSON contract', async () => {
  let statusCode = 0;
  let jsonBody = null;
  const req = {
    method: 'GET',
    query: { route: 'session' },
    headers: { host: 'meridian-travel-theta-one.vercel.app' },
  };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(obj) {
      jsonBody = obj;
      return this;
    },
  };

  await authDriveHandler(req, res);
  assert.equal(statusCode, 200);
  assert.equal(jsonBody.authenticated, false);
  assert.equal(
    jsonBody.expectedRedirectUri,
    'https://meridian-travel-theta-one.vercel.app/api/auth/callback'
  );
});
