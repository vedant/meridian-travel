import crypto from 'node:crypto';

const COOKIE_NAME = 'meridian_session';
const STATE_COOKIE_NAME = 'meridian_oauth_state';

function getSecretKey() {
  const raw =
    process.env.SESSION_SECRET ||
    process.env.GEMINI_API_KEY ||
    'meridian-fallback-dev-secret-change-in-prod';
  return crypto.createHash('sha256').update(raw).digest();
}

export function encryptJson(obj) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getSecretKey(), iv);
  const json = Buffer.from(JSON.stringify(obj), 'utf8');
  const encrypted = Buffer.concat([cipher.update(json), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64url');
}

export function decryptJson(token) {
  if (!token) return null;
  try {
    const buf = Buffer.from(token, 'base64url');
    if (buf.length < 29) return null;
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const data = buf.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', getSecretKey(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return JSON.parse(decrypted.toString('utf8'));
  } catch {
    return null;
  }
}

export function parseCookies(req) {
  const header = req.headers?.cookie || '';
  const out = {};
  header.split(';').forEach((part) => {
    const idx = part.indexOf('=');
    if (idx > 0) {
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim();
      out[k] = decodeURIComponent(v);
    }
  });
  return out;
}

export function serializeCookie(name, value, maxAgeSec = 60 * 60 * 24 * 30, req = null) {
  const isLocal =
    req?.headers?.host?.startsWith('localhost') ||
    req?.headers?.host?.startsWith('127.0.0.1');
  const flags = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`,
  ];
  if (!isLocal) flags.push('Secure');
  return flags.join('; ');
}

export function getOrigin(req) {
  const proto =
    req.headers['x-forwarded-proto'] ||
    (req.headers.host?.includes('localhost') || req.headers.host?.includes('127.0.0.1')
      ? 'http'
      : 'https');
  return `${proto}://${req.headers.host}`;
}

export function getGoogleOAuthConfig(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || `${getOrigin(req)}/api/auth/callback`;
  return {
    clientId,
    clientSecret,
    redirectUri,
    configured: Boolean(clientId && clientSecret),
  };
}

export async function getValidGoogleSession(req, res) {
  // Support direct Bearer token from Google Identity Services (client token flow) as well!
  const authHeader = req.headers?.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    const directToken = authHeader.slice(7).trim();
    if (directToken) {
      return { accessToken: directToken, mode: 'bearer' };
    }
  }

  const cookies = parseCookies(req);
  const session = decryptJson(cookies[COOKIE_NAME]);
  if (!session) return null;

  const now = Date.now();
  if (session.accessToken && session.expiresAt && session.expiresAt > now + 60_000) {
    return { ...session, mode: 'cookie' };
  }

  // Refresh access_token using refresh_token if available
  const { clientId, clientSecret, configured } = getGoogleOAuthConfig(req);
  if (session.refreshToken && configured) {
    try {
      const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: session.refreshToken,
        grant_type: 'refresh_token',
      });
      const r = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (r.ok) {
        const refreshed = await r.json();
        const updated = {
          ...session,
          accessToken: refreshed.access_token,
          expiresAt: Date.now() + (refreshed.expires_in || 3500) * 1000,
        };
        if (res) {
          res.setHeader(
            'Set-Cookie',
            serializeCookie(COOKIE_NAME, encryptJson(updated), 60 * 60 * 24 * 30, req)
          );
        }
        return { ...updated, mode: 'cookie' };
      }
    } catch {
      // Fall through
    }
  }

  return null;
}

export { COOKIE_NAME, STATE_COOKIE_NAME };
