'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { eidConfig } from '../../lib/eidConfig';

export default function EidPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!eidConfig.enabled) return;
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="eid-popup-overlay" onClick={close} role="dialog" aria-modal="true" aria-label="Eid Mubarak">
      <div className="eid-popup" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="eid-popup-close" onClick={close} aria-label="Fermer">×</button>

        {/* Decorative twinkling stars */}
        <div className="eid-popup-stars" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="eid-popup-star" />
          ))}
        </div>

        {/* Lantern left */}
        <div className="eid-popup-lantern eid-popup-lantern-left" aria-hidden="true">
          <svg width="30" height="60" viewBox="0 0 60 108" fill="none">
            <line x1="30" y1="0" x2="30" y2="20" stroke="#D4AF37" strokeWidth="2" />
            <path d="M22 20 L38 20 L41 28 L19 28 Z" fill="#D4AF37" opacity="0.5" />
            <ellipse cx="30" cy="60" rx="17" ry="30" fill="#D4AF37" opacity="0.07" stroke="#D4AF37" strokeWidth="1.2" />
            <line x1="30" y1="28" x2="30" y2="90" stroke="#D4AF37" strokeWidth="0.6" opacity="0.25" />
            <line x1="13" y1="60" x2="47" y2="60" stroke="#D4AF37" strokeWidth="0.6" opacity="0.2" />
            <circle cx="30" cy="60" r="5" fill="#D4AF37" opacity="0.18" />
            <path d="M24 91 L30 100 L36 91" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.35" />
          </svg>
        </div>

        {/* Lantern right */}
        <div className="eid-popup-lantern eid-popup-lantern-right" aria-hidden="true">
          <svg width="30" height="60" viewBox="0 0 60 108" fill="none">
            <line x1="30" y1="0" x2="30" y2="20" stroke="#D4AF37" strokeWidth="2" />
            <path d="M22 20 L38 20 L41 28 L19 28 Z" fill="#D4AF37" opacity="0.5" />
            <ellipse cx="30" cy="60" rx="17" ry="30" fill="#D4AF37" opacity="0.07" stroke="#D4AF37" strokeWidth="1.2" />
            <line x1="30" y1="28" x2="30" y2="90" stroke="#D4AF37" strokeWidth="0.6" opacity="0.25" />
            <line x1="13" y1="60" x2="47" y2="60" stroke="#D4AF37" strokeWidth="0.6" opacity="0.2" />
            <circle cx="30" cy="60" r="5" fill="#D4AF37" opacity="0.18" />
            <path d="M24 91 L30 100 L36 91" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.35" />
          </svg>
        </div>

        {/* Logo */}
        <div className="eid-popup-logo">
          <Image
            src="/1amanap-patrimoine.svg"
            alt="Amana Patrimoine"
            width={160}
            height={48}
            priority
          />
        </div>

        {/* Gold separator */}
        <div className="eid-popup-separator" aria-hidden="true" />

        {/* Crescent moon */}
        <div className="eid-popup-crescent" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 5C30 5 15 22 15 45s15 40 35 40c-12-8-18-22-18-40S38 13 50 5z"
              fill="#D4AF37"
            />
            <circle cx="64" cy="17" r="3" fill="#D4AF37" opacity="0.6" />
            <circle cx="74" cy="29" r="2" fill="#D4AF37" opacity="0.4" />
            <circle cx="60" cy="8" r="1.5" fill="#D4AF37" opacity="0.35" />
          </svg>
        </div>

        {/* Greeting */}
        <h2 className="eid-popup-title">{eidConfig.greeting}</h2>
        <p className="eid-popup-message">{eidConfig.message}</p>

        {/* New version badge */}
        <div className="eid-popup-new-version">
          <span className="eid-popup-new-version-badge">{eidConfig.newVersionLabel}</span>
          <span className="eid-popup-new-version-text">{eidConfig.newVersionText}</span>
        </div>

        {/* CTA button */}
        <button className="eid-popup-btn" onClick={close}>
          {eidConfig.buttonText}
        </button>

      </div>
    </div>
  );
}
