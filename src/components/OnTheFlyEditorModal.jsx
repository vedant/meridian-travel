import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Pencil, Loader2, WifiOff } from 'lucide-react';
import { buildVenueLinks } from '../data/schema.js';

const CATEGORIES = [
  { value: 'museum', label: 'Museum / Gallery' },
  { value: 'dining', label: 'Restaurant / Café / Market' },
  { value: 'shopping', label: 'Shopping / Boutique' },
  { value: 'historic', label: 'Historic Site / Cruise' },
  { value: 'performance', label: 'Theatre / Concert / Opera' },
  { value: 'scenic', label: 'Scenic Walk / Photo Stop' },
  { value: 'hotel', label: 'Hotel / Rest' },
  { value: 'transit', label: 'Transit / Transfer' },
];

const STATUSES = [
  { value: 'included', label: 'Planned' },
  { value: 'confirmed', label: 'Confirmed Booking' },
  { value: 'proposed', label: 'Proposed' },
  { value: 'action_needed', label: 'Action Needed (Book)' },
];

export default function OnTheFlyEditorModal({
  isOpen,
  initialMode = 'add', // 'ai_modify' | 'add' | 'edit_stop'
  stopToEdit = null,
  day = null,
  city = 'London',
  country = '',
  heroImage = '/images/london_hero.jpg',
  isOnline = true,
  onClose,
  onInsertStop,
  onUpdateStop,
  onReplaceDay,
}) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI Modify Day state
  const [aiInstruction, setAiInstruction] = useState('');

  // Smart Add Stop state
  const [smartStopPrompt, setSmartStopPrompt] = useState('');

  // Manual Add / Edit Stop state
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('2:00–3:00 p.m.');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('scenic');
  const [bookingStatus, setBookingStatus] = useState('included');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [walkOrTransit, setWalkOrTransit] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setError('');
    if (initialMode === 'edit_stop' && stopToEdit) {
      setTitle(stopToEdit.title || '');
      setTime(stopToEdit.time || '');
      setSubtitle(stopToEdit.subtitle || '');
      setCategory(stopToEdit.category || 'scenic');
      setBookingStatus(stopToEdit.bookingStatus || 'included');
      setNeighborhood(stopToEdit.neighborhood || '');
      setAddress(stopToEdit.address || '');
      setWalkOrTransit(stopToEdit.walkOrTransit || '');
      setSummary(stopToEdit.summary || '');
    } else if (initialMode === 'add') {
      setTitle('');
      setTime('2:00–3:00 p.m.');
      setSubtitle('');
      setCategory('dining');
      setBookingStatus('included');
      setNeighborhood('');
      setAddress('');
      setWalkOrTransit('');
      setSummary('');
    }
  }, [initialMode, stopToEdit, isOpen]);

  if (!isOpen || !day) return null;

  const handleSmartEnrichAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!smartStopPrompt.trim()) {
      setError('Describe the stop you want to add (e.g., "Dishoom Covent Garden at 7:15 p.m.").');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch('/api/modify-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enrich_stop',
          city,
          country,
          dayContext: day,
          stopRequest: smartStopPrompt.trim(),
          heroImage,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.stop) {
        throw new Error(data?.error || 'Could not enrich stop.');
      }
      onInsertStop(data.stop, data.insertIndex);
      setSmartStopPrompt('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAiModifyDay = async (e) => {
    e.preventDefault();
    setError('');
    if (!aiInstruction.trim()) {
      setError('Tell Hydrogen how you want to adjust this day.');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch('/api/modify-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'natural_edit',
          city,
          country,
          dayContext: day,
          instruction: aiInstruction.trim(),
          heroImage,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.updatedDay) {
        throw new Error(data?.error || 'Could not apply modification.');
      }
      onReplaceDay(data.updatedDay, data.changeSummary);
      setAiInstruction('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Stop title is required.');
      return;
    }
    if (mode === 'edit_stop' && stopToEdit) {
      onUpdateStop({
        ...stopToEdit,
        title: title.trim(),
        time: time.trim(),
        subtitle: subtitle.trim(),
        category,
        bookingStatus,
        neighborhood: neighborhood.trim(),
        address: address.trim(),
        walkOrTransit: walkOrTransit.trim(),
        summary: summary.trim(),
      });
      onClose();
      return;
    }

    const baseCoords = day.stops?.[0]?.coordinates || { lat: 51.515, lng: -0.142 };
    const manualStop = {
      id: `manual-${Date.now().toString(36)}`,
      time: time.trim() || 'Flexible',
      title: title.trim(),
      subtitle: subtitle.trim(),
      category,
      bookingStatus,
      neighborhood: neighborhood.trim() || city,
      address: address.trim(),
      coordinates: baseCoords,
      walkOrTransit: walkOrTransit.trim(),
      image: day.stops?.[0]?.image || heroImage,
      summary: summary.trim() || `Added to ${day.dateLabel} in ${city}.`,
      insiderTips: [],
      links: buildVenueLinks({
        name: title.trim(),
        city,
        lat: baseCoords.lat,
        lng: baseCoords.lng,
      }),
    };
    onInsertStop(manualStop, null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={() => !loading && onClose()}>
      <div className="studio-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="studio-header">
          <div>
            <span className="eyebrow-pill gold">
              <Pencil size={12} /> Modify {day.dateLabel} On the Fly
            </span>
            <h2 className="editorial-h2">
              {mode === 'edit_stop'
                ? `Edit: ${stopToEdit?.title || 'Stop'}`
                : `Customize ${day.dateLabel}`}
            </h2>
          </div>
          <button className="icon-close-btn" onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        {/* Mode Switcher */}
        {mode !== 'edit_stop' && (
          <div style={{ display: 'flex', gap: 6, padding: '10px 16px 0' }}>
            <button
              type="button"
              className={`day-pill ${mode === 'add' ? 'selected' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
              onClick={() => setMode('add')}
            >
              <span className="dp-sub">+ Add Stop</span>
            </button>
            <button
              type="button"
              className={`day-pill ${mode === 'ai_modify' ? 'selected' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
              onClick={() => setMode('ai_modify')}
            >
              <span className="dp-sub">✨ Ask Hydrogen</span>
            </button>
            <button
              type="button"
              className={`day-pill ${mode === 'manual' ? 'selected' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
              onClick={() => setMode('manual')}
            >
              <span className="dp-sub">Quick Manual</span>
            </button>
          </div>
        )}

        <div className="studio-form">
          {error && <div className="studio-error">{error}</div>}

          {/* MODE 1: SMART ADD STOP WITH HYDROGEN */}
          {mode === 'add' && (
            <>
              {isOnline ? (
                <form onSubmit={handleSmartEnrichAdd}>
                  <label className="studio-label">
                    What stop would you like to add to {day.dateLabel}?
                    <textarea
                      rows={3}
                      placeholder='e.g. "Add Sir John Soane’s Museum at 2:00 p.m." or "Add Fortnum & Mason tea & hamper shopping at 4:30 p.m."'
                      value={smartStopPrompt}
                      onChange={(e) => setSmartStopPrompt(e.target.value)}
                      disabled={loading}
                    />
                  </label>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', margin: '0 0 12px' }}>
                    Gemini 4 Hydrogen automatically builds museum room highlights + audio scripts, internet-featured restaurant dishes, TripAdvisor links, map pins, and caches them offline.
                  </p>
                  <button
                    type="submit"
                    className="btn-gold-solid full-width"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="spin" /> Enriching Stop with Hydrogen...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Enrich & Insert Stop
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="studio-error" style={{ background: '#fef3c7', color: '#78350f' }}>
                  <WifiOff size={15} style={{ verticalAlign: 'middle' }} /> You’re currently offline — use the <strong>Quick Manual</strong> tab above to add stops immediately offline!
                </div>
              )}
            </>
          )}

          {/* MODE 2: NATURAL LANGUAGE MODIFY WITH HYDROGEN */}
          {mode === 'ai_modify' && (
            <form onSubmit={handleAiModifyDay}>
              <label className="studio-label">
                How should Hydrogen adjust {day.dateLabel}?
                <textarea
                  rows={4}
                  placeholder='e.g. "Remove Natural History Museum, move afternoon tea to 4:00 p.m., and add a 1:30 p.m. lunch at Gymkhana Mayfair"'
                  value={aiInstruction}
                  onChange={(e) => setAiInstruction(e.target.value)}
                  disabled={loading || !isOnline}
                />
              </label>
              <button
                type="submit"
                className="btn-gold-solid full-width"
                disabled={loading || !isOnline}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="spin" /> Updating Schedule with Hydrogen...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Apply Changes to {day.dateLabel}
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 3: MANUAL ADD OR IN-PLACE STOP EDIT (100% OFFLINE CAPABLE) */}
          {(mode === 'manual' || mode === 'edit_stop') && (
            <form onSubmit={handleManualSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <label className="studio-label">
                  Time Window
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 2:30–3:45 p.m."
                  />
                </label>
                <label className="studio-label">
                  Category
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: 6,
                      padding: '11px 10px',
                      borderRadius: 12,
                      border: '1.5px solid var(--border-light)',
                      background: '#fff',
                      fontSize: '0.86rem',
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="studio-label">
                Venue / Stop Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Fortnum & Mason Piccadilly"
                  required
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <label className="studio-label">
                  Neighborhood
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="e.g. St James’s / Mayfair"
                  />
                </label>
                <label className="studio-label">
                  Booking Status
                  <select
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: 6,
                      padding: '11px 10px',
                      borderRadius: 12,
                      border: '1.5px solid var(--border-light)',
                      background: '#fff',
                      fontSize: '0.86rem',
                    }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="studio-label">
                Notes / Summary
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Highlights, table notes, or directions..."
                />
              </label>

              <button type="submit" className="btn-gold-solid full-width">
                <Plus size={16} />{' '}
                {mode === 'edit_stop' ? 'Save Stop Changes' : 'Add Stop Immediately'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
