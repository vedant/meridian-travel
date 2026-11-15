import React from 'react';
import { X, Share, PlusSquare, Smartphone, CheckCircle2, Volume2, Wifi } from 'lucide-react';

export default function InstallIOSModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator?.standalone === true);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ios-install-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        <div className="studio-header">
          <div>
            <span className="eyebrow-pill gold">
              <Smartphone size={12} /> iPhone Home Screen App
            </span>
            <h2 className="editorial-h2">Install Meridian on iOS</h2>
            <p className="subtle-meta">
              Full-screen experience, Lock Screen museum audio controls & offline caching.
            </p>
          </div>
          <button className="icon-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isStandalone ? (
          <div className="installed-success-banner">
            <CheckCircle2 size={22} />
            <div>
              <strong>Installed on Home Screen</strong>
              <p>You are running Meridian in full-screen standalone iOS app mode.</p>
            </div>
          </div>
        ) : (
          <div className="ios-steps-list">
            <div className="ios-step-card">
              <div className="ios-step-num">1</div>
              <div className="ios-step-body">
                <strong>Open in Safari on iPhone</strong>
                <p>
                  Tap the <strong>Share</strong> button <Share size={15} style={{ verticalAlign: 'middle' }} /> centered at the bottom of Safari.
                </p>
              </div>
            </div>

            <div className="ios-step-card">
              <div className="ios-step-num">2</div>
              <div className="ios-step-body">
                <strong>Tap “Add to Home Screen”</strong>
                <p>
                  Scroll slightly down the Share sheet and tap{' '}
                  <strong>Add to Home Screen</strong>{' '}
                  <PlusSquare size={15} style={{ verticalAlign: 'middle' }} />.
                </p>
              </div>
            </div>

            <div className="ios-step-card">
              <div className="ios-step-num">3</div>
              <div className="ios-step-body">
                <strong>Tap “Add” in the Top-Right Corner</strong>
                <p>
                  Meridian appears on your Home Screen with its gold compass icon and opens edge-to-edge without browser bars.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="ios-perks-grid">
          <div className="ios-perk">
            <Volume2 size={16} />
            <span>
              <strong>AirPods & Lock Screen Ready:</strong> Museum audio tours keep playing with iOS Lock Screen next/pause controls.
            </span>
          </div>
          <div className="ios-perk">
            <Wifi size={16} />
            <span>
              <strong>Vault-Proof Offline Cache:</strong> Itinerary details & gallery photos stay cached even inside stone museum basements.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
