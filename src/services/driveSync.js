const GIS_CLIENT_STORAGE_KEY = 'meridian_gis_client_id_v1';
const GIS_TOKEN_STORAGE_KEY = 'meridian_gis_token_v1';

export function getSavedGisToken() {
  try {
    const raw = localStorage.getItem(GIS_TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt && parsed.expiresAt > Date.now() + 30_000) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveGisToken(tokenObj) {
  localStorage.setItem(GIS_TOKEN_STORAGE_KEY, JSON.stringify(tokenObj));
}

export function clearGisToken() {
  localStorage.removeItem(GIS_TOKEN_STORAGE_KEY);
}

export function getSavedClientId() {
  return (
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    localStorage.getItem(GIS_CLIENT_STORAGE_KEY) ||
    ''
  );
}

export function setSavedClientId(clientId) {
  if (clientId) {
    localStorage.setItem(GIS_CLIENT_STORAGE_KEY, clientId.trim());
  } else {
    localStorage.removeItem(GIS_CLIENT_STORAGE_KEY);
  }
}

export async function checkAuthSession() {
  // 1. Check server-side HttpOnly OAuth session first
  try {
    const resp = await fetch('/api/auth/session');
    if (resp.ok) {
      const data = await resp.json();
      if (data.authenticated) {
        return {
          authenticated: true,
          mode: 'server',
          user: data.user,
          oauthConfigured: data.oauthConfigured,
          expectedRedirectUri: data.expectedRedirectUri,
        };
      }
      // Check if user signed in via client GIS fallback
      const gis = getSavedGisToken();
      if (gis?.accessToken) {
        return {
          authenticated: true,
          mode: 'gis',
          user: gis.user,
          accessToken: gis.accessToken,
          oauthConfigured: data.oauthConfigured,
          expectedRedirectUri: data.expectedRedirectUri,
        };
      }
      return {
        authenticated: false,
        oauthConfigured: data.oauthConfigured,
        clientId: data.clientId || getSavedClientId(),
        expectedRedirectUri: data.expectedRedirectUri,
      };
    }
  } catch {
    // Offline fallback
    const gis = getSavedGisToken();
    if (gis?.user) {
      return { authenticated: true, mode: 'gis', user: gis.user, offline: true };
    }
  }
  return { authenticated: false, oauthConfigured: false };
}

export function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve(window.google);
    const existing = document.querySelector('script[data-gis="1"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.gis = '1';
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

export async function signInWithGoogleGisClient(clientId) {
  const google = await loadGoogleIdentityScript();
  return new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid email profile https://www.googleapis.com/auth/drive.file',
      callback: async (tokenResp) => {
        if (tokenResp.error || !tokenResp.access_token) {
          return reject(new Error(tokenResp.error_description || tokenResp.error || 'OAuth cancelled'));
        }
        try {
          const pResp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResp.access_token}` },
          });
          const profile = pResp.ok ? await pResp.json() : {};
          const sessionObj = {
            accessToken: tokenResp.access_token,
            expiresAt: Date.now() + (tokenResp.expires_in || 3500) * 1000,
            user: {
              name: profile.name || profile.email || 'Google User',
              email: profile.email || '',
              picture: profile.picture || null,
            },
          };
          saveGisToken(sessionObj);
          resolve(sessionObj);
        } catch (err) {
          reject(err);
        }
      },
    });
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
}

function buildAuthHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const gis = getSavedGisToken();
  if (gis?.accessToken) {
    headers.Authorization = `Bearer ${gis.accessToken}`;
  }
  return headers;
}

export async function backupToGoogleDrive(payload) {
  const resp = await fetch('/api/drive/sync', {
    method: 'POST',
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data.error || `Drive backup failed (${resp.status})`);
  }
  return data;
}

export async function restoreFromGoogleDrive() {
  const resp = await fetch('/api/drive/sync', {
    method: 'GET',
    headers: buildAuthHeaders(),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data.error || `Drive restore failed (${resp.status})`);
  }
  return data;
}

export async function logoutGoogleSession() {
  clearGisToken();
  await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
}
