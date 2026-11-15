import React, { useState } from 'react';
import { X, Sparkles, Loader2, Upload, Globe2 } from 'lucide-react';

const QUICK_IDEAS = [
  '3 Days in Paris: Louvre masterpieces, Musée d’Orsay, Saint-Germain bistros & Le Marais boutiques',
  '3 Days in Istanbul: Hagia Sophia, Topkapi Palace Treasury, Spice Bazaar & Karaköy dining',
  '2 Days in Vienna: Kunsthistorisches Museum, Schönbrunn Palace, Café Central & Musikverein',
];

export default function ItineraryStudioModal({ isOpen, onClose, onAddItinerary }) {
  const [destinationPrompt, setDestinationPrompt] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    if (!destinationPrompt.trim() && !pastedText.trim()) {
      setError('Enter a city/theme or paste itinerary text first.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationPrompt, pastedText }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.itinerary) {
        throw new Error(data?.error || 'Could not build itinerary.');
      }
      onAddItinerary(data.itinerary);
      setDestinationPrompt('');
      setPastedText('');
      onClose();
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result || ''));
        if (!parsed.city || !Array.isArray(parsed.days)) {
          throw new Error('Invalid Meridian itinerary JSON.');
        }
        parsed.id = parsed.id || `imported-${Date.now()}`;
        parsed.isCustom = true;
        onAddItinerary(parsed);
        onClose();
      } catch (err) {
        setError(err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-backdrop" onClick={() => !loading && onClose()}>
      <div className="studio-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="studio-header">
          <div>
            <span className="eyebrow-pill gold">
              <Globe2 size={12} /> Universal Itinerary Engine
            </span>
            <h2 className="editorial-h2">Create or Import Any City</h2>
            <p className="subtle-meta">
              Generate museum tours, audio guides, featured restaurant dishes & TripAdvisor links for any destination worldwide.
            </p>
          </div>
          <button className="icon-close-btn" onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        <form className="studio-form" onSubmit={handleGenerate}>
          <label className="studio-label">
            Destination, Duration & Interests
            <input
              type="text"
              placeholder="e.g., 4 Days in Barcelona — Gaudí, Picasso Museum & tapas"
              value={destinationPrompt}
              onChange={(e) => setDestinationPrompt(e.target.value)}
              disabled={loading}
            />
          </label>

          <div className="quick-ideas-row">
            {QUICK_IDEAS.map((idea, idx) => (
              <button
                type="button"
                key={idx}
                className="idea-chip"
                onClick={() => setDestinationPrompt(idea)}
                disabled={loading}
              >
                + {idea.split(':')[0]}
              </button>
            ))}
          </div>

          <label className="studio-label">
            Or Paste Existing Trip Notes / PDF Text (Optional)
            <textarea
              rows={4}
              placeholder="Paste any raw flight times, hotel, museum bookings, or day-by-day plan here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              disabled={loading}
            />
          </label>

          {error && <div className="studio-error">{error}</div>}

          <div className="studio-actions">
            <button type="submit" className="btn-gold-solid full-width" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={17} className="spin" /> Curating Museums, Dishes & Audio Scripts (~15s)...
                </>
              ) : (
                <>
                  <Sparkles size={17} /> Build Complete Interactive Guide
                </>
              )}
            </button>

            <label className="json-upload-label">
              <Upload size={15} /> Import `.json` Itinerary File
              <input type="file" accept=".json,application/json" onChange={handleJsonImport} hidden />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
