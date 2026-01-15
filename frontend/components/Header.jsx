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
                        src="/logo10.png"
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
                            <div className="nav-dropdown-menu mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Planification</h4>
                                        <a href="/retraite" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Préparer ma retraite</span>
                                            <span className="mega-menu-item-desc">Sécurisez votre avenir financier</span>
                                        </a>
                                        <a href="/strategie" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Stratégie patrimoniale</span>
                                            <span className="mega-menu-item-desc">Optimisez votre patrimoine</span>
                                        </a>
                                        <a href="/succession" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Préparer ma succession</span>
                                            <span className="mega-menu-item-desc">Transmettez en toute sérénité</span>
                                        </a>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Investissement</h4>
                                        <a href="/immobilier" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Investir dans l'immobilier</span>
                                            <span className="mega-menu-item-desc">Patrimoine immobilier durable</span>
                                        </a>
                                        <a href="/investissement" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Investir son argent</span>
                                            <span className="mega-menu-item-desc">Croissance et diversification</span>
                                        </a>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="mega-menu-title">Optimisation</h4>
                                        <a href="/enfants" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Avenir des enfants</span>
                                            <span className="mega-menu-item-desc">Préparez leur avenir</span>
                                        </a>
                                        <a href="/reduire-impots" className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">Réduire ses impôts</span>
                                            <span className="mega-menu-item-desc">Optimisation fiscale légale</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <a href="/qui-sommes-nous" className="nav-link">Qui sommes-nous</a>
                    <a href="/#methodology" className="nav-link">Notre Approche</a>
                    <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Bilan Patrimonial</a>
                </nav>
            </div>
        </header>
    );
}

