import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Calendar,
  Headphones,
  Utensils,
  Map as MapIcon,
  Globe2,
  Play,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Circle,
  ExternalLink,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Plus,
  Download,
  Trash2,
  Award,
  MapPin,
  WifiOff,
  Check,
  Cloud,
  Pencil,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { BUILTIN_ITINERARIES } from './data/index.js';
import {
  AudioPlayerProvider,
  useAudioPlayer,
} from './components/AudioPlayerContext.jsx';
import MuseumTourModal from './components/MuseumTourModal.jsx';
import StickyMiniPlayer from './components/StickyMiniPlayer.jsx';
import RouteMapView from './components/RouteMapView.jsx';
import StopDetailSheet from './components/StopDetailSheet.jsx';
import ItineraryStudioModal from './components/ItineraryStudioModal.jsx';
import InstallIOSModal from './components/InstallIOSModal.jsx';
import OfflineVaultModal from './components/OfflineVaultModal.jsx';
import OnTheFlyEditorModal from './components/OnTheFlyEditorModal.jsx';
import CloudSyncModal from './components/CloudSyncModal.jsx';
import {
  offlineEntireItinerary,
  getItineraryOfflineStatus,
  saveItineraryToIdb,
} from './services/offlineVault.js';
import {
  checkAuthSession,
  backupToGoogleDrive,
  restoreFromGoogleDrive,
  logoutGoogleSession,
} from './services/driveSync.js';

const STORAGE_KEYS = {
  CUSTOM_ITINERARIES: 'meridian_custom_itineraries_v1',
  MODIFIED_BUILTINS: 'meridian_modified_builtins_v1',
  ACTIVE_ITIN_ID: 'meridian_active_itinerary_v1',
  COMPLETED_STOPS: 'meridian_completed_stops_v1',
  BOOKED_RES: 'meridian_booked_reservations_v1',
  STOP_NOTES: 'meridian_stop_notes_v1',
  LARGE_TEXT: 'meridian_large_text_v1',
  DRIVE_META: 'meridian_drive_meta_v1',
};

function safeReadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function MeridianShell() {
  const { startMuseumTour, openMuseumGuideOnly, closePlayer } = useAudioPlayer();

  const [customItineraries, setCustomItineraries] = useState(() =>
    safeReadJson(STORAGE_KEYS.CUSTOM_ITINERARIES, [])
  );
  const [modifiedBuiltins, setModifiedBuiltins] = useState(() =>
    safeReadJson(STORAGE_KEYS.MODIFIED_BUILTINS, {})
  );
  const [activeItinId, setActiveItinId] = useState(
    () => localStorage.getItem(STORAGE_KEYS.ACTIVE_ITIN_ID) || BUILTIN_ITINERARIES[0].id
  );
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDayId, setSelectedDayId] = useState('day-1');
  const [altTrackByDay, setAltTrackByDay] = useState({});
  const [focusedStopIdx, setFocusedStopIdx] = useState(0);
  const [activeDetailStop, setActiveDetailStop] = useState(null);

  // Modals & Editing States
  const [studioOpen, setStudioOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);
  const [cloudModalOpen, setCloudModalOpen] = useState(false);
  const [editDayMode, setEditDayMode] = useState(false);
  const [editorState, setEditorState] = useState({
    open: false,
    mode: 'add',
    stopToEdit: null,
  });
  const [toastMsg, setToastMsg] = useState('');

  // Map States
  const [mapDayIndex, setMapDayIndex] = useState(0);
  const [showShoppingWalkOnMap, setShowShoppingWalkOnMap] = useState(false);

  // User Persisted Progress
  const [completedStops, setCompletedStops] = useState(() =>
    safeReadJson(STORAGE_KEYS.COMPLETED_STOPS, {})
  );
  const [bookedRes, setBookedRes] = useState(() =>
    safeReadJson(STORAGE_KEYS.BOOKED_RES, {})
  );
  const [stopNotes, setStopNotes] = useState(() =>
    safeReadJson(STORAGE_KEYS.STOP_NOTES, {})
  );
  const [largeText, setLargeText] = useState(
    () => localStorage.getItem(STORAGE_KEYS.LARGE_TEXT) === '1'
  );

  // Network + Automatic Offline Vault State
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [offlineState, setOfflineState] = useState({
    syncing: false,
    ready: false,
    progress: 0,
    stats: {},
  });
  const [syncingAllOffline, setSyncingAllOffline] = useState(false);

  // Google OAuth + Drive Backup State
  const [authState, setAuthState] = useState({
    authenticated: false,
    user: null,
    oauthConfigured: false,
  });
  const [driveStatus, setDriveStatus] = useState(() => ({
    syncing: false,
    lastSyncedAt: safeReadJson(STORAGE_KEYS.DRIVE_META, {}).lastSyncedAt || null,
    folderUrl: safeReadJson(STORAGE_KEYS.DRIVE_META, {}).folderUrl || null,
    pendingOfflineChanges: Boolean(
      safeReadJson(STORAGE_KEYS.DRIVE_META, {}).pendingOfflineChanges
    ),
    error: '',
  }));

  const stopCardRefs = useRef({});
  const driveDebounceRef = useRef(null);
  const hasMountedRef = useRef(false);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? '' : curr));
    }, 4200);
  }, []);

  // Merge built-in itineraries (with any on-the-fly user modifications applied!) + custom itineraries
  const allItineraries = useMemo(() => {
    const builtins = BUILTIN_ITINERARIES.map(
      (b) => modifiedBuiltins[b.id] || b
    );
    return [...builtins, ...customItineraries];
  }, [modifiedBuiltins, customItineraries]);

  const activeItinerary = useMemo(
    () =>
      allItineraries.find((it) => it.id === activeItinId) || allItineraries[0],
    [allItineraries, activeItinId]
  );

  const isBuiltinModified = Boolean(modifiedBuiltins[activeItinerary?.id]);

  // Listen to browser online/offline transitions
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync selectedDayId when switching trips
  useEffect(() => {
    if (activeItinerary?.days?.length) {
      const exists =
        selectedDayId === 'overview' ||
        activeItinerary.days.some((d) => d.id === selectedDayId);
      if (!exists) {
        setSelectedDayId(activeItinerary.days[0].id);
      }
    }
    setMapDayIndex(0);
    setShowShoppingWalkOnMap(false);
  }, [activeItinerary?.id]);

  useEffect(() => {
    document.body.classList.toggle('comfort-large', largeText);
    localStorage.setItem(STORAGE_KEYS.LARGE_TEXT, largeText ? '1' : '0');
  }, [largeText]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ITIN_ID, activeItinerary.id);
  }, [activeItinerary.id]);

  // AUTOMATIC OFFLINE SYNC FOR ACTIVE ITINERARY
  const runOfflineSyncForActive = useCallback(
    async (force = false) => {
      if (!activeItinerary) return;
      await saveItineraryToIdb(activeItinerary);

      const currentStatus = await getItineraryOfflineStatus(activeItinerary);
      if (currentStatus.ready && !force) {
        setOfflineState({
          syncing: false,
          ready: true,
          progress: 100,
          stats: currentStatus,
        });
        return;
      }

      if (!navigator.onLine) {
        setOfflineState({
          syncing: false,
          ready: currentStatus.ready,
          progress: currentStatus.total
            ? Math.round((currentStatus.cached / currentStatus.total) * 100)
            : 0,
          stats: currentStatus,
        });
        return;
      }

      setOfflineState((prev) => ({ ...prev, syncing: true }));
      const result = await offlineEntireItinerary(activeItinerary, (prog) => {
        setOfflineState((prev) => ({
          ...prev,
          syncing: true,
          progress: prog.percent,
        }));
      });

      setOfflineState({
        syncing: false,
        ready: result.ok,
        progress: 100,
        stats: result,
      });
    },
    [activeItinerary]
  );

  useEffect(() => {
    runOfflineSyncForActive(false);
  }, [activeItinerary, runOfflineSyncForActive]);

  const handleOfflineAllTrips = async () => {
    setSyncingAllOffline(true);
    try {
      for (const itin of allItineraries) {
        await offlineEntireItinerary(itin);
      }
      await runOfflineSyncForActive(false);
      showToast('All destinations cached for 100% offline use!');
    } finally {
      setSyncingAllOffline(false);
    }
  };

  // GOOGLE OAUTH & GOOGLE DRIVE AUTO-BACKUP
  const refreshAuthSession = useCallback(async () => {
    const s = await checkAuthSession();
    setAuthState(s);
    return s;
  }, []);

  useEffect(() => {
    refreshAuthSession().then((s) => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('auth') === 'connected') {
        showToast('Signed in with Google — Drive backup enabled!');
        window.history.replaceState({}, '', window.location.pathname);
        setCloudModalOpen(true);
      } else if (params.get('auth_error')) {
        setCloudModalOpen(true);
        window.history.replaceState({}, '', window.location.pathname);
      }
      // If signed in and no local custom/modified itineraries yet, pull from Drive gently
      if (
        s.authenticated &&
        customItineraries.length === 0 &&
        Object.keys(modifiedBuiltins).length === 0 &&
        navigator.onLine
      ) {
        restoreFromGoogleDrive()
          .then((res) => {
            if (res?.hasBackup && res.backup) {
              const b = res.backup;
              if (Array.isArray(b.customItineraries) && b.customItineraries.length) {
                setCustomItineraries(b.customItineraries);
                localStorage.setItem(
                  STORAGE_KEYS.CUSTOM_ITINERARIES,
                  JSON.stringify(b.customItineraries)
                );
              }
              if (b.modifiedBuiltins && Object.keys(b.modifiedBuiltins).length) {
                setModifiedBuiltins(b.modifiedBuiltins);
                localStorage.setItem(
                  STORAGE_KEYS.MODIFIED_BUILTINS,
                  JSON.stringify(b.modifiedBuiltins)
                );
              }
            }
          })
          .catch(() => {});
      }
    });
  }, []);

  const performDriveBackup = useCallback(
    async (silent = false) => {
      if (!authState.authenticated) return;
      if (!navigator.onLine) {
        const meta = { ...driveStatus, pendingOfflineChanges: true };
        setDriveStatus(meta);
        localStorage.setItem(STORAGE_KEYS.DRIVE_META, JSON.stringify(meta));
        return;
      }

      setDriveStatus((p) => ({ ...p, syncing: true, error: '' }));
      try {
        const res = await backupToGoogleDrive({
          activeItinId: activeItinerary.id,
          customItineraries,
          modifiedBuiltins,
          completedStops,
          bookedRes,
          stopNotes,
        });
        const nextMeta = {
          syncing: false,
          lastSyncedAt: res.syncedAt,
          folderUrl: res.folderUrl,
          pendingOfflineChanges: false,
          error: '',
        };
        setDriveStatus(nextMeta);
        localStorage.setItem(STORAGE_KEYS.DRIVE_META, JSON.stringify(nextMeta));
        if (!silent) {
          showToast('Backed up itineraries to Google Drive!');
        }
      } catch (err) {
        setDriveStatus((p) => ({
          ...p,
          syncing: false,
          error: err.message,
        }));
      }
    },
    [
      authState.authenticated,
      activeItinerary.id,
      customItineraries,
      modifiedBuiltins,
      completedStops,
      bookedRes,
      stopNotes,
      driveStatus,
      showToast,
    ]
  );

  // Auto-backup to Google Drive 2s after any itinerary creation/modification
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!authState.authenticated) return;
    if (driveDebounceRef.current) clearTimeout(driveDebounceRef.current);
    driveDebounceRef.current = setTimeout(() => {
      performDriveBackup(true);
    }, 2000);
    return () => clearTimeout(driveDebounceRef.current);
  }, [
    customItineraries,
    modifiedBuiltins,
    completedStops,
    bookedRes,
    stopNotes,
  ]);

  // Flush queued offline Drive backup automatically when internet returns!
  useEffect(() => {
    if (isOnline && authState.authenticated && driveStatus.pendingOfflineChanges) {
      performDriveBackup(true);
    }
  }, [isOnline, authState.authenticated, driveStatus.pendingOfflineChanges, performDriveBackup]);

  const handleRestoreFromDrive = async () => {
    setDriveStatus((p) => ({ ...p, syncing: true, error: '' }));
    try {
      const res = await restoreFromGoogleDrive();
      if (!res?.hasBackup || !res.backup) {
        setDriveStatus((p) => ({ ...p, syncing: false }));
        showToast('No backup found in Google Drive yet.');
        return;
      }
      const b = res.backup;
      if (Array.isArray(b.customItineraries)) {
        setCustomItineraries(b.customItineraries);
        localStorage.setItem(
          STORAGE_KEYS.CUSTOM_ITINERARIES,
          JSON.stringify(b.customItineraries)
        );
      }
      if (b.modifiedBuiltins) {
        setModifiedBuiltins(b.modifiedBuiltins);
        localStorage.setItem(
          STORAGE_KEYS.MODIFIED_BUILTINS,
          JSON.stringify(b.modifiedBuiltins)
        );
      }
      if (b.completedStops) {
        setCompletedStops(b.completedStops);
        localStorage.setItem(
          STORAGE_KEYS.COMPLETED_STOPS,
          JSON.stringify(b.completedStops)
        );
      }
      if (b.bookedRes) {
        setBookedRes(b.bookedRes);
        localStorage.setItem(STORAGE_KEYS.BOOKED_RES, JSON.stringify(b.bookedRes));
      }
      if (b.stopNotes) {
        setStopNotes(b.stopNotes);
        localStorage.setItem(STORAGE_KEYS.STOP_NOTES, JSON.stringify(b.stopNotes));
      }
      setDriveStatus((p) => ({
        ...p,
        syncing: false,
        lastSyncedAt: res.modifiedTime || new Date().toISOString(),
        folderUrl: res.folderUrl || p.folderUrl,
      }));
      showToast('Restored itineraries from Google Drive!');
    } catch (err) {
      setDriveStatus((p) => ({ ...p, syncing: false, error: err.message }));
    }
  };

  const handleLogoutGoogle = async () => {
    await logoutGoogleSession();
    setAuthState({ authenticated: false, user: null, oauthConfigured: authState.oauthConfigured });
    showToast('Signed out of Google.');
  };

  // UNIVERSAL MUTATOR FOR ON-THE-FLY ITINERARY MODIFICATIONS
  const commitActiveItineraryChange = useCallback(
    (mutatorFn) => {
      const cloned = JSON.parse(JSON.stringify(activeItinerary));
      const updated = mutatorFn(cloned) || cloned;
      updated.updatedAt = new Date().toISOString();

      if (updated.isCustom) {
        setCustomItineraries((prev) => {
          const next = prev.map((it) => (it.id === updated.id ? updated : it));
          localStorage.setItem(
            STORAGE_KEYS.CUSTOM_ITINERARIES,
            JSON.stringify(next)
          );
          return next;
        });
      } else {
        setModifiedBuiltins((prev) => {
          const next = { ...prev, [updated.id]: updated };
          localStorage.setItem(
            STORAGE_KEYS.MODIFIED_BUILTINS,
            JSON.stringify(next)
          );
          return next;
        });
      }
      saveItineraryToIdb(updated);
    },
    [activeItinerary]
  );

  const handleResetBuiltinItinerary = () => {
    setModifiedBuiltins((prev) => {
      const next = { ...prev };
      delete next[activeItinerary.id];
      localStorage.setItem(STORAGE_KEYS.MODIFIED_BUILTINS, JSON.stringify(next));
      return next;
    });
    showToast('Restored original itinerary schedule.');
  };

  const currentDay = useMemo(() => {
    if (selectedDayId === 'overview') return null;
    return (
      activeItinerary.days.find((d) => d.id === selectedDayId) ||
      activeItinerary.days[0] ||
      null
    );
  }, [activeItinerary.days, selectedDayId]);

  const usingAltTrack = Boolean(
    currentDay && altTrackByDay[currentDay.id] && currentDay.alternateTrack?.stops?.length
  );

  const activeStopsForDay = useMemo(() => {
    if (!currentDay) return [];
    return usingAltTrack
      ? currentDay.alternateTrack.stops
      : currentDay.stops || [];
  }, [currentDay, usingAltTrack]);

  // On-the-fly Stop Operations (Add, Update, Remove, Reorder, Replace Day, Add Day)
  const handleInsertStop = (newStop, insertIndex = null) => {
    if (!currentDay) return;
    commitActiveItineraryChange((itin) => {
      const dayObj = itin.days.find((d) => d.id === currentDay.id);
      if (!dayObj) return itin;
      const list = usingAltTrack
        ? dayObj.alternateTrack.stops
        : dayObj.stops;
      if (
        typeof insertIndex === 'number' &&
        insertIndex >= 0 &&
        insertIndex <= list.length
      ) {
        list.splice(insertIndex, 0, newStop);
      } else {
        list.push(newStop);
      }
      return itin;
    });
    showToast(`Added "${newStop.title}" to ${currentDay.dateLabel}`);
  };

  const handleUpdateStop = (editedStop) => {
    if (!currentDay) return;
    commitActiveItineraryChange((itin) => {
      const dayObj = itin.days.find((d) => d.id === currentDay.id);
      if (!dayObj) return itin;
      const key = usingAltTrack ? 'alternateTrack' : 'stops';
      if (key === 'alternateTrack') {
        dayObj.alternateTrack.stops = dayObj.alternateTrack.stops.map((s) =>
          s.id === editedStop.id ? editedStop : s
        );
      } else {
        dayObj.stops = dayObj.stops.map((s) =>
          s.id === editedStop.id ? editedStop : s
        );
      }
      return itin;
    });
    showToast(`Updated "${editedStop.title}"`);
  };

  const handleRemoveStop = (stopId) => {
    if (!currentDay) return;
    commitActiveItineraryChange((itin) => {
      const dayObj = itin.days.find((d) => d.id === currentDay.id);
      if (!dayObj) return itin;
      if (usingAltTrack) {
        dayObj.alternateTrack.stops = dayObj.alternateTrack.stops.filter(
          (s) => s.id !== stopId
        );
      } else {
        dayObj.stops = dayObj.stops.filter((s) => s.id !== stopId);
      }
      return itin;
    });
    showToast('Removed stop from schedule.');
  };

  const handleMoveStop = (idx, direction) => {
    if (!currentDay) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= activeStopsForDay.length) return;
    commitActiveItineraryChange((itin) => {
      const dayObj = itin.days.find((d) => d.id === currentDay.id);
      if (!dayObj) return itin;
      const list = usingAltTrack
        ? dayObj.alternateTrack.stops
        : dayObj.stops;
      const [moved] = list.splice(idx, 1);
      list.splice(targetIdx, 0, moved);
      return itin;
    });
  };

  const handleReplaceDayFromAi = (updatedDay, changeSummary) => {
    commitActiveItineraryChange((itin) => {
      itin.days = itin.days.map((d) =>
        d.id === updatedDay.id ? updatedDay : d
      );
      return itin;
    });
    showToast(changeSummary || `Updated ${updatedDay.dateLabel}`);
  };

  const handleAddNewDay = () => {
    let createdId = '';
    commitActiveItineraryChange((itin) => {
      const nextNum = (itin.days?.length || 0) + 1;
      createdId = `day-${nextNum}-${Date.now().toString(36)}`;
      itin.days.push({
        id: createdId,
        dayNumber: nextNum,
        dateLabel: `Day ${nextNum}`,
        fullDate: `Day ${nextNum} — Custom Schedule`,
        title: `${itin.city} Custom Exploration`,
        theme: 'Add stops manually or with Hydrogen AI',
        shoppingSummary: '',
        weatherTip: '',
        stops: [],
      });
      return itin;
    });
    if (createdId) setSelectedDayId(createdId);
    showToast('Added new day to itinerary!');
  };

  // Deduplicated list of all museum/audio tours across the entire active itinerary
  const allMuseumStops = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const day of activeItinerary.days || []) {
      const combined = [
        ...(day.stops || []),
        ...(day.alternateTrack?.stops || []),
      ];
      for (const st of combined) {
        if (st.museumTour && !seen.has(st.museumTour.tourId || st.id)) {
          seen.add(st.museumTour.tourId || st.id);
          list.push({ ...st, _dayLabel: day.dateLabel });
        }
      }
    }
    return list;
  }, [activeItinerary]);

  // Deduplicated list of all dining guides across the active itinerary
  const allDiningStops = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const day of activeItinerary.days || []) {
      const combined = [
        ...(day.stops || []),
        ...(day.alternateTrack?.stops || []),
      ];
      for (const st of combined) {
        if (st.diningGuide && !seen.has(st.title)) {
          seen.add(st.title);
          list.push({ ...st, _dayLabel: day.dateLabel });
        }
      }
    }
    return list;
  }, [activeItinerary]);

  const shoppingDistricts = useMemo(() => {
    if (Array.isArray(activeItinerary.shoppingAtlas))
      return activeItinerary.shoppingAtlas;
    return activeItinerary.shoppingAtlas?.districts || [];
  }, [activeItinerary]);

  const shoppingWalk = useMemo(() => {
    return (
      activeItinerary.langhamShoppingWalk ||
      activeItinerary.shoppingAtlas?.langhamShoppingWalk ||
      null
    );
  }, [activeItinerary]);

  const toggleStopCompleted = (stopId) => {
    setCompletedStops((prev) => {
      const next = { ...prev, [stopId]: !prev[stopId] };
      localStorage.setItem(STORAGE_KEYS.COMPLETED_STOPS, JSON.stringify(next));
      return next;
    });
  };

  const toggleResBooked = (resId) => {
    setBookedRes((prev) => {
      const next = { ...prev, [resId]: !prev[resId] };
      localStorage.setItem(STORAGE_KEYS.BOOKED_RES, JSON.stringify(next));
      return next;
    });
  };

  const saveStopNote = (stopId, text) => {
    setStopNotes((prev) => {
      const next = { ...prev, [stopId]: text };
      localStorage.setItem(STORAGE_KEYS.STOP_NOTES, JSON.stringify(next));
      return next;
    });
  };

  const handleAddItinerary = (newItin) => {
    setCustomItineraries((prev) => {
      const updated = [newItin, ...prev];
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_ITINERARIES,
        JSON.stringify(updated)
      );
      return updated;
    });
    closePlayer();
    setActiveItinId(newItin.id);
    setSelectedDayId(newItin.days?.[0]?.id || 'overview');
    setActiveTab('itinerary');
    showToast(`Created ${newItin.city} itinerary & caching offline!`);
  };

  const handleDeleteCustomItinerary = (id, e) => {
    e.stopPropagation();
    setCustomItineraries((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_ITINERARIES,
        JSON.stringify(updated)
      );
      return updated;
    });
    if (activeItinId === id) {
      setActiveItinId(BUILTIN_ITINERARIES[0].id);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(activeItinerary, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeItinerary.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const jumpToStop = (idx) => {
    const bounded = Math.max(0, Math.min(activeStopsForDay.length - 1, idx));
    setFocusedStopIdx(bounded);
    const st = activeStopsForDay[bounded];
    if (st && stopCardRefs.current[st.id]) {
      stopCardRefs.current[st.id].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const getTripAdvisorLink = (links = []) =>
    links.find((l) => l.platform === 'tripadvisor')?.url || null;

  return (
    <div className="app-shell">
      {/* Sticky iOS Top Navigation */}
      <header className="top-app-bar">
        <div
          className="brand-cluster"
          onClick={() => setActiveTab('trips')}
          title="Switch destination or manage itineraries"
        >
          <img src="/favicon.svg" alt="Meridian" className="brand-mark" />
          <div className="brand-titles">
            <div className="brand-kicker">Meridian Companion</div>
            <div className="brand-city">{activeItinerary.city}</div>
          </div>
        </div>

        <div className="top-bar-actions">
          {/* Automatic Offline Status Pill */}
          <button
            className={`top-pill-btn ${
              offlineState.ready ? 'offline-ready-pill' : ''
            }`}
            onClick={() => setOfflineModalOpen(true)}
            title="Offline Vault Status"
          >
            {offlineState.syncing ? (
              <>
                <Loader2 size={13} className="spin" /> {offlineState.progress}%
              </>
            ) : !isOnline ? (
              <>
                <WifiOff size={13} /> Offline
              </>
            ) : offlineState.ready ? (
              <>
                <Check size={13} /> Offline
              </>
            ) : (
              <>
                <WifiOff size={13} /> Cache
              </>
            )}
          </button>

          {/* Google OAuth & Drive Backup Pill */}
          <button
            className={`top-pill-btn ${
              authState.authenticated ? 'active' : ''
            }`}
            onClick={() => setCloudModalOpen(true)}
            title="Google Account & Drive Backup"
          >
            <Cloud size={13} />
            {driveStatus.syncing
              ? 'Syncing'
              : authState.authenticated
              ? 'Drive ✓'
              : 'Sync'}
          </button>

          <button
            className={`top-pill-btn ${largeText ? 'active' : ''}`}
            onClick={() => setLargeText((v) => !v)}
            title="Toggle Larger Reading Text"
          >
            Aa
          </button>

          <button
            className="top-pill-btn"
            onClick={() => setStudioOpen(true)}
            title="Add or generate any city itinerary"
          >
            <Plus size={14} /> City
          </button>
        </div>
      </header>

      {/* Offline Mode Reassurance Strip */}
      {!isOnline && (
        <div className="offline-live-banner">
          <WifiOff size={14} />
          <span>
            <strong>Offline Mode Active:</strong> Running from on-device cache — itinerary, photos, audiobooks & local edits work without internet.
          </span>
        </div>
      )}

      {/* Toast Feedback Banner */}
      {toastMsg && <div className="floating-toast">{toastMsg}</div>}

      {/* TAB 1: ITINERARY & DAY-BY-DAY COMPANION */}
      {activeTab === 'itinerary' && (
        <>
          <section className="trip-hero">
            <img
              src={activeItinerary.heroImage}
              alt={activeItinerary.title}
              className="trip-hero-img"
            />
            <div className="trip-hero-overlay">
              {activeItinerary.travelers && (
                <span className="hero-traveler-badge">
                  {activeItinerary.travelers}
                </span>
              )}
              <h1>{activeItinerary.title}</h1>
              <p>{activeItinerary.subtitle}</p>
            </div>
          </section>

          {Array.isArray(activeItinerary.stats) && (
            <div className="stats-strip">
              {activeItinerary.stats.slice(0, 4).map((st, idx) => (
                <div className="stat-cell" key={idx}>
                  <div className="stat-val">{st.value}</div>
                  <div className="stat-lbl">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          <main className="page-body">
            {/* Day Selector Pills + Add Day */}
            <div
              className="day-pills-scroller"
              role="tablist"
              aria-label="Itinerary days"
            >
              <button
                className={`day-pill ${
                  selectedDayId === 'overview' ? 'selected' : ''
                }`}
                onClick={() => setSelectedDayId('overview')}
              >
                <span className="dp-top">Trip Brief</span>
                <span className="dp-sub">Overview</span>
              </button>
              {(activeItinerary.days || []).map((day) => (
                <button
                  key={day.id}
                  className={`day-pill ${
                    selectedDayId === day.id ||
                    (!currentDay &&
                      selectedDayId !== 'overview' &&
                      day.dayNumber === 1)
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedDayId(day.id);
                    setFocusedStopIdx(0);
                  }}
                >
                  <span className="dp-top">{day.dateLabel}</span>
                  <span className="dp-sub">Day {day.dayNumber}</span>
                </button>
              ))}
              <button
                className="day-pill"
                onClick={handleAddNewDay}
                title="Add another day to this itinerary"
              >
                <span className="dp-top">Customize</span>
                <span className="dp-sub">+ Add Day</span>
              </button>
            </div>

            {/* OVERVIEW VIEW */}
            {selectedDayId === 'overview' && (
              <div className="overview-section">
                <div className="overview-card">
                  <span className="day-kicker">Concierge Briefing</span>
                  <h3>Your Week at a Glance</h3>
                  <p
                    style={{
                      margin: '0 0 12px',
                      fontSize: '0.88rem',
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    {activeItinerary.summary}
                  </p>

                  {activeItinerary.baseHotel && (
                    <div
                      className="atlas-card"
                      style={{
                        background: 'var(--bg-ivory)',
                        boxShadow: 'none',
                      }}
                    >
                      <img
                        src={activeItinerary.baseHotel.image}
                        alt={activeItinerary.baseHotel.name}
                      />
                      <div className="atlas-body">
                        <div className="day-kicker">Home Base Hotel</div>
                        <strong style={{ fontSize: '1rem', display: 'block' }}>
                          {activeItinerary.baseHotel.name}
                        </strong>
                        <p
                          style={{
                            margin: '3px 0 6px',
                            fontSize: '0.78rem',
                            color: 'var(--ink-secondary)',
                          }}
                        >
                          {activeItinerary.baseHotel.address}
                        </p>
                        <div className="card-quick-links">
                          {getTripAdvisorLink(
                            activeItinerary.baseHotel.links
                          ) && (
                            <a
                              href={getTripAdvisorLink(
                                activeItinerary.baseHotel.links
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tiny-ext-link ta"
                            >
                              TripAdvisor <ExternalLink size={12} />
                            </a>
                          )}
                          {activeItinerary.baseHotel.coordinates && (
                            <a
                              href={`https://maps.apple.com/?q=${encodeURIComponent(
                                activeItinerary.baseHotel.name
                              )}&ll=${
                                activeItinerary.baseHotel.coordinates.lat
                              },${activeItinerary.baseHotel.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tiny-ext-link"
                            >
                              Apple Maps <Navigation size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Outstanding Reservations Checklist */}
                {Array.isArray(activeItinerary.pendingReservations) &&
                  activeItinerary.pendingReservations.length > 0 && (
                    <div className="overview-card">
                      <span className="day-kicker">Priority Action Items</span>
                      <h3>Reservations to Confirm</h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.8rem',
                          color: 'var(--ink-secondary)',
                        }}
                      >
                        Tap the circle once booked to check it off on your iPhone.
                      </p>
                      <div className="reservations-stack">
                        {activeItinerary.pendingReservations.map((res) => {
                          const isBooked = Boolean(bookedRes[res.id]);
                          return (
                            <div className="res-row" key={res.id}>
                              <div className="res-row-left">
                                <button
                                  className="res-check-btn"
                                  onClick={() => toggleResBooked(res.id)}
                                  aria-label={`Mark ${res.title} booked`}
                                >
                                  {isBooked ? (
                                    <CheckCircle2 size={20} color="#15803d" />
                                  ) : (
                                    <Circle size={20} />
                                  )}
                                </button>
                                <div>
                                  <div className="res-day">{res.day}</div>
                                  <div
                                    className={`res-title ${
                                      isBooked ? 'booked' : ''
                                    }`}
                                  >
                                    {res.title}
                                  </div>
                                  <div className="res-note">{res.note}</div>
                                </div>
                              </div>
                              {res.url && (
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="res-book-link"
                                >
                                  Book <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {/* Jump to Any Day */}
                <div className="overview-card">
                  <span className="day-kicker">Daily Chapters</span>
                  <h3>Select a Day to Begin</h3>
                  <div className="reservations-stack">
                    {(activeItinerary.days || []).map((d) => (
                      <div
                        key={d.id}
                        className="res-row"
                        style={{ cursor: 'pointer', alignItems: 'center' }}
                        onClick={() => {
                          setSelectedDayId(d.id);
                          setFocusedStopIdx(0);
                        }}
                      >
                        <div>
                          <div className="res-day">{d.fullDate}</div>
                          <div className="res-title">{d.title}</div>
                          {d.shoppingSummary && (
                            <div className="res-note">
                              🛍️ {d.shoppingSummary}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={18} color="var(--ink-muted)" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DAILY SCHEDULE & LIVE STEP-THROUGH VIEW */}
            {currentDay && (
              <>
                <div className="day-summary-banner">
                  <div className="day-kicker">{currentDay.fullDate}</div>
                  <h2>{currentDay.title}</h2>
                  <p className="day-theme-text">{currentDay.theme}</p>
                  <div className="day-meta-chips">
                    {currentDay.shoppingSummary && (
                      <span className="info-chip">
                        <ShoppingBag size={13} color="var(--gold-accent)" />
                        {currentDay.shoppingSummary}
                      </span>
                    )}
                    {currentDay.weatherTip && (
                      <span className="info-chip">
                        <Sparkles size={13} color="var(--racing-green)" />
                        {currentDay.weatherTip}
                      </span>
                    )}
                  </div>

                  {/* ON-THE-FLY ITINERARY EDITING TOOLBAR */}
                  <div className="edit-toolbar-row">
                    <button
                      type="button"
                      className="edit-action-chip primary"
                      onClick={() =>
                        setEditorState({
                          open: true,
                          mode: isOnline ? 'add' : 'manual',
                          stopToEdit: null,
                        })
                      }
                    >
                      <Plus size={14} /> Add Stop
                    </button>
                    <button
                      type="button"
                      className="edit-action-chip hydrogen"
                      onClick={() =>
                        setEditorState({
                          open: true,
                          mode: 'ai_modify',
                          stopToEdit: null,
                        })
                      }
                    >
                      <Sparkles size={14} /> Modify with Hydrogen
                    </button>
                    <button
                      type="button"
                      className={`edit-action-chip ${editDayMode ? 'active' : ''}`}
                      onClick={() => setEditDayMode((v) => !v)}
                    >
                      <Pencil size={13} />{' '}
                      {editDayMode ? 'Done Editing' : 'Reorder / Remove'}
                    </button>
                    {isBuiltinModified && (
                      <button
                        type="button"
                        className="edit-action-chip subtle"
                        onClick={handleResetBuiltinItinerary}
                        title="Restore original schedule"
                      >
                        <RotateCcw size={13} /> Reset Default
                      </button>
                    )}
                  </div>

                  {/* Alternate Day Track Toggle */}
                  {currentDay.alternateTrack && (
                    <div className="track-switcher-box">
                      <div className="track-switcher-label">
                        <Sparkles size={14} /> Choose Your Pacing Track for{' '}
                        {currentDay.dateLabel}:
                      </div>
                      <div className="track-toggle-buttons">
                        <button
                          className={`track-btn ${
                            !altTrackByDay[currentDay.id] ? 'active' : ''
                          }`}
                          onClick={() => {
                            setAltTrackByDay((p) => ({
                              ...p,
                              [currentDay.id]: false,
                            }));
                            setFocusedStopIdx(0);
                          }}
                        >
                          Option A: Standard Schedule ({currentDay.stops.length}{' '}
                          stops)
                        </button>
                        <button
                          className={`track-btn ${
                            altTrackByDay[currentDay.id] ? 'active' : ''
                          }`}
                          onClick={() => {
                            setAltTrackByDay((p) => ({
                              ...p,
                              [currentDay.id]: true,
                            }));
                            setFocusedStopIdx(0);
                          }}
                        >
                          Option B: {currentDay.alternateTrack.label}
                        </button>
                      </div>
                      {altTrackByDay[currentDay.id] && (
                        <p className="track-desc-note">
                          {currentDay.alternateTrack.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Live Step-Through City Navigator */}
                {activeStopsForDay.length > 0 && (
                  <div className="companion-stepper">
                    <div className="stepper-info">
                      <div className="stepper-kicker">
                        Move Through {activeItinerary.city} · Stop{' '}
                        {Math.min(focusedStopIdx + 1, activeStopsForDay.length)}{' '}
                        of {activeStopsForDay.length}
                      </div>
                      <div className="stepper-current">
                        {activeStopsForDay[focusedStopIdx]?.title}
                      </div>
                    </div>
                    <div className="stepper-controls">
                      <button
                        className="stepper-btn"
                        disabled={focusedStopIdx <= 0}
                        onClick={() => jumpToStop(focusedStopIdx - 1)}
                        aria-label="Previous stop"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="stepper-btn gold"
                        onClick={() =>
                          setActiveDetailStop(
                            activeStopsForDay[focusedStopIdx]
                          )
                        }
                      >
                        Guide
                      </button>
                      <button
                        className="stepper-btn"
                        disabled={
                          focusedStopIdx >= activeStopsForDay.length - 1
                        }
                        onClick={() => jumpToStop(focusedStopIdx + 1)}
                        aria-label="Next stop"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Chronological Stops List */}
                <div className="stops-timeline">
                  {activeStopsForDay.map((stop, idx) => {
                    const isFocused = idx === focusedStopIdx;
                    const isDone = Boolean(completedStops[stop.id]);
                    const taUrl = getTripAdvisorLink(stop.links);

                    return (
                      <article
                        key={stop.id}
                        ref={(el) => {
                          stopCardRefs.current[stop.id] = el;
                        }}
                        className={`stop-card ${
                          isFocused ? 'focused-stop' : ''
                        } ${isDone ? 'completed-stop' : ''}`}
                        onClick={() => {
                          setFocusedStopIdx(idx);
                          setActiveDetailStop(stop);
                        }}
                      >
                        {/* Inline Reorder / Edit / Delete Strip when editDayMode is toggled on */}
                        {editDayMode && (
                          <div
                            className="inline-stop-edit-bar"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="inline-edit-label">
                              Stop #{idx + 1}
                            </span>
                            <div className="inline-edit-btns">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveStop(idx, -1)}
                                aria-label="Move stop earlier"
                              >
                                <ArrowUp size={14} /> Up
                              </button>
                              <button
                                type="button"
                                disabled={idx === activeStopsForDay.length - 1}
                                onClick={() => handleMoveStop(idx, 1)}
                                aria-label="Move stop later"
                              >
                                <ArrowDown size={14} /> Down
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditorState({
                                    open: true,
                                    mode: 'edit_stop',
                                    stopToEdit: stop,
                                  })
                                }
                              >
                                <Pencil size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                className="danger"
                                onClick={() => handleRemoveStop(stop.id)}
                              >
                                <Trash2 size={13} /> Remove
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="stop-card-top">
                          <div className="stop-thumb-wrap">
                            <img
                              src={stop.image}
                              alt={stop.title}
                              loading="lazy"
                            />
                            <span className="stop-order-badge">
                              {isDone ? '✓' : idx + 1}
                            </span>
                          </div>
                          <div className="stop-card-main">
                            <div className="stop-time-row">
                              <span className="stop-time-text">{stop.time}</span>
                              <span
                                className={`mini-status-pill ${
                                  stop.bookingStatus || 'included'
                                }`}
                              >
                                {stop.bookingStatus === 'action_needed'
                                  ? 'Book Tickets'
                                  : stop.bookingStatus === 'confirmed'
                                  ? 'Confirmed'
                                  : stop.bookingStatus === 'proposed'
                                  ? 'Proposed'
                                  : stop.category}
                              </span>
                            </div>
                            <h3 className="stop-card-title">{stop.title}</h3>
                            {stop.neighborhood && (
                              <p className="stop-card-neighborhood">
                                <MapPin size={12} /> {stop.neighborhood}
                              </p>
                            )}
                            <p className="stop-card-excerpt">{stop.summary}</p>
                          </div>
                        </div>

                        <div
                          className="stop-card-footer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="rich-badges-group">
                            {stop.museumTour && (
                              <button
                                className="card-action-pill audio"
                                onClick={() =>
                                  startMuseumTour(stop, null, true)
                                }
                              >
                                <Headphones size={13} /> Audio Tour (
                                {stop.museumTour.highlights?.length || 0} stops)
                              </button>
                            )}
                            {stop.diningGuide && (
                              <button
                                className="card-action-pill dishes"
                                onClick={() => setActiveDetailStop(stop)}
                              >
                                <Utensils size={13} />{' '}
                                {stop.diningGuide.featuredDishes?.length || 0}{' '}
                                Featured Dishes
                              </button>
                            )}
                            {stop.shoppingGuide && (
                              <button
                                className="card-action-pill shops"
                                onClick={() => setActiveDetailStop(stop)}
                              >
                                <ShoppingBag size={13} /> Boutique Guide
                              </button>
                            )}
                          </div>

                          <div className="card-quick-links">
                            {taUrl && (
                              <a
                                href={taUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tiny-ext-link ta"
                              >
                                TripAdvisor <ExternalLink size={11} />
                              </a>
                            )}
                            {stop.coordinates?.lat && (
                              <a
                                href={`https://maps.apple.com/?q=${encodeURIComponent(
                                  stop.title
                                )}&ll=${stop.coordinates.lat},${
                                  stop.coordinates.lng
                                }&dirflg=w`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tiny-ext-link"
                              >
                                Directions <Navigation size={11} />
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </>
      )}

      {/* TAB 2: MUSEUM & SIGHTSEEING AUDIOBOOK TOURS HUB */}
      {activeTab === 'tours' && (
        <main className="page-body">
          <div className="day-summary-banner">
            <div className="day-kicker">In-App Curatorial Audiobooks</div>
            <h2>Museum & Sightseeing Audio Tours ({allMuseumStops.length})</h2>
            <p className="day-theme-text">
              Every tour includes exact room/floor locations, photographs of each highlight, read-along scripts, and offline-cached audio narration with iPhone Lock Screen controls.
            </p>
          </div>

          <div className="tours-grid">
            {allMuseumStops.map((stop) => {
              const tour = stop.museumTour;
              return (
                <div className="tour-hub-card" key={tour.tourId || stop.id}>
                  <div className="tour-hub-banner">
                    <img src={stop.image} alt={stop.title} loading="lazy" />
                    <div className="tour-hub-overlay">
                      <span>
                        {stop._dayLabel} · {stop.time}
                      </span>
                      <h3>{stop.title}</h3>
                    </div>
                  </div>
                  <div className="tour-hub-body">
                    <p>{tour.routeStrategy || stop.summary}</p>
                    <div className="tour-hub-chips">
                      {(tour.highlights || []).map((hl, i) => (
                        <span
                          key={hl.id || i}
                          className="tour-hl-chip"
                          style={{ cursor: 'pointer' }}
                          onClick={() => startMuseumTour(stop, hl.id, true)}
                        >
                          ▶ {i + 1}. {hl.title}
                        </span>
                      ))}
                    </div>
                    <div className="tour-hub-actions">
                      <button
                        className="btn-gold-solid"
                        style={{ flex: 1 }}
                        onClick={() => startMuseumTour(stop, null, true)}
                      >
                        <Play size={16} /> Play Full Audiobook
                      </button>
                      <button
                        className="visited-toggle-btn"
                        style={{ flex: 1 }}
                        onClick={() => openMuseumGuideOnly(stop)}
                      >
                        Room Map & Photos
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* TAB 3: RESTAURANTS & INTERNET-FEATURED DISHES */}
      {activeTab === 'dining' && (
        <main className="page-body">
          <div className="day-summary-banner">
            <div className="day-kicker">Culinary & Critic Highlights</div>
            <h2>Restaurants & Internet-Featured Foods ({allDiningStops.length})</h2>
            <p className="day-theme-text">
              Signature dishes celebrated across TripAdvisor, the Michelin Guide, food critics, and social media — with one-tap review and reservation links.
            </p>
          </div>

          <div className="dining-hub-stack">
            {allDiningStops.map((stop) => {
              const dg = stop.diningGuide;
              return (
                <div className="dining-hub-card" key={stop.id}>
                  <div className="dining-hub-top">
                    <img src={stop.image} alt={stop.title} loading="lazy" />
                    <div>
                      <span className="day-kicker">
                        {stop._dayLabel} · {stop.time}
                      </span>
                      <h3>{stop.title}</h3>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--ink-secondary)',
                        }}
                      >
                        {dg.cuisine} {dg.priceRange ? `· ${dg.priceRange}` : ''}
                      </div>
                    </div>
                  </div>

                  {Array.isArray(dg.accolades) && dg.accolades.length > 0 && (
                    <div className="accolades-wrap">
                      {dg.accolades.map((acc, i) => (
                        <span key={i} className="accolade-badge">
                          <Award size={12} /> {acc}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="dishes-grid" style={{ marginBottom: 12 }}>
                    {(dg.featuredDishes || []).map((dish, idx) => (
                      <div className="dish-card" key={idx}>
                        <div className="dish-card-top">
                          <h4>{dish.name}</h4>
                          {dish.badge && (
                            <span className="dish-badge">{dish.badge}</span>
                          )}
                        </div>
                        <p>{dish.description}</p>
                      </div>
                    ))}
                  </div>

                  {Array.isArray(dg.nearbyOptions) &&
                    dg.nearbyOptions.length > 0 && (
                      <div
                        className="nearby-picks-block"
                        style={{ marginBottom: 12 }}
                      >
                        <h4>Curated Walkable Restaurant Options</h4>
                        <div className="nearby-list">
                          {dg.nearbyOptions.map((opt, idx) => (
                            <div key={idx} className="nearby-card">
                              <div className="nearby-card-head">
                                <strong>{opt.name}</strong>
                                <span>{opt.walkTime}</span>
                              </div>
                              <p className="nearby-famous">{opt.famousFor}</p>
                              <div className="nearby-links">
                                {opt.tripadvisorUrl && (
                                  <a
                                    href={opt.tripadvisorUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    TripAdvisor ↗
                                  </a>
                                )}
                                {opt.googleMapsUrl && (
                                  <a
                                    href={opt.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Google Maps ↗
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div
                    className="external-links-grid"
                    style={{ marginBottom: 0 }}
                  >
                    {(stop.links || []).map((lnk, idx) => (
                      <a
                        key={idx}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ext-btn ${lnk.platform || ''}`}
                      >
                        <span>{lnk.label}</span>
                        <ExternalLink size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* TAB 4: INTERACTIVE ROUTE MAP & LUXURY SHOPPING ATLAS */}
      {activeTab === 'map' && (
        <main className="page-body">
          <div className="day-summary-banner">
            <div className="day-kicker">Interactive City & Boutique Atlas</div>
            <h2>Routes, Pins & Shopping Guide</h2>
            <p className="day-theme-text">
              Tap any day to trace its route from{' '}
              {activeItinerary.baseHotel?.name || 'your hotel'}, or view the 7-stop luxury shopping walk.
            </p>
          </div>

          <div className="map-filter-bar">
            {(activeItinerary.days || []).map((d, idx) => (
              <button
                key={d.id}
                className={`day-pill ${
                  !showShoppingWalkOnMap && mapDayIndex === idx ? 'selected' : ''
                }`}
                onClick={() => {
                  setShowShoppingWalkOnMap(false);
                  setMapDayIndex(idx);
                }}
              >
                <span className="dp-top">{d.dateLabel}</span>
                <span className="dp-sub">{d.stops?.length || 0} stops</span>
              </button>
            ))}
            {shoppingWalk && (
              <button
                className={`day-pill ${
                  showShoppingWalkOnMap ? 'selected' : ''
                }`}
                onClick={() => setShowShoppingWalkOnMap(true)}
              >
                <span className="dp-top">Mayfair Route</span>
                <span className="dp-sub">7-Stop Shopping Walk</span>
              </button>
            )}
          </div>

          <RouteMapView
            stops={activeItinerary.days?.[mapDayIndex]?.stops || []}
            baseHotel={activeItinerary.baseHotel}
            shoppingWalk={shoppingWalk}
            showShoppingWalk={showShoppingWalkOnMap}
            onSelectStop={(st) => setActiveDetailStop(st)}
            height={360}
          />

          {shoppingWalk && (
            <div className="overview-card">
              <span className="day-kicker">Practical Browsing Route</span>
              <h3>Best 7-Stop Shopping Walk from The Langham</h3>
              <p
                style={{
                  margin: '0 0 10px',
                  fontSize: '0.82rem',
                  color: 'var(--ink-secondary)',
                }}
              >
                Designed to spread across Wednesday, Saturday, and Monday — or stroll at leisure anytime.
              </p>
              <div className="reservations-stack">
                {shoppingWalk.map((pt) => (
                  <div className="res-row" key={pt.step}>
                    <div>
                      <div className="res-day">
                        Stop {pt.step} · {pt.walkMinutes}
                      </div>
                      <div className="res-title">{pt.name}</div>
                      <div className="res-note">{pt.highlight}</div>
                    </div>
                    <a
                      href={`https://maps.apple.com/?q=${encodeURIComponent(
                        pt.name
                      )}&ll=${pt.lat},${pt.lng}&dirflg=w`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="res-book-link"
                    >
                      Map <Navigation size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shoppingDistricts.length > 0 && (
            <div className="overview-card">
              <span className="day-kicker">Ranked Highest-End to High-Street</span>
              <h3>{activeItinerary.city} Shopping Guide</h3>
              <div className="shopping-atlas-grid">
                {shoppingDistricts.map((dist, idx) => {
                  const ta = getTripAdvisorLink(dist.links);
                  return (
                    <div className="atlas-card" key={idx}>
                      {dist.image && (
                        <img src={dist.image} alt={dist.area} loading="lazy" />
                      )}
                      <div className="atlas-body">
                        <div className="atlas-top-row">
                          <strong>{dist.area}</strong>
                          <span className="price-tier-badge">
                            {dist.priceLevel}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: '3px 0',
                            fontSize: '0.8rem',
                            color: 'var(--ink-secondary)',
                          }}
                        >
                          {dist.bestFor}
                        </p>
                        <div
                          style={{
                            fontSize: '0.73rem',
                            color: 'var(--ink-muted)',
                            marginBottom: 6,
                          }}
                        >
                          🚶 {dist.walkFromLangham}
                        </div>
                        <div className="card-quick-links">
                          {ta && (
                            <a
                              href={ta}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tiny-ext-link ta"
                            >
                              TripAdvisor <ExternalLink size={11} />
                            </a>
                          )}
                          {dist.coordinates && (
                            <a
                              href={`https://maps.apple.com/?q=${encodeURIComponent(
                                dist.area
                              )}&ll=${dist.coordinates.lat},${
                                dist.coordinates.lng
                              }&dirflg=w`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tiny-ext-link"
                            >
                              Apple Maps <Navigation size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      )}

      {/* TAB 5: MULTI-DESTINATION LIBRARY, CLOUD BACKUP, OFFLINE & iOS SETTINGS */}
      {activeTab === 'trips' && (
        <main className="page-body">
          <div className="day-summary-banner">
            <div className="day-kicker">Destinations, Offline Vault & Google Drive</div>
            <h2>Manage Trips & Cloud Backup</h2>
            <p className="day-theme-text">
              Create new city itineraries on Gemini 4 Hydrogen, cache trips for 100% offline travel, and back up your itineraries to Google Drive.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                marginTop: 10,
              }}
            >
              <button
                className="btn-gold-solid"
                onClick={() => setStudioOpen(true)}
              >
                <Plus size={16} /> Create / Paste New Itinerary
              </button>
              <button
                className="visited-toggle-btn"
                onClick={() => setCloudModalOpen(true)}
              >
                <Cloud size={16} />{' '}
                {authState.authenticated
                  ? `Drive Synced (${authState.user?.email || 'Connected'})`
                  : 'Google Drive Backup'}
              </button>
              <button
                className="visited-toggle-btn"
                onClick={() => setOfflineModalOpen(true)}
              >
                <WifiOff size={16} /> Offline Vault
              </button>
              <button
                className="visited-toggle-btn"
                onClick={() => setInstallOpen(true)}
              >
                <Smartphone size={16} /> Install on iOS
              </button>
              <button
                className="visited-toggle-btn"
                onClick={handleExportJson}
              >
                <Download size={16} /> Export JSON
              </button>
            </div>
          </div>

          <div className="trips-list">
            {allItineraries.map((itin) => {
              const isSelected = itin.id === activeItinerary.id;
              return (
                <div
                  key={itin.id}
                  className={`trip-choice-card ${
                    isSelected ? 'active-trip' : ''
                  }`}
                  onClick={() => {
                    closePlayer();
                    setActiveItinId(itin.id);
                    setSelectedDayId(itin.days?.[0]?.id || 'overview');
                    setActiveTab('itinerary');
                  }}
                >
                  <div className="trip-choice-img">
                    <img src={itin.heroImage} alt={itin.title} loading="lazy" />
                  </div>
                  <div className="trip-choice-body">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4,
                        gap: 6,
                      }}
                    >
                      <span className="day-kicker">
                        {itin.city}, {itin.country} · {itin.dates}
                      </span>
                      <div style={{ display: 'flex', gap: 5 }}>
                        {modifiedBuiltins[itin.id] && (
                          <span className="mini-status-pill proposed">
                            Customized
                          </span>
                        )}
                        {isSelected && (
                          <span className="mini-status-pill confirmed">
                            Active Trip
                          </span>
                        )}
                      </div>
                    </div>
                    <h3>{itin.title}</h3>
                    <p>{itin.summary}</p>
                    {itin.isCustom && (
                      <button
                        className="visited-toggle-btn"
                        style={{ marginTop: 10, color: '#991b1b' }}
                        onClick={(e) =>
                          handleDeleteCustomItinerary(itin.id, e)
                        }
                      >
                        <Trash2 size={14} /> Remove Custom Itinerary
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* Persistent Sticky Audio Mini-Player */}
      <StickyMiniPlayer />

      {/* Bottom iOS Safe-Area Tab Bar */}
      <nav className="bottom-tab-bar" aria-label="Primary sections">
        <div className="bottom-tab-inner">
          <button
            className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            <Calendar size={20} />
            <span>Itinerary</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'tours' ? 'active' : ''}`}
            onClick={() => setActiveTab('tours')}
          >
            <Headphones size={20} />
            <span>Audio Tours</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'dining' ? 'active' : ''}`}
            onClick={() => setActiveTab('dining')}
          >
            <Utensils size={20} />
            <span>Dining</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapIcon size={20} />
            <span>Map & Shops</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'trips' ? 'active' : ''}`}
            onClick={() => setActiveTab('trips')}
          >
            <Globe2 size={20} />
            <span>Destinations</span>
          </button>
        </div>
      </nav>

      {/* Modals & Drawers */}
      <StopDetailSheet
        stop={activeDetailStop}
        onClose={() => setActiveDetailStop(null)}
        isCompleted={Boolean(
          activeDetailStop && completedStops[activeDetailStop.id]
        )}
        onToggleCompleted={toggleStopCompleted}
        noteText={(activeDetailStop && stopNotes[activeDetailStop.id]) || ''}
        onSaveNote={saveStopNote}
        onEditStop={(st) =>
          setEditorState({ open: true, mode: 'edit_stop', stopToEdit: st })
        }
        onDeleteStop={(stId) => handleRemoveStop(stId)}
      />

      <MuseumTourModal />

      <ItineraryStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        onAddItinerary={handleAddItinerary}
      />

      <OnTheFlyEditorModal
        isOpen={editorState.open}
        initialMode={editorState.mode}
        stopToEdit={editorState.stopToEdit}
        day={currentDay}
        city={activeItinerary.city}
        country={activeItinerary.country}
        heroImage={activeItinerary.heroImage}
        isOnline={isOnline}
        onClose={() =>
          setEditorState({ open: false, mode: 'add', stopToEdit: null })
        }
        onInsertStop={handleInsertStop}
        onUpdateStop={handleUpdateStop}
        onReplaceDay={handleReplaceDayFromAi}
      />

      <OfflineVaultModal
        isOpen={offlineModalOpen}
        onClose={() => setOfflineModalOpen(false)}
        itinerary={activeItinerary}
        offlineState={offlineState}
        isOnline={isOnline}
        onSyncCurrent={() => runOfflineSyncForActive(true)}
        onSyncAll={handleOfflineAllTrips}
        syncingAll={syncingAllOffline}
      />

      <CloudSyncModal
        isOpen={cloudModalOpen}
        onClose={() => setCloudModalOpen(false)}
        authState={authState}
        driveStatus={driveStatus}
        onRefreshAuth={refreshAuthSession}
        onBackupNow={() => performDriveBackup(false)}
        onRestoreNow={handleRestoreFromDrive}
        onLogout={handleLogoutGoogle}
      />

      <InstallIOSModal
        isOpen={installOpen}
        onClose={() => setInstallOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AudioPlayerProvider>
      <MeridianShell />
    </AudioPlayerProvider>
  );
}
