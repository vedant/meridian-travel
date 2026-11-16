import React, { useState } from 'react';
import {
  X,
  Cloud,
  CheckCircle2,
  RefreshCw,
  LogOut,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import {
  getSavedClientId,
  setSavedClientId,
  signInWithGoogleGisClient,
} from '../services/driveSync.js';

export default function CloudSyncModal({
  isOpen,
  onClose,
  authState,
  driveStatus,
  onRefreshAuth,
  onBackupNow,
  onRestoreNow,
  onLogout,
}) {
  const [customClientId, setCustomClientId] = useState(() => getSavedClientId());
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localErr, setLocalErr] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  if (!isOpen) return null;

  const { authenticated, user, oauthConfigured, expectedRedirectUri } = authState || {};
  const { syncing, lastSyncedAt, folderUrl, pendingOfflineChanges, error: syncErr } =
    driveStatus || {};

  const handleGoogleSignIn = async () => {
    setLocalErr('');
    if (oauthConfigured) {
      // Full Server-Side Google OAuth 2.0 Authorization Code + PKCE Redirect
      window.location.href = '/api/auth/google';
      return;
    }

    const cid = customClientId.trim();
    if (!cid) {
      setShowAdvanced(true);
      setLocalErr(
        'Enter a Google Web OAuth Client ID below (or set GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET in Vercel).'
      );
      return;
    }

    setSigningIn(true);
    try {
      setSavedClientId(cid);
      await signInWithGoogleGisClient(cid);
      await onRefreshAuth();
    } catch (err) {
      setLocalErr(err.message || 'Google Sign-In failed.');
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ios-install-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="studio-header">
          <div>
            <span className="eyebrow-pill gold">
              <Cloud size={12} /> Google OAuth & Drive Backup
            </span>
            <h2 className="editorial-h2">Cloud Account & Backup</h2>
            <p className="subtle-meta">
              Sign in with Google to automatically back up custom & modified itineraries to your Google Drive.
            </p>
          </div>
          <button className="icon-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="studio-form">
          {(localErr || syncErr) && (
            <div className="studio-error">{localErr || syncErr}</div>
          )}

          {authenticated ? (
            <>
              <div
                className="installed-success-banner"
                style={{ margin: '0 0 14px', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                  ) : (
                    <CheckCircle2 size={24} />
                  )}
                  <div>
                    <strong>{user?.name || 'Signed In'}</strong>
                    <div style={{ fontSize: '0.77rem', opacity: 0.85 }}>
                      {user?.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="visited-toggle-btn"
                  style={{ flex: 'none', padding: '7px 11px' }}
                  onClick={onLogout}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>

              <div className="meta-info-card">
                <div className="meta-info-row">
                  <ShieldCheck size={16} className="gold-icon" />
                  <span>
                    <strong>Google Drive Folder:</strong>{' '}
                    <code>Meridian Travel Itineraries</code>
                    {lastSyncedAt && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        Last backed up: {new Date(lastSyncedAt).toLocaleString()}
                      </span>
                    )}
                    {pendingOfflineChanges && (
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#92400e' }}>
                        Changes saved on device — will auto-sync to Drive when online.
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="studio-actions">
                <button
                  type="button"
                  className="btn-gold-solid full-width"
                  onClick={onBackupNow}
                  disabled={syncing}
                >
                  {syncing ? (
                    <>
                      <Loader2 size={16} className="spin" /> Backing Up to Google Drive...
                    </>
                  ) : (
                    <>
                      <Cloud size={16} /> Backup Itineraries to Google Drive Now
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="visited-toggle-btn"
                  onClick={onRestoreNow}
                  disabled={syncing}
                >
                  <RefreshCw size={15} /> Restore / Pull Latest from Google Drive
                </button>

                {folderUrl && (
                  <a
                    href={folderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-primary-btn"
                  >
                    Open Folder in Google Drive <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="meta-info-card">
                <div className="meta-info-row">
                  <ShieldCheck size={16} className="gold-icon" />
                  <span>
                    Uses Google’s narrow <code>drive.file</code> permission — Meridian can only access the <strong>Meridian Travel Itineraries</strong> backup folder it creates, never your personal Drive files.
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-gold-solid full-width"
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                style={{ marginBottom: 12 }}
              >
                {signingIn ? (
                  <>
                    <Loader2 size={16} className="spin" /> Connecting to Google...
                  </>
                ) : (
                  <>Continue with Google & Enable Drive Backup</>
                )}
              </button>

              {!oauthConfigured && (
                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: '0.78rem',
                  }}
                >
                  <div
                    style={{ fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => setShowAdvanced((v) => !v)}
                  >
                    ⚙️ OAuth Client Configuration {showAdvanced ? '▾' : '▸'}
                  </div>
                  {showAdvanced && (
                    <div style={{ marginTop: 8 }}>
                      <p style={{ margin: '0 0 8px', color: 'var(--ink-secondary)' }}>
                        For server OAuth redirect flow, set <code>GOOGLE_CLIENT_ID</code> &{' '}
                        <code>GOOGLE_CLIENT_SECRET</code> in Vercel with Authorized Redirect URI:{' '}
                        <code>{expectedRedirectUri || `${window.location.origin}/api/auth/callback`}</code>.
                        Or paste a Web Client ID below for instant Google Identity sign-in:
                      </p>
                      <input
                        type="text"
                        placeholder="xxxx.apps.googleusercontent.com"
                        value={customClientId}
                        onChange={(e) => setCustomClientId(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: 9,
                          border: '1px solid var(--border-light)',
                          fontSize: '0.8rem',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
