'use client';

import { useState, useEffect } from 'react';

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
                <a href="/" className="logo">
                    <img
                        src="/logo-amana.png"
                        alt="Amana Patrimoine"
                        className="logo-img"
                    />
                </a>

                <nav className="nav">
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <span className="nav-link" style={{ cursor: 'pointer' }}>
                            Nos Solutions
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </span>
                        {servicesOpen && (
                            <div className="nav-dropdown-menu">
                                <a href="/retraite" className="nav-dropdown-item">Préparer ma retraite</a>
                                <a href="/strategie" className="nav-dropdown-item">Stratégie patrimoniale</a>
                                <a href="/enfants" className="nav-dropdown-item">Avenir des enfants</a>
                                <a href="/succession" className="nav-dropdown-item">Préparer ma succession</a>
                                <a href="/reduire-impots" className="nav-dropdown-item">Réduire ses impôts</a>
                                <a href="/immobilier" className="nav-dropdown-item">Investir dans l'immobilier</a>
                                <a href="/investissement" className="nav-dropdown-item">Investir son argent</a>
                            </div>
                        )}
                    </div>
                    <a href="/#methodology" className="nav-link">Notre Approche</a>
                    <a href="/#contact" className="btn btn-primary btn-sm">Entretien Confidentiel</a>
                </nav>
            </div>
        </header>
    );
}

