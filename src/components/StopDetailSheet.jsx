import React, { useState } from 'react';
import {
  X,
  Headphones,
  Play,
  ExternalLink,
  MapPin,
  Clock,
  Utensils,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Circle,
  Navigation,
  Star,
  Award,
  Pencil,
  Trash2,
  Globe2,
} from 'lucide-react';
import { useAudioPlayer } from './AudioPlayerContext';

const STATUS_LABELS = {
  confirmed: { text: 'Confirmed Booking', cls: 'status-confirmed' },
  proposed: { text: 'Proposed — Confirm Table/Slot', cls: 'status-proposed' },
  action_needed: { text: 'Action Needed — Book Tickets', cls: 'status-action' },
  included: { text: 'Planned Stop', cls: 'status-included' },
};

const PLATFORM_STYLES = {
  tripadvisor: 'ext-btn tripadvisor',
  michelin: 'ext-btn michelin',
  apple: 'ext-btn apple',
  google: 'ext-btn google',
  opentable: 'ext-btn opentable',
  official: 'ext-btn official',
  timeout: 'ext-btn timeout',
};

export default function StopDetailSheet({
  stop,
  onClose,
  isCompleted,
  onToggleCompleted,
  noteText = '',
  onSaveNote,
  onEditStop = null,
  onDeleteStop = null,
}) {
  const { startMuseumTour, openMuseumGuideOnly } = useAudioPlayer();
  const [draftNote, setDraftNote] = useState(noteText);

  if (!stop) return null;

  const statusMeta = STATUS_LABELS[stop.bookingStatus] || STATUS_LABELS.included;
  const highlightsCount = stop.museumTour?.highlights?.length || 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="stop-detail-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={stop.title}
      >
        <div className="sheet-grabber" />

        {/* Hero Banner */}
        <div className="stop-sheet-hero">
          <img src={stop.image} alt={stop.title} className="stop-sheet-img" />
          <div className="stop-sheet-gradient" />
          <button className="sheet-floating-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <div className="stop-sheet-hero-overlay">
            <div className="hero-badges-row">
              <span className="time-chip">
                <Clock size={12} /> {stop.time}
              </span>
              <span className={`status-chip ${statusMeta.cls}`}>{statusMeta.text}</span>
            </div>
            <h2 className="stop-sheet-title">{stop.title}</h2>
            {stop.subtitle && <p className="stop-sheet-sub">{stop.subtitle}</p>}
          </div>
        </div>

        <div className="stop-sheet-body">
          {/* Quick Actions Bar */}
          <div className="stop-quick-bar">
            <button
              className={`visited-toggle-btn ${isCompleted ? 'done' : ''}`}
              onClick={() => onToggleCompleted(stop.id)}
            >
              {isCompleted ? <CheckCircle2 size={17} /> : <Circle size={17} />}
              {isCompleted ? 'Completed' : 'Mark Visited'}
            </button>

            {stop.coordinates?.lat && (
              <a
                href={`https://maps.apple.com/?q=${encodeURIComponent(stop.title)}&ll=${stop.coordinates.lat},${stop.coordinates.lng}&dirflg=w`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-primary-btn"
              >
                <Navigation size={15} /> Walk in Apple Maps
              </a>
            )}
          </div>

          {/* Location & Transit Info */}
          <div className="meta-info-card">
            {stop.address && (
              <div className="meta-info-row">
                <MapPin size={15} className="gold-icon" />
                <span>
                  <strong>{stop.neighborhood ? `${stop.neighborhood} · ` : ''}</strong>
                  {stop.address}
                </span>
              </div>
            )}
            {stop.walkOrTransit && (
              <div className="meta-info-row">
                <Navigation size={15} className="gold-icon" />
                <span>{stop.walkOrTransit}</span>
              </div>
            )}
          </div>

          {/* Overview */}
          <p className="stop-editorial-copy">{stop.summary}</p>

          {/* MUSEUM TOUR & AUDIOBOOK CALLOUT */}
          {stop.museumTour && (
            <div className="feature-module museum-module">
              <div className="module-header">
                <div>
                  <span className="eyebrow-pill gold">
                    <Headphones size={12} /> In-App Audiobook & Gallery Tour
                  </span>
                  <h3>{stop.museumTour.tourTitle || `${stop.title} Highlights`}</h3>
                  <p className="module-sub">
                    {highlightsCount} curated gallery highlights with room locations, photos & British audio narration
                  </p>
                </div>
              </div>

              <div className="museum-cta-row">
                <button
                  className="btn-gold-solid"
                  onClick={() => {
                    onClose();
                    startMuseumTour(stop, null, true);
                  }}
                >
                  <Play size={16} /> Play Full Audiobook Tour
                </button>
                <button
                  className="btn-outline-light"
                  onClick={() => {
                    onClose();
                    openMuseumGuideOnly(stop);
                  }}
                >
                  Browse {highlightsCount} Rooms
                </button>
              </div>

              <div className="mini-highlights-preview">
                {(stop.museumTour.highlights || []).map((hl, idx) => (
                  <div
                    key={hl.id || idx}
                    className="mini-hl-item"
                    onClick={() => {
                      onClose();
                      startMuseumTour(stop, hl.id, true);
                    }}
                  >
                    <img src={hl.image || stop.image} alt={hl.title} loading="lazy" />
                    <div className="mini-hl-text">
                      <span className="mini-hl-room">{hl.location}</span>
                      <strong>
                        {idx + 1}. {hl.title}
                      </strong>
                      {hl.artistOrOrigin && <span>{hl.artistOrOrigin}</span>}
                    </div>
                    <span className="mini-hl-play">
                      <Play size={14} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESTAURANT & INTERNET-FEATURED DISHES GUIDE */}
          {stop.diningGuide && (
            <div className="feature-module dining-module">
              <div className="module-header">
                <span className="eyebrow-pill terracotta">
                  <Utensils size={12} /> Internet-Featured Dishes & Culinary Guide
                </span>
                <h3>What Reviewers & Food Critics Rave About</h3>
                <p className="module-sub">
                  {stop.diningGuide.cuisine} · {stop.diningGuide.priceRange || ''}
                  {stop.diningGuide.vibe ? ` · ${stop.diningGuide.vibe}` : ''}
                </p>
                {Array.isArray(stop.diningGuide.accolades) && stop.diningGuide.accolades.length > 0 && (
                  <div className="accolades-wrap">
                    {stop.diningGuide.accolades.map((acc, i) => (
                      <span key={i} className="accolade-badge">
                        <Award size={12} /> {acc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="dishes-grid">
                {(stop.diningGuide.featuredDishes || []).map((dish, idx) => (
                  <div key={idx} className="dish-card">
                    <div className="dish-card-top">
                      <h4>{dish.name}</h4>
                      {dish.badge && <span className="dish-badge">{dish.badge}</span>}
                    </div>
                    <p>{dish.description}</p>
                    {dish.dietary && <span className="dish-dietary">{dish.dietary}</span>}
                  </div>
                ))}
              </div>

              {Array.isArray(stop.diningGuide.nearbyOptions) &&
                stop.diningGuide.nearbyOptions.length > 0 && (
                  <div className="nearby-picks-block">
                    <h4>Top Walkable Restaurant Picks for This Slot</h4>
                    <div className="nearby-list">
                      {stop.diningGuide.nearbyOptions.map((opt, idx) => (
                        <div key={idx} className="nearby-card">
                          <div className="nearby-card-head">
                            <strong>{opt.name}</strong>
                            <span>{opt.walkTime}</span>
                          </div>
                          <p className="nearby-cuisine">{opt.cuisine}</p>
                          <p className="nearby-famous">
                            <Star size={12} /> {opt.famousFor}
                          </p>
                          <div className="nearby-links">
                            {opt.tripadvisorUrl && (
                              <a href={opt.tripadvisorUrl} target="_blank" rel="noopener noreferrer">
                                TripAdvisor ↗
                              </a>
                            )}
                            {opt.googleMapsUrl && (
                              <a href={opt.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                Google Maps ↗
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* LUXURY SHOPPING GUIDE */}
          {stop.shoppingGuide && (
            <div className="feature-module shopping-module">
              <div className="module-header">
                <span className="eyebrow-pill amber">
                  <ShoppingBag size={12} /> Curated Boutique & Shopping Guide
                </span>
                <h3>
                  {stop.shoppingGuide.priceTier} · {stop.shoppingGuide.bestFor}
                </h3>
                {stop.shoppingGuide.walkFromHotel && (
                  <p className="module-sub">From Hotel: {stop.shoppingGuide.walkFromHotel}</p>
                )}
              </div>

              <div className="stores-stack">
                {(stop.shoppingGuide.highlights || []).map((st, idx) => (
                  <div key={idx} className="store-item-card">
                    <div className="store-item-top">
                      <strong>{st.storeName}</strong>
                      <span>{st.category}</span>
                    </div>
                    <p>{st.mustSee}</p>
                    {st.locationNote && <small>{st.locationNote}</small>}
                  </div>
                ))}
              </div>

              {stop.shoppingGuide.photographyTip && (
                <div className="photo-tip-banner">
                  <Sparkles size={14} /> <strong>Photo Tip:</strong> {stop.shoppingGuide.photographyTip}
                </div>
              )}
            </div>
          )}

          {/* Insider Concierge Tips */}
          {Array.isArray(stop.insiderTips) && stop.insiderTips.length > 0 && (
            <div className="insider-tips-card">
              <h4>
                <Sparkles size={15} /> Concierge & Timing Notes
              </h4>
              <ul>
                {stop.insiderTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Web Search Grounding Sources (for stops added/updated via Hydrogen) */}
          {stop.webGrounding?.sources?.length > 0 && (
            <div className="insider-tips-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <h4 style={{ color: '#14532d' }}>
                <Globe2 size={15} /> Grounded via Live Web Search ({stop.webGrounding.sources.length} verified sources)
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {stop.webGrounding.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#166534',
                      background: '#dcfce7',
                      padding: '4px 9px',
                      borderRadius: 999,
                      textDecoration: 'none',
                    }}
                  >
                    {src.title} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* External Reviews & Travel Websites (TripAdvisor, Michelin, Google, Apple Maps, Official) */}
          {Array.isArray(stop.links) && stop.links.length > 0 && (
            <div className="external-links-section">
              <h4>Reviews, Menus & Official Guides</h4>
              <div className="external-links-grid">
                {stop.links.map((lnk, idx) => (
                  <a
                    key={idx}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={PLATFORM_STYLES[lnk.platform] || 'ext-btn'}
                  >
                    <span>{lnk.label}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Personal Trip Note */}
          <div className="personal-note-section">
            <h4>Personal Notes (Saved Offline & Synced to Drive)</h4>
            <textarea
              rows={2}
              placeholder="Add confirmation number, table preference, or gift idea for Nutan..."
              value={draftNote}
              onChange={(e) => {
                setDraftNote(e.target.value);
                onSaveNote(stop.id, e.target.value);
              }}
            />
          </div>

          {/* Modify or Remove Stop On-the-Fly */}
          {(onEditStop || onDeleteStop) && (
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 14,
                paddingTop: 14,
                borderTop: '1px solid var(--border-light)',
              }}
            >
              {onEditStop && (
                <button
                  type="button"
                  className="visited-toggle-btn"
                  onClick={() => {
                    const target = stop;
                    onClose();
                    onEditStop(target);
                  }}
                >
                  <Pencil size={15} /> Edit Stop Details
                </button>
              )}
              {onDeleteStop && (
                <button
                  type="button"
                  className="visited-toggle-btn"
                  style={{ color: '#991b1b', borderColor: '#fecaca' }}
                  onClick={() => {
                    const targetId = stop.id;
                    onClose();
                    onDeleteStop(targetId);
                  }}
                >
                  <Trash2 size={15} /> Remove Stop
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
