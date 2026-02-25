'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <button className="mobile-menu-toggle" aria-label="Menu de navigation" aria-expanded="false" aria-controls="mobile-navigation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
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
                    <Link href="/qui-sommes-nous" className="nav-link">Qui sommes-nous</Link>
                    <Link href="/#methodology" className="nav-link">Notre Approche</Link>
                    <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Bilan Patrimonial</a>
                </nav>
            </div>
        </header>
    );
}
