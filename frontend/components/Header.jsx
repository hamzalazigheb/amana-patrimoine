'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackCalendlyClick } from '../lib/track';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [ressourcesOpen, setRessourcesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileRessourcesOpen, setMobileRessourcesOpen] = useState(false);
    const [simulateursVisible, setSimulateursVisible] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Read from server-injected window.__FEATURES__ (set in layout.js) — no API call needed
        if (typeof window !== 'undefined' && window.__FEATURES__) {
            const val = window.__FEATURES__.simulateurs_visible;
            setSimulateursVisible(val !== false && val !== 'false');
        } else {
            // Fallback: fetch from API if window.__FEATURES__ is not available
            fetch('/api/public/features')
                .then((r) => r.ok ? r.json() : null)
                .then((data) => {
                    if (data) {
                        const val = data.simulateurs_visible;
                        setSimulateursVisible(val !== false && val !== 'false');
                    }
                })
                .catch(() => {});
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const closeMobile = () => {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileRessourcesOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-inner">
                <Link href="/" className="logo">
                    <img
                        src="/1amanap-patrimoine.svg"
                        alt="Amana Patrimoine - Cabinet de conseil en gestion de patrimoine"
                        className="logo-img logo-custom"
                        style={{ height: '120px', width: 'auto' }}
                    />
                </Link>
                <button
                    className="mobile-menu-toggle"
                    aria-label="Menu de navigation"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>

                {/* Desktop nav */}
                <nav className="nav" aria-label="Navigation principale">
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <button className="nav-link" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }} aria-expanded={servicesOpen} aria-haspopup="true" aria-controls="services-dropdown">
                            Nos Solutions
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }} aria-hidden="true">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {servicesOpen && (
                            <div className="nav-dropdown-menu mega-menu" id="services-dropdown">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Planification</h4>
                                        <Link href="/retraite" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Préparer ma retraite</span>
                                            <span className="mega-menu-item-desc">Sécurisez votre avenir financier</span>
                                        </Link>
                                        <Link href="/strategie" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Stratégie patrimoniale</span>
                                            <span className="mega-menu-item-desc">Optimisez votre patrimoine</span>
                                        </Link>
                                        <Link href="/succession" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Préparer ma succession</span>
                                            <span className="mega-menu-item-desc">Transmettez en toute sérénité</span>
                                        </Link>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Investissement</h4>
                                        <Link href="/immobilier" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Investir dans l&apos;immobilier</span>
                                            <span className="mega-menu-item-desc">Patrimoine immobilier durable</span>
                                        </Link>
                                        <Link href="/investissement" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Investir son argent</span>
                                            <span className="mega-menu-item-desc">Croissance et diversification</span>
                                        </Link>
                                        <Link href="/enfants" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Avenir des enfants</span>
                                            <span className="mega-menu-item-desc">Préparez leur avenir</span>
                                        </Link>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Optimisation</h4>
                                        <Link href="/reduire-impots" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Optimiser ma fiscalité en tant que particulier</span>
                                            <span className="mega-menu-item-desc">Optimisation fiscale légale</span>
                                        </Link>
                                        <Link href="/reduire-impots-entreprise" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Optimiser ma fiscalité d&apos;entreprise</span>
                                            <span className="mega-menu-item-desc">Optimisation fiscale légale</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setRessourcesOpen(true)}
                        onMouseLeave={() => setRessourcesOpen(false)}
                    >
                        <button className="nav-link" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }} aria-expanded={ressourcesOpen} aria-haspopup="true" aria-controls="ressources-dropdown">
                            Ressources
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }} aria-hidden="true">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {ressourcesOpen && (
                            <div className="nav-dropdown-menu" id="ressources-dropdown" style={{ minWidth: '260px' }}>
                                <Link href="/finance-islamique" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">Finance islamique</span>
                                    <span className="mega-menu-item-desc">Principes et solutions</span>
                                </Link>
                                <Link href="/scpi-halal" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">SCPI Halal</span>
                                    <span className="mega-menu-item-desc">Immobilier sans riba</span>
                                </Link>
                                <Link href="/assurance-vie-islamique" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">Assurance-vie islamique</span>
                                    <span className="mega-menu-item-desc">Épargner et transmettre</span>
                                </Link>
                                <Link href="/zakat" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">Zakat</span>
                                    <span className="mega-menu-item-desc">Guide et calcul</span>
                                </Link>
                                {simulateursVisible && (
                                    <Link href="/simulateurs" className="nav-dropdown-item">
                                        <span className="mega-menu-item-title">Simulateur Zakat</span>
                                        <span className="mega-menu-item-desc">Calculez en ligne</span>
                                    </Link>
                                )}
                                <Link href="/lexique" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">Lexique</span>
                                    <span className="mega-menu-item-desc">Termes et définitions</span>
                                </Link>
                                <Link href="/blog" className="nav-dropdown-item">
                                    <span className="mega-menu-item-title">Blog</span>
                                    <span className="mega-menu-item-desc">Guides et analyses</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link href="/qui-sommes-nous" className="nav-link">Qui sommes-nous</Link>
                    <a
                        href="tel:+33189700000"
                        className="header-phone"
                        aria-label="Appeler Amana Patrimoine"
                        onClick={() => typeof window !== 'undefined' && (window.dataLayer = window.dataLayer || []) && window.dataLayer.push({ event: 'phone_click', event_label: 'header' })}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '5px', flexShrink: 0 }}>
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.24 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                        </svg>
                        01 89 70 00 00
                    </a>
                    <a
                        href="/bilan-patrimonial"
                        className="btn btn-primary btn-sm"
                        onClick={() => trackCalendlyClick('header-nav')}
                    >
                        Bilan Patrimonial
                    </a>
                </nav>

                {/* Mobile nav */}
                {mobileMenuOpen && (
                    <div className="mobile-nav-overlay" onClick={closeMobile}>
                        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()} aria-label="Navigation mobile">
                            <div className="mobile-nav-item">
                                <button className="mobile-nav-link" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                                    Nos Solutions
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {mobileServicesOpen && (
                                    <div className="mobile-sub-menu">
                                        <span className="mobile-sub-title">Planification</span>
                                        <Link href="/retraite" className="mobile-sub-link" onClick={closeMobile}>Préparer ma retraite</Link>
                                        <Link href="/strategie" className="mobile-sub-link" onClick={closeMobile}>Stratégie patrimoniale</Link>
                                        <Link href="/succession" className="mobile-sub-link" onClick={closeMobile}>Préparer ma succession</Link>
                                        <span className="mobile-sub-title">Investissement</span>
                                        <Link href="/immobilier" className="mobile-sub-link" onClick={closeMobile}>Investir dans l&apos;immobilier</Link>
                                        <Link href="/investissement" className="mobile-sub-link" onClick={closeMobile}>Investir son argent</Link>
                                        <Link href="/enfants" className="mobile-sub-link" onClick={closeMobile}>Avenir des enfants</Link>
                                        <span className="mobile-sub-title">Optimisation</span>
                                        <Link href="/reduire-impots" className="mobile-sub-link" onClick={closeMobile}>Optimiser ma fiscalité</Link>
                                        <Link href="/reduire-impots-entreprise" className="mobile-sub-link" onClick={closeMobile}>Fiscalité d&apos;entreprise</Link>
                                    </div>
                                )}
                            </div>
                            <div className="mobile-nav-item">
                                <button className="mobile-nav-link" onClick={() => setMobileRessourcesOpen(!mobileRessourcesOpen)}>
                                    Ressources
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileRessourcesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {mobileRessourcesOpen && (
                                    <div className="mobile-sub-menu">
                                        <Link href="/finance-islamique" className="mobile-sub-link" onClick={closeMobile}>Finance islamique</Link>
                                        <Link href="/scpi-halal" className="mobile-sub-link" onClick={closeMobile}>SCPI Halal</Link>
                                        <Link href="/assurance-vie-islamique" className="mobile-sub-link" onClick={closeMobile}>Assurance-vie islamique</Link>
                                        <Link href="/zakat" className="mobile-sub-link" onClick={closeMobile}>Zakat — Guide complet</Link>
                                        {simulateursVisible && (
                                            <Link href="/simulateurs" className="mobile-sub-link" onClick={closeMobile}>Simulateur Zakat</Link>
                                        )}
                                        <Link href="/lexique" className="mobile-sub-link" onClick={closeMobile}>Lexique finance islamique</Link>
                                        <Link href="/blog" className="mobile-sub-link" onClick={closeMobile}>Blog</Link>
                                    </div>
                                )}
                            </div>
                            <Link href="/qui-sommes-nous" className="mobile-nav-link" onClick={closeMobile}>Qui sommes-nous</Link>
                            <a href="tel:+33189700000" className="mobile-nav-phone" onClick={closeMobile}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '6px' }}>
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.24 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                                </svg>
                                01 89 70 00 00
                            </a>
                            <a
                                href="/bilan-patrimonial"
                                className="btn btn-gold mobile-nav-cta"
                                onClick={() => { closeMobile(); trackCalendlyClick('header-mobile'); }}
                            >
                                Bilan Patrimonial
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
