import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Headphones,
  MapPin,
  Clock,
  Eye,
  BookOpen,
  RotateCcw,
  RotateCw,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { useAudioPlayer, buildTourPlaylist } from './AudioPlayerContext';

function formatTime(sec) {
  if (!sec || !Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function MuseumTourModal() {
  const {
    activeTourStop,
    playlist,
    currentChapter,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    tourDrawerOpen,
    setTourDrawerOpen,
    playChapterAt,
    togglePlayPause,
    skipSeconds,
    seekTo,
    nextChapter,
    prevChapter,
    cycleSpeed,
  } = useAudioPlayer();

  const [showTranscript, setShowTranscript] = useState(true);

  if (!tourDrawerOpen || !activeTourStop?.museumTour) return null;

  const tour = activeTourStop.museumTour;
  const chapters = playlist.length ? playlist : buildTourPlaylist(activeTourStop);
  const activeCh = currentChapter || chapters[0];

  return (
    <div className="modal-backdrop" onClick={() => setTourDrawerOpen(false)}>
      <div
        className="museum-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={tour.tourTitle || activeTourStop.title}
      >
        <div className="sheet-grabber" />

        {/* Header */}
        <div className="museum-modal-header">
          <div>
            <span className="eyebrow-pill gold">
              <Headphones size={13} /> Guided Museum & Audiobook Tour
            </span>
            <h2 className="editorial-h2">{activeTourStop.title}</h2>
            <p className="subtle-meta">
              {tour.narrator || 'Curatorial Audio Companion'} ·{' '}
              {tour.totalDurationMinutes ? `${tour.totalDurationMinutes} min visit` : `${chapters.length} audio stops`}
            </p>
          </div>
          <button
            className="icon-close-btn"
            onClick={() => setTourDrawerOpen(false)}
            aria-label="Close tour"
          >
            <X size={20} />
          </button>
        </div>

        <div className="museum-modal-scroll">
          {/* Now Playing / Active Highlight Hero Card */}
          {activeCh && (
            <div className="now-playing-card">
              <div className="now-playing-img-wrap">
                <img
                  src={activeCh.image || activeTourStop.image}
                  alt={activeCh.title}
                  className="now-playing-img"
                />
                <div className="now-playing-badges">
                  <span className="room-badge">
                    <MapPin size={12} /> {activeCh.location || 'Main Gallery'}
                  </span>
                  <span className="chapter-count-badge">
                    Stop {currentIndex + 1} of {chapters.length}
                  </span>
                </div>
              </div>

              <div className="now-playing-body">
                <div className="now-playing-titles">
                  <h3>{activeCh.title}</h3>
                  {activeCh.subtitle && <p className="artist-line">{activeCh.subtitle}</p>}
                </div>

                {/* Scrubber */}
                <div className="audio-scrubber-wrap">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.5}
                    value={Math.min(currentTime, duration || 100)}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    className="audio-range"
                    aria-label="Audio progress"
                  />
                  <div className="audio-time-row">
                    <span>{formatTime(currentTime)}</span>
                    <span>{duration ? formatTime(duration) : 'Ready to play'}</span>
                  </div>
                </div>

                {/* Transport Controls */}
                <div className="audio-transport-row">
                  <button
                    className="speed-pill-btn"
                    onClick={cycleSpeed}
                    title="Playback speed"
                  >
                    {playbackRate}x
                  </button>
                  <button
                    className="transport-icon-btn"
                    onClick={prevChapter}
                    disabled={currentIndex === 0 && currentTime < 4}
                    aria-label="Previous stop"
                  >
                    <SkipBack size={20} />
                  </button>
                  <button
                    className="transport-icon-btn"
                    onClick={() => skipSeconds(-15)}
                    aria-label="Back 15 seconds"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    className="transport-play-main"
                    onClick={() => {
                      if (!currentChapter) {
                        playChapterAt(chapters, 0, activeTourStop, true);
                      } else {
                        togglePlayPause();
                      }
                    }}
                    aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 2 }} />}
                  </button>
                  <button
                    className="transport-icon-btn"
                    onClick={() => skipSeconds(15)}
                    aria-label="Forward 15 seconds"
                  >
                    <RotateCw size={18} />
                  </button>
                  <button
                    className="transport-icon-btn"
                    onClick={nextChapter}
                    disabled={currentIndex >= chapters.length - 1}
                    aria-label="Next stop"
                  >
                    <SkipForward size={20} />
                  </button>
                  <button
                    className={`speed-pill-btn ${showTranscript ? 'active' : ''}`}
                    onClick={() => setShowTranscript((v) => !v)}
                    title="Toggle read-along script"
                  >
                    <BookOpen size={15} />
                  </button>
                </div>

                {activeCh.lookClosely && (
                  <div className="look-closely-box">
                    <div className="look-closely-title">
                      <Eye size={15} /> What to Look For in Person
                    </div>
                    <p>{activeCh.lookClosely}</p>
                  </div>
                )}

                {showTranscript && activeCh.transcript && (
                  <div className="transcript-box">
                    <div className="transcript-label">
                      <Volume2 size={14} /> Read-Along Audio Script
                    </div>
                    <p>{activeCh.transcript}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Floor & Route Strategy */}
          {tour.routeStrategy && (
            <div className="route-strategy-banner">
              <strong>Pacing & Gallery Route:</strong> {tour.routeStrategy}
            </div>
          )}

          {/* Complete Room-by-Room Highlight List */}
          <div className="highlights-list-section">
            <h4 className="section-subhead">
              All Tour Chapters & Exact Gallery Locations ({chapters.length})
            </h4>
            <div className="highlights-stack">
              {chapters.map((ch, idx) => {
                const isCurrent = idx === currentIndex && Boolean(currentChapter);
                return (
                  <div
                    key={ch.id}
                    className={`highlight-row-card ${isCurrent ? 'active-chapter' : ''}`}
                    onClick={() => playChapterAt(chapters, idx, activeTourStop, true)}
                  >
                    <img
                      src={ch.image || activeTourStop.image}
                      alt={ch.title}
                      className="highlight-row-thumb"
                      loading="lazy"
                    />
                    <div className="highlight-row-content">
                      <div className="highlight-row-top">
                        <span className="step-num-pill">
                          {ch.isIntro ? 'Intro' : `Stop ${ch.order}`}
                        </span>
                        <span className="highlight-loc-text">
                          <MapPin size={12} /> {ch.location}
                        </span>
                      </div>
                      <h5>{ch.title}</h5>
                      {ch.subtitle && <p className="highlight-origin">{ch.subtitle}</p>}
                      {ch.summary && !ch.isIntro && (
                        <p className="highlight-desc">{ch.summary}</p>
                      )}
                      {ch.durationMinutes && (
                        <span className="highlight-dur">
                          <Clock size={11} /> ~{ch.durationMinutes} min in gallery
                        </span>
                      )}
                    </div>
                    <button
                      className={`chapter-play-circle ${isCurrent && isPlaying ? 'playing' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isCurrent) {
                          togglePlayPause();
                        } else {
                          playChapterAt(chapters, idx, activeTourStop, true);
                        }
                      }}
                      aria-label={`Play ${ch.title}`}
                    >
                      {isCurrent && isPlaying ? (
                        <Pause size={16} />
                      ) : idx < currentIndex ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Play size={16} style={{ marginLeft: 1 }} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
