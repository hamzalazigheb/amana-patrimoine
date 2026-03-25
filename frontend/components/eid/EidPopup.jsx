'use client';

import { useState, useEffect } from 'react';
import { eidConfig } from '../../lib/eidConfig';

export default function EidPopup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (eidConfig.enabled) setVisible(true);
    }, []);

    if (!eidConfig.enabled || !visible) return null;

    return (
        <div className="eid-popup-overlay" role="dialog" aria-modal="true" aria-label="Eid Mubarak">
            <div className="eid-popup">
                {/* Decorative stars */}
                <span className="eid-star" style={{ top: '12%', left: '8%', fontSize: '1.1rem' }}>✦</span>
                <span className="eid-star" style={{ top: '18%', right: '10%', fontSize: '0.8rem', animationDelay: '0.4s' }}>✦</span>
                <span className="eid-star" style={{ bottom: '20%', left: '12%', fontSize: '0.7rem', animationDelay: '0.8s' }}>✦</span>
                <span className="eid-star" style={{ bottom: '15%', right: '8%', fontSize: '1rem', animationDelay: '1.2s' }}>✦</span>

                {/* Crescent SVG */}
                <div className="eid-popup-crescent" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c4.3 0 8.24-1.52 11.32-4.02A14 14 0 0 1 24 20a14 14 0 0 1 8.02-12.6A17.9 17.9 0 0 0 24 6z" fill="#D4AF37"/>
                    </svg>
                </div>

                {/* Logo */}
                <div className="eid-popup-logo">
                    <img src="/1amanap-patrimoine.svg" alt="Amana Patrimoine" style={{ height: '36px', width: 'auto' }} />
                </div>

                {/* New version badge */}
                <div className="eid-popup-new-version">
                    <span className="eid-popup-new-version-badge">{eidConfig.newVersionLabel}</span>
                    <span className="eid-popup-new-version-text">{eidConfig.newVersionText}</span>
                </div>

                {/* Gold separator */}
                <div className="eid-popup-separator" aria-hidden="true" />

                {/* Greeting */}
                <h2 className="eid-popup-title">{eidConfig.greeting}</h2>
                <p className="eid-popup-message">{eidConfig.message}</p>

                {/* Dismiss button */}
                <button className="eid-popup-btn" onClick={() => setVisible(false)}>
                    {eidConfig.buttonText}
                </button>
            </div>
        </div>
    );
}
