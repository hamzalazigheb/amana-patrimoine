'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'amana_consent_v1';

function getStoredConsent() {
    try {
        const raw = localStorage.getItem(CONSENT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveConsent(prefs) {
    const payload = { ...prefs, timestamp: new Date().toISOString(), version: 1 };
    try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch {}
    return payload;
}

function applyGoogleConsent(prefs) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
    });
}

const CATEGORIES = [
    {
        id: 'necessary',
        label: 'Cookies nécessaires',
        description: 'Indispensables au fonctionnement du site (session, sécurité, préférences). Ne peuvent pas être désactivés.',
        locked: true,
    },
    {
        id: 'analytics',
        label: 'Cookies analytiques',
        description: 'Nous aident à comprendre comment vous utilisez le site (pages visitées, durée de session). Données anonymisées via Google Analytics / GTM.',
        locked: false,
    },
    {
        id: 'marketing',
        label: 'Cookies marketing',
        description: 'Permettent d\'afficher des publicités personnalisées et de mesurer l\'efficacité de nos campagnes (Google Ads, retargeting).',
        locked: false,
    },
];

export default function ConsentManager() {
    const [show, setShow] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

    useEffect(() => {
        const stored = getStoredConsent();
        if (stored) {
            setPrefs({ analytics: stored.analytics, marketing: stored.marketing });
            applyGoogleConsent(stored);
        } else {
            setShow(true);
        }

        window.__openCookiePrefs = () => {
            const current = getStoredConsent();
            if (current) setPrefs({ analytics: current.analytics, marketing: current.marketing });
            setShowPanel(true);
            setShow(true);
        };
        return () => { delete window.__openCookiePrefs; };
    }, []);

    function acceptAll() {
        const p = { analytics: true, marketing: true };
        saveConsent(p);
        applyGoogleConsent(p);
        setPrefs(p);
        setShow(false);
        setShowPanel(false);
    }

    function refuseAll() {
        const p = { analytics: false, marketing: false };
        saveConsent(p);
        applyGoogleConsent(p);
        setPrefs(p);
        setShow(false);
        setShowPanel(false);
    }

    function savePrefs() {
        saveConsent(prefs);
        applyGoogleConsent(prefs);
        setShow(false);
        setShowPanel(false);
    }

    function togglePref(id) {
        setPrefs(prev => ({ ...prev, [id]: !prev[id] }));
    }

    if (!show) return null;

    return (
        <>
            {/* Backdrop when panel is open */}
            {showPanel && (
                <div className="cmp-backdrop" onClick={() => setShowPanel(false)} aria-hidden="true" />
            )}

            <div className={`cmp-wrapper${showPanel ? ' cmp-expanded' : ''}`} role="dialog" aria-modal="true" aria-label="Gestion des cookies">

                {/* ── Preferences panel (slide-up) ── */}
                {showPanel && (
                    <div className="cmp-panel">
                        <div className="cmp-panel-header">
                            <div>
                                <h2 className="cmp-panel-title">Personnaliser mes préférences</h2>
                                <p className="cmp-panel-subtitle">
                                    Choisissez les cookies que vous autorisez. Consultez notre{' '}
                                    <Link href="/politique-confidentialite" className="cmp-link">politique de confidentialité</Link>.
                                </p>
                            </div>
                            <button className="cmp-close" onClick={() => setShowPanel(false)} aria-label="Fermer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>

                        <div className="cmp-categories">
                            {CATEGORIES.map(cat => (
                                <div key={cat.id} className="cmp-category">
                                    <div className="cmp-category-top">
                                        <span className="cmp-category-label">{cat.label}</span>
                                        {cat.locked ? (
                                            <span className="cmp-toggle-locked" aria-label="Toujours actif">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                                Toujours actif
                                            </span>
                                        ) : (
                                            <button
                                                role="switch"
                                                aria-checked={prefs[cat.id]}
                                                className={`cmp-toggle${prefs[cat.id] ? ' on' : ''}`}
                                                onClick={() => togglePref(cat.id)}
                                                aria-label={`${cat.label} : ${prefs[cat.id] ? 'activé' : 'désactivé'}`}
                                            >
                                                <span className="cmp-toggle-knob" />
                                            </button>
                                        )}
                                    </div>
                                    <p className="cmp-category-desc">{cat.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="cmp-panel-actions">
                            <button className="cmp-btn-secondary" onClick={refuseAll}>Tout refuser</button>
                            <button className="cmp-btn-secondary" onClick={savePrefs}>Enregistrer mes choix</button>
                            <button className="cmp-btn-primary" onClick={acceptAll}>Tout accepter</button>
                        </div>
                    </div>
                )}

                {/* ── Compact banner ── */}
                {!showPanel && (
                    <div className="cmp-bar">
                        <div className="cmp-bar-text">
                            <svg className="cmp-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                            <span>
                                Nous utilisons des cookies pour améliorer votre expérience et mesurer notre audience.{' '}
                                <Link href="/politique-confidentialite" className="cmp-link">En savoir plus</Link>
                            </span>
                        </div>
                        <div className="cmp-bar-actions">
                            <button className="cmp-btn-ghost" onClick={() => setShowPanel(true)}>Personnaliser</button>
                            <button className="cmp-btn-outline" onClick={refuseAll}>Refuser</button>
                            <button className="cmp-btn-primary" onClick={acceptAll}>Tout accepter</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
