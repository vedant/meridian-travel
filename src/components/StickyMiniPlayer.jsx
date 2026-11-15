import React from 'react';
import { Play, Pause, SkipForward, X, Headphones } from 'lucide-react';
import { useAudioPlayer } from './AudioPlayerContext';

export default function StickyMiniPlayer() {
  const {
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    nextChapter,
    closePlayer,
    setTourDrawerOpen,
    currentIndex,
    playlist,
  } = useAudioPlayer();

  if (!currentChapter) return null;

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="sticky-mini-player" onClick={() => setTourDrawerOpen(true)}>
      <div className="mini-progress-track">
        <div className="mini-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="mini-player-inner">
        <img
          src={currentChapter.image}
          alt={currentChapter.title}
          className="mini-player-art"
        />
        <div className="mini-player-meta">
          <div className="mini-player-kicker">
            <Headphones size={11} /> {currentChapter.stopTitle} · {currentIndex + 1}/{playlist.length}
          </div>
          <div className="mini-player-title">{currentChapter.title}</div>
        </div>
        <div className="mini-player-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="mini-btn primary"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 1 }} />}
          </button>
          {currentIndex + 1 < playlist.length && (
            <button
              className="mini-btn"
              onClick={nextChapter}
              aria-label="Next chapter"
            >
              <SkipForward size={17} />
            </button>
          )}
          <button
            className="mini-btn subtle"
            onClick={closePlayer}
            aria-label="Close audio player"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
