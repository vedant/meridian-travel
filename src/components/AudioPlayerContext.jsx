import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioPlayerContext = createContext(null);

/**
 * Builds a flat playlist of chapters from a museumTour object:
 * Chapter 0 = Museum Overview & Route Orientation
 * Chapters 1..N = Individual Gallery / Artwork Highlights
 */
export function buildTourPlaylist(stop) {
  if (!stop?.museumTour) return [];
  const tour = stop.museumTour;
  const chapters = [];

  if (tour.introTranscript) {
    chapters.push({
      id: `${tour.tourId}-intro`,
      order: 0,
      isIntro: true,
      title: `Overview: ${stop.title}`,
      subtitle: tour.routeStrategy || 'Curatorial Introduction & Floor Strategy',
      location: stop.neighborhood || 'Main Entrance',
      image: stop.image,
      audioUrl: tour.introAudioUrl || null,
      transcript: tour.introTranscript,
      tourTitle: tour.tourTitle || stop.title,
      stopTitle: stop.title,
      narrator: tour.narrator || 'Meridian Cultural Guide',
    });
  }

  (tour.highlights || []).forEach((h, idx) => {
    chapters.push({
      id: `${tour.tourId}-${h.id || idx + 1}`,
      highlightId: h.id,
      order: h.order || idx + 1,
      isIntro: false,
      title: h.title,
      subtitle: h.artistOrOrigin || '',
      location: h.location || '',
      lookClosely: h.lookClosely || '',
      summary: h.summary || '',
      durationMinutes: h.durationMinutes,
      image: h.image || stop.image,
      audioUrl: h.audioUrl || null,
      transcript: h.audioScript || h.summary || '',
      tourTitle: tour.tourTitle || stop.title,
      stopTitle: stop.title,
      narrator: tour.narrator || 'Meridian Cultural Guide',
    });
  });

  return chapters;
}

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const speechTimerRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [activeTourStop, setActiveTourStop] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [usingSpeechFallback, setUsingSpeechFallback] = useState(false);
  const [tourDrawerOpen, setTourDrawerOpen] = useState(false);

  const currentChapter = playlist[currentIndex] || null;

  const stopSpeechFallback = useCallback(() => {
    if (speechTimerRef.current) {
      clearInterval(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakWithWebSpeech = useCallback(
    (chapter, rate = playbackRate) => {
      stopSpeechFallback();
      if (typeof window === 'undefined' || !('speechSynthesis' in window) || !chapter?.transcript) {
        setIsPlaying(false);
        return;
      }
      setUsingSpeechFallback(true);
      const utterance = new SpeechSynthesisUtterance(chapter.transcript);
      utterance.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const gbVoice =
        voices.find((v) => v.lang?.startsWith('en-GB') && v.name.includes('Daniel')) ||
        voices.find((v) => v.lang?.startsWith('en-GB')) ||
        voices.find((v) => v.lang?.startsWith('en'));
      if (gbVoice) utterance.voice = gbVoice;

      const estimatedSecs = Math.max(12, Math.round((chapter.transcript.split(/\s+/).length / 2.4) / rate));
      setDuration(estimatedSecs);
      setCurrentTime(0);

      const startedAt = Date.now();
      speechTimerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startedAt) / 1000;
        setCurrentTime(Math.min(estimatedSecs, elapsed));
      }, 400);

      utterance.onend = () => {
        stopSpeechFallback();
        setCurrentTime(estimatedSecs);
        setCurrentIndex((prev) => {
          if (prev + 1 < playlist.length) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      };
      utterance.onerror = () => {
        stopSpeechFallback();
        setIsPlaying(false);
      };

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    },
    [playbackRate, playlist.length, stopSpeechFallback]
  );

  // Load & play whenever currentChapter changes while active
  const playChapterAt = useCallback(
    async (chapters, index, stopObj, openDrawer = false) => {
      const target = chapters[index];
      if (!target) return;

      stopSpeechFallback();
      setPlaylist(chapters);
      setCurrentIndex(index);
      if (stopObj) setActiveTourStop(stopObj);
      if (openDrawer) setTourDrawerOpen(true);

      const audio = audioRef.current;
      if (audio && target.audioUrl) {
        setUsingSpeechFallback(false);
        audio.pause();
        audio.src = target.audioUrl;
        audio.playbackRate = playbackRate;
        setCurrentTime(0);
        setDuration(0);
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          // Fallback to Web Speech if MP3 missing (e.g., custom AI-generated itinerary)
          speakWithWebSpeech(target, playbackRate);
        }
      } else {
        speakWithWebSpeech(target, playbackRate);
      }
    },
    [playbackRate, speakWithWebSpeech, stopSpeechFallback]
  );

  const startMuseumTour = useCallback(
    (stopObj, startHighlightId = null, openDrawer = true) => {
      const chapters = buildTourPlaylist(stopObj);
      if (!chapters.length) return;
      let idx = 0;
      if (startHighlightId) {
        const found = chapters.findIndex((c) => c.highlightId === startHighlightId || c.id === startHighlightId);
        if (found >= 0) idx = found;
      }
      playChapterAt(chapters, idx, stopObj, openDrawer);
    },
    [playChapterAt]
  );

  const openMuseumGuideOnly = useCallback((stopObj) => {
    const chapters = buildTourPlaylist(stopObj);
    setActiveTourStop(stopObj);
    if (!playlist.length || activeTourStop?.id !== stopObj?.id) {
      setPlaylist(chapters);
      setCurrentIndex(0);
    }
    setTourDrawerOpen(true);
  }, [activeTourStop?.id, playlist.length]);

  const togglePlayPause = useCallback(async () => {
    if (!currentChapter) return;
    if (usingSpeechFallback) {
      if (isPlaying) {
        stopSpeechFallback();
        setIsPlaying(false);
      } else {
        speakWithWebSpeech(currentChapter, playbackRate);
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src && currentChapter.audioUrl) {
      playChapterAt(playlist, currentIndex, activeTourStop, false);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        speakWithWebSpeech(currentChapter, playbackRate);
      }
    }
  }, [
    activeTourStop,
    currentChapter,
    currentIndex,
    isPlaying,
    playbackRate,
    playChapterAt,
    playlist,
    speakWithWebSpeech,
    stopSpeechFallback,
    usingSpeechFallback,
  ]);

  const skipSeconds = useCallback(
    (delta) => {
      if (usingSpeechFallback) return;
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
      setCurrentTime(audio.currentTime);
    },
    [usingSpeechFallback]
  );

  const seekTo = useCallback(
    (timeSec) => {
      if (usingSpeechFallback) return;
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      audio.currentTime = Math.max(0, Math.min(audio.duration, timeSec));
      setCurrentTime(audio.currentTime);
    },
    [usingSpeechFallback]
  );

  const nextChapter = useCallback(() => {
    if (currentIndex + 1 < playlist.length) {
      playChapterAt(playlist, currentIndex + 1, activeTourStop, false);
    }
  }, [activeTourStop, currentIndex, playChapterAt, playlist]);

  const prevChapter = useCallback(() => {
    if (currentTime > 5 && !usingSpeechFallback && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (currentIndex > 0) {
      playChapterAt(playlist, currentIndex - 1, activeTourStop, false);
    }
  }, [activeTourStop, currentIndex, currentTime, playChapterAt, playlist, usingSpeechFallback]);

  const cycleSpeed = useCallback(() => {
    const speeds = [0.9, 1.0, 1.15, 1.25];
    const idx = speeds.indexOf(playbackRate);
    const next = speeds[(idx + 1) % speeds.length];
    setPlaybackRate(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  }, [playbackRate]);

  const closePlayer = useCallback(() => {
    stopSpeechFallback();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }
    setIsPlaying(false);
    setPlaylist([]);
    setActiveTourStop(null);
    setTourDrawerOpen(false);
  }, [stopSpeechFallback]);

  // iOS Lock Screen & AirPods MediaSession API integration
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || !currentChapter) {
      return;
    }
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentChapter.title,
        artist: currentChapter.stopTitle || 'Meridian Audio Tour',
        album: currentChapter.location || currentChapter.tourTitle,
        artwork: currentChapter.image
          ? [{ src: currentChapter.image, sizes: '512x512', type: 'image/jpeg' }]
          : [],
      });
      navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevChapter());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextChapter());
      navigator.mediaSession.setActionHandler('seekbackward', () => skipSeconds(-15));
      navigator.mediaSession.setActionHandler('seekforward', () => skipSeconds(15));
    } catch {
      // Ignore unsupported handlers on older WebKit builds
    }
  }, [currentChapter, nextChapter, prevChapter, skipSeconds, togglePlayPause]);

  return (
    <AudioPlayerContext.Provider
      value={{
        playlist,
        activeTourStop,
        currentChapter,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        usingSpeechFallback,
        tourDrawerOpen,
        setTourDrawerOpen,
        startMuseumTour,
        openMuseumGuideOnly,
        playChapterAt,
        togglePlayPause,
        skipSeconds,
        seekTo,
        nextChapter,
        prevChapter,
        cycleSpeed,
        closePlayer,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          e.currentTarget.playbackRate = playbackRate;
        }}
        onEnded={() => {
          if (currentIndex + 1 < playlist.length) {
            playChapterAt(playlist, currentIndex + 1, activeTourStop, false);
          } else {
            setIsPlaying(false);
          }
        }}
        onError={() => {
          if (currentChapter && isPlaying) {
            speakWithWebSpeech(currentChapter, playbackRate);
          }
        }}
      />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
