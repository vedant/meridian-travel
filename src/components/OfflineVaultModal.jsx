import React from 'react';
import {
  X,
  WifiOff,
  CheckCircle2,
  DownloadCloud,
  Loader2,
  Image as ImageIcon,
  Headphones,
  Map as MapIcon,
  HardDrive,
} from 'lucide-react';

export default function OfflineVaultModal({
  isOpen,
  onClose,
  itinerary,
  offlineState,
  isOnline,
  onSyncCurrent,
  onSyncAll,
  syncingAll,
}) {
  if (!isOpen) return null;

  const { syncing, ready, progress = 0, stats = {} } = offlineState || {};

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ios-install-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="studio-header">
          <div>
            <span className="eyebrow-pill gold">
              <WifiOff size={12} /> Automatic Offline Vault
            </span>
            <h2 className="editorial-h2">Works Without Internet</h2>
            <p className="subtle-meta">
              Meridian automatically caches every photo, museum audiobook MP3, map tile, and itinerary edit onto your iPhone.
            </p>
          </div>
          <button className="icon-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="studio-form">
          {/* Status Banner */}
          <div
            className="installed-success-banner"
            style={{
              margin: '0 0 14px',
              background: ready
                ? '#dcfce7'
                : syncing
                ? '#fef3c7'
                : 'var(--bg-subtle)',
              color: ready ? '#14532d' : '#78350f',
            }}
          >
            {syncing ? (
              <Loader2 size={22} className="spin" />
            ) : ready ? (
              <CheckCircle2 size={22} />
            ) : (
              <DownloadCloud size={22} />
            )}
            <div style={{ flex: 1 }}>
              <strong>
                {!isOnline && ready
                  ? `Airplane / Offline Mode Active — ${itinerary?.city} Ready`
                  : syncing
                  ? `Caching ${itinerary?.city} Offline (${progress}%)...`
                  : ready
                  ? `All ${itinerary?.city} Content Saved Offline`
                  : `${itinerary?.city} Ready to Cache`}
              </strong>
              <p style={{ margin: '2px 0 0', fontSize: '0.79rem' }}>
                {ready
                  ? 'You can turn off Wi-Fi & cellular completely — every day, gallery photo, audiobook tour, and map pin works offline.'
                  : 'Connect briefly to Wi-Fi to cache remaining media files.'}
              </p>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div className="ios-perk">
              <ImageIcon size={16} />
              <span>
                <strong>{stats.imageCount || 'All'} Photos</strong>
                <br />
                Stops & artworks cached
              </span>
            </div>
            <div className="ios-perk">
              <Headphones size={16} />
              <span>
                <strong>{stats.audioCount || 'All'} Audio Tracks</strong>
                <br />
                Full offline MP3/WAV tours
              </span>
            </div>
            <div className="ios-perk">
              <MapIcon size={16} />
              <span>
                <strong>City Map Tiles</strong>
                <br />
                Neighborhood zoom cached
              </span>
            </div>
            <div className="ios-perk">
              <HardDrive size={16} />
              <span>
                <strong>On-Device Edits</strong>
                <br />
                Saved in IndexedDB
              </span>
            </div>
          </div>

          <div className="studio-actions">
            <button
              type="button"
              className="btn-gold-solid full-width"
              onClick={onSyncCurrent}
              disabled={syncing || !isOnline}
            >
              {syncing ? (
                <>
                  <Loader2 size={16} className="spin" /> Downloading Offline Pack ({progress}%)...
                </>
              ) : (
                <>
                  <DownloadCloud size={16} />{' '}
                  {ready
                    ? `Re-Verify ${itinerary?.city} Offline Pack`
                    : `Offline Everything for ${itinerary?.city}`}
                </>
              )}
            </button>

            <button
              type="button"
              className="visited-toggle-btn"
              onClick={onSyncAll}
              disabled={syncing || syncingAll || !isOnline}
            >
              {syncingAll ? (
                <>
                  <Loader2 size={15} className="spin" /> Caching All Destinations...
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} /> Offline All Destinations on Device
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
