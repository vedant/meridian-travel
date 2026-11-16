import test from 'node:test';
import assert from 'node:assert/strict';
import { encryptJson, decryptJson } from '../api/_lib/session.js';
import authDriveHandler from '../api/auth-drive.js';

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
