import crypto from 'node:crypto';
import {
  COOKIE_NAME,
  STATE_COOKIE_NAME,
  encryptJson,
  decryptJson,
  parseCookies,
  serializeCookie,
  getOrigin,
  getGoogleOAuthConfig,
  getValidGoogleSession,
} from './_lib/session.js';

const FOLDER_NAME = 'Meridian Travel Itineraries';
const MASTER_BACKUP_FILENAME = 'meridian-itineraries-backup.json';

async function findOrCreateDriveFolder(accessToken) {
  const q = encodeURIComponent(
    `name = '${FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  );
  const searchResp = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,webViewLink)&spaces=drive`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!searchResp.ok) {
    const errText = await searchResp.text();
    throw new Error(`Google Drive folder lookup failed (${searchResp.status}): ${errText.slice(0, 160)}`);
  }
  const searchData = await searchResp.json();
  if (searchData.files?.length > 0) {
    return searchData.files[0];
  }

  const createResp = await fetch(
    'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder',
      }),
    }
  );
  if (!createResp.ok) {
    throw new Error(`Could not create Drive folder (${createResp.status})`);
  }
  return await createResp.json();
}

async function upsertDriveJsonFile(accessToken, folderId, fileName, jsonObj) {
  const safeName = fileName.replace(/'/g, '');
  const q = encodeURIComponent(
    `name = '${safeName}' and '${folderId}' in parents and trashed = false`
  );
  const listResp = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime,webViewLink)`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const listData = listResp.ok ? await listResp.json() : { files: [] };
  const existing = listData.files?.[0];

  const boundary = `meridian_boundary_${crypto.randomBytes(8).toString('hex')}`;
  const metadata = existing
    ? { name: safeName, mimeType: 'application/json' }
    : { name: safeName, parents: [folderId], mimeType: 'application/json' };

  const multipartBody =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(jsonObj, null, 2)}\r\n` +
    `--${boundary}--`;

  const uploadUrl = existing
    ? `https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=multipart&fields=id,name,modifiedTime,webViewLink`
    : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime,webViewLink`;

  const uploadResp = await fetch(uploadUrl, {
    method: existing ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!uploadResp.ok) {
    const errText = await uploadResp.text();
    throw new Error(`Drive upload failed (${uploadResp.status}): ${errText.slice(0, 160)}`);
  }
  return await uploadResp.json();
}

export default async function handler(req, res) {
  const route = req.query?.route || 'session';
  const oauth = getGoogleOAuthConfig(req);

  // 1. GET /api/auth/session — Check auth state & OAuth readiness
  if (route === 'session' && req.method === 'GET') {
    const session = await getValidGoogleSession(req, res);
    return res.status(200).json({
      authenticated: Boolean(session?.user),
      user: session?.user || null,
      oauthConfigured: oauth.configured,
      clientId: oauth.clientId || null,
      expectedRedirectUri: oauth.redirectUri,
    });
  }

  // 2. GET /api/auth/google — Start Google OAuth 2.0 Authorization Code + PKCE Flow
  if (route === 'google' && req.method === 'GET') {
    if (!oauth.configured) {
      return res.redirect(
        302,
        `${getOrigin(req)}/?auth_error=oauth_not_configured`
      );
    }

    const state = crypto.randomBytes(18).toString('base64url');
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    const statePayload = encryptJson({
      state,
      codeVerifier,
      createdAt: Date.now(),
    });
    res.setHeader(
      'Set-Cookie',
      serializeCookie(STATE_COOKIE_NAME, statePayload, 600, req)
    );

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', oauth.clientId);
    authUrl.searchParams.set('redirect_uri', oauth.redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set(
      'scope',
      'openid email profile https://www.googleapis.com/auth/drive.file'
    );
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    return res.redirect(302, authUrl.toString());
  }

  // 3. GET /api/auth/callback — Exchange Authorization Code for Tokens & Store Encrypted Cookie
  if (route === 'callback' && req.method === 'GET') {
    const { code, state, error } = req.query || {};
    if (error || !code) {
      return res.redirect(
        302,
        `${getOrigin(req)}/?auth_error=${encodeURIComponent(error || 'missing_code')}`
      );
    }

    const cookies = parseCookies(req);
    const savedState = decryptJson(cookies[STATE_COOKIE_NAME]);
    if (!savedState || savedState.state !== state) {
      return res.redirect(302, `${getOrigin(req)}/?auth_error=invalid_state`);
    }

    try {
      const tokenBody = new URLSearchParams({
        code: String(code),
        client_id: oauth.clientId,
        client_secret: oauth.clientSecret,
        redirect_uri: oauth.redirectUri,
        grant_type: 'authorization_code',
        code_verifier: savedState.codeVerifier,
      });

      const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenBody.toString(),
      });

      if (!tokenResp.ok) {
        return res.redirect(302, `${getOrigin(req)}/?auth_error=token_exchange_failed`);
      }
      const tokens = await tokenResp.json();

      const profileResp = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokens.access_token}` } }
      );
      const profile = profileResp.ok ? await profileResp.json() : {};

      const sessionObj = {
        user: {
          sub: profile.sub,
          email: profile.email,
          name: profile.name || profile.email,
          picture: profile.picture || null,
        },
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || null,
        expiresAt: Date.now() + (tokens.expires_in || 3500) * 1000,
      };

      res.setHeader('Set-Cookie', [
        serializeCookie(
          COOKIE_NAME,
          encryptJson(sessionObj),
          60 * 60 * 24 * 30,
          req
        ),
        serializeCookie(STATE_COOKIE_NAME, '', 0, req),
      ]);

      return res.redirect(302, `${getOrigin(req)}/?auth=connected`);
    } catch {
      return res.redirect(302, `${getOrigin(req)}/?auth_error=callback_exception`);
    }
  }

  // 4. POST /api/auth/logout — Clear session cookie
  if (route === 'logout' && req.method === 'POST') {
    res.setHeader('Set-Cookie', serializeCookie(COOKIE_NAME, '', 0, req));
    return res.status(200).json({ ok: true });
  }

  // 5. GET or POST /api/drive/sync — Read or Backup User Itineraries in Google Drive
  if (route === 'drive-sync') {
    const session = await getValidGoogleSession(req, res);
    if (!session?.accessToken) {
      return res.status(401).json({ error: 'Not signed in to Google Drive.' });
    }

    try {
      const folder = await findOrCreateDriveFolder(session.accessToken);

      if (req.method === 'GET') {
        const q = encodeURIComponent(
          `name = '${MASTER_BACKUP_FILENAME}' and '${folder.id}' in parents and trashed = false`
        );
        const listResp = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime,webViewLink)`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        const listData = await listResp.json();
        const masterFile = listData.files?.[0];
        if (!masterFile) {
          return res.status(200).json({
            hasBackup: false,
            folderUrl:
              folder.webViewLink ||
              `https://drive.google.com/drive/folders/${folder.id}`,
          });
        }

        const contentResp = await fetch(
          `https://www.googleapis.com/drive/v3/files/${masterFile.id}?alt=media`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } }
        );
        const backupPayload = contentResp.ok ? await contentResp.json() : null;
        return res.status(200).json({
          hasBackup: Boolean(backupPayload),
          modifiedTime: masterFile.modifiedTime,
          folderUrl:
            folder.webViewLink ||
            `https://drive.google.com/drive/folders/${folder.id}`,
          backup: backupPayload,
        });
      }

      if (req.method === 'POST') {
        const {
          customItineraries = [],
          modifiedBuiltins = {},
          completedStops = {},
          bookedRes = {},
          stopNotes = {},
          activeItinId = null,
        } = req.body || {};

        const syncedAt = new Date().toISOString();
        const masterSnapshot = {
          schema: 'meridian.drive_backup.v1',
          syncedAt,
          activeItinId,
          customItineraries,
          modifiedBuiltins,
          completedStops,
          bookedRes,
          stopNotes,
        };

        // Save unified master snapshot for instant 1-request restore
        await upsertDriveJsonFile(
          session.accessToken,
          folder.id,
          MASTER_BACKUP_FILENAME,
          masterSnapshot
        );

        // Also save individual readable JSON files per user-created or modified itinerary!
        const individualFiles = [
          ...customItineraries,
          ...Object.values(modifiedBuiltins),
        ];
        for (const itin of individualFiles.slice(0, 12)) {
          if (itin?.id) {
            const cleanSlug = String(itin.id).replace(/[^a-zA-Z0-9_-]/g, '-');
            await upsertDriveJsonFile(
              session.accessToken,
              folder.id,
              `itinerary-${cleanSlug}.json`,
              itin
            );
          }
        }

        return res.status(200).json({
          ok: true,
          syncedAt,
          savedCount: individualFiles.length,
          folderUrl:
            folder.webViewLink ||
            `https://drive.google.com/drive/folders/${folder.id}`,
        });
      }
    } catch (err) {
      return res.status(502).json({ error: err.message });
    }
  }

  return res.status(404).json({ error: 'Unknown auth/drive route' });
}
