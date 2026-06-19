'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackCalendlyClick } from '../lib/track';

const DEFAULT_NAV_ITEMS = [
    {
        label: 'Nos Solutions',
        type: 'mega',
        columns: [
            {
                title: 'Planification',
                items: [
                    { href: '/retraite', title: 'Préparer ma retraite', desc: 'Sécurisez votre avenir financier' },
                    { href: '/strategie', title: 'Stratégie patrimoniale', desc: 'Optimisez votre patrimoine' },
                    { href: '/succession', title: 'Préparer ma succession', desc: 'Transmettez en toute sérénité' },
                ],
            },
            {
                title: 'Investissement',
                items: [
                    { href: '/immobilier', title: "Investir dans l'immobilier", desc: 'Patrimoine immobilier durable' },
                    { href: '/investissement', title: 'Investir son argent', desc: 'Croissance et diversification' },
                    { href: '/enfants', title: 'Avenir des enfants', desc: 'Préparez leur avenir' },
                ],
            },
            {
                title: 'Optimisation',
                items: [
                    { href: '/reduire-impots', title: 'Optimiser ma fiscalité en tant que particulier', desc: 'Optimisation fiscale légale' },
                    { href: '/reduire-impots-entreprise', title: "Optimiser ma fiscalité d'entreprise", desc: 'Optimisation fiscale légale' },
                ],
            },
        ],
    },
    {
        label: 'Ressources',
        type: 'dropdown',
        items: [
            { href: '/finance-islamique', title: 'Finance islamique', desc: 'Principes et solutions' },
            { href: '/scpi-halal', title: 'SCPI Halal', desc: 'Immobilier sans riba' },
            { href: '/assurance-vie-islamique', title: 'Assurance-vie islamique', desc: 'Épargner et transmettre' },
            { href: '/zakat', title: 'Zakat', desc: 'Guide et calcul' },
            { href: '/simulateurs', title: 'Simulateur Zakat', desc: 'Calculez en ligne', featureFlag: 'simulateurs_visible' },
            { href: '/lexique', title: 'Lexique', desc: 'Termes et définitions' },
            { href: '/blog', title: 'Blog', desc: 'Guides et analyses' },
            { href: '/nos-actualites', title: 'Nos actualités', desc: 'Vidéos & conseils' },
            { href: '/livres-blancs', title: 'Livres blancs', desc: 'Guides PDF gratuits' },
        ],
    },
    {
        label: 'Qui sommes-nous',
        type: 'link',
        href: '/qui-sommes-nous',
    },
    {
        label: 'Contact',
        type: 'link',
        href: '/contact',
    },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileOpenIdx, setMobileOpenIdx] = useState(null);
    const [features, setFeatures] = useState({ simulateurs_visible: true });
    const [navItems, setNavItems] = useState(DEFAULT_NAV_ITEMS);
    const [navPhone, setNavPhone] = useState('06 68 60 36 19');
    const [navPhoneHref, setNavPhoneHref] = useState('tel:+33189700000');
    const [navCtaText, setNavCtaText] = useState('Bilan Patrimonial');
    const [navCtaLink, setNavCtaLink] = useState('/bilan-patrimonial');
    const platformAuthUrl =
        process.env.NEXT_PUBLIC_PLATFORM_AUTH_URL || 'https://platform.amana-patrimoine.fr/auth';

    useEffect(() => {
        if (typeof window !== 'undefined' && window.__FEATURES__) {
            const f = window.__FEATURES__;
            setFeatures(f);
            if (f.nav_phone) setNavPhone(f.nav_phone);
            if (f.nav_phone_href) setNavPhoneHref(f.nav_phone_href);
            if (f.nav_cta_text) setNavCtaText(f.nav_cta_text);
            if (f.nav_cta_link) setNavCtaLink(f.nav_cta_link);
            if (Array.isArray(f.nav_items) && f.nav_items.length > 0) {
                setNavItems(f.nav_items);
            }
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const closeMobile = () => {
        setMobileMenuOpen(false);
        setMobileOpenIdx(null);
    };

    const shouldShow = (item) => {
        if (!item.featureFlag) return true;
        const val = features[item.featureFlag];
        return val !== false && val !== 'false';
    };

    const chevron = (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }} aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );

    function renderDesktopItem(item, idx) {
        if (item.type === 'link') {
            return (
                <Link key={idx} href={item.href} className="nav-link">{item.label}</Link>
            );
        }

        const isOpen = openDropdown === idx;

        return (
            <div
                key={idx}
                className="nav-dropdown"
                onMouseEnter={() => setOpenDropdown(idx)}
                onMouseLeave={() => setOpenDropdown(null)}
            >
                <button
                    className="nav-link"
                    style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    {item.label}{chevron}
                </button>

                {isOpen && item.type === 'mega' && (
                    <div className="nav-dropdown-menu mega-menu">
                        <div className="mega-menu-content">
                            {(item.columns || []).map((col, colIdx) => (
                                <div key={colIdx} className="mega-menu-column">
                                    <h4 className="mega-menu-title">{col.title}</h4>
                                    {(col.items || []).filter(shouldShow).map((sub, subIdx) => (
                                        <Link key={subIdx} href={sub.href} className="nav-dropdown-item">
                                            <span className="mega-menu-item-title">{sub.title}</span>
                                            <span className="mega-menu-item-desc">{sub.desc}</span>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isOpen && item.type === 'dropdown' && (
                    <div className="nav-dropdown-menu" style={{ minWidth: '260px' }}>
                        {(item.items || []).filter(shouldShow).map((sub, subIdx) => (
                            <Link key={subIdx} href={sub.href} className="nav-dropdown-item">
                                <span className="mega-menu-item-title">{sub.title}</span>
                                <span className="mega-menu-item-desc">{sub.desc}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    function renderMobileItem(item, idx) {
        if (item.type === 'link') {
            return (
                <Link key={idx} href={item.href} className="mobile-nav-link" onClick={closeMobile}>
                    {item.label}
                </Link>
            );
        }

        const isOpen = mobileOpenIdx === idx;

        // Flatten mega columns into titled groups for mobile
        const mobileSubItems = item.type === 'mega'
            ? (item.columns || []).flatMap(col => [
                { _sectionTitle: true, title: col.title },
                ...(col.items || []).filter(shouldShow),
            ])
            : (item.items || []).filter(shouldShow);

        return (
            <div key={idx} className="mobile-nav-item">
                <button
                    className="mobile-nav-link"
                    onClick={() => setMobileOpenIdx(isOpen ? null : idx)}
                >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="mobile-sub-menu">
                        {mobileSubItems.map((sub, subIdx) => (
                            sub._sectionTitle
                                ? <span key={subIdx} className="mobile-sub-title">{sub.title}</span>
                                : <Link key={subIdx} href={sub.href} className="mobile-sub-link" onClick={closeMobile}>{sub.title}</Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-inner">
                <Link href="/" className="logo">
                    <img
                        src="/1amanap-patrimoine.svg"
                        alt="Amana Patrimoine - Cabinet de conseil en gestion de patrimoine"
                        className="logo-img logo-custom"
                        width="120"
                        height="120"
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>

                {/* Desktop nav */}
                <nav className="nav" aria-label="Navigation principale">
                    {navItems.map((item, idx) => renderDesktopItem(item, idx))}
                    <a
                        href={navPhoneHref}
                        className="header-phone"
                        aria-label="Appeler Amana Patrimoine"
                        onClick={() => typeof window !== 'undefined' && (window.dataLayer = window.dataLayer || []) && window.dataLayer.push({ event: 'phone_click', event_label: 'header' })}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '5px', flexShrink: 0 }}>
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.24 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                        </svg>
                        {navPhone}
                    </a>
                    <div className="header-cta-group">
                        <a
                            href={navCtaLink}
                            className="btn btn-primary btn-sm"
                            onClick={() => trackCalendlyClick('header-nav')}
                        >
                            {navCtaText}
                        </a>
                        <a
                            href={platformAuthUrl}
                            className="btn btn-primary btn-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mon espace
                        </a>
                    </div>
                </nav>

                {/* Mobile nav */}
                {mobileMenuOpen && (
                    <div className="mobile-nav-overlay" onClick={closeMobile}>
                        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()} aria-label="Navigation mobile">
                            {navItems.map((item, idx) => renderMobileItem(item, idx))}
                            <a href={navPhoneHref} className="mobile-nav-phone" onClick={closeMobile}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '6px' }}>
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.24 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                                </svg>
                                {navPhone}
                            </a>
                            <div className="header-cta-group header-cta-group--mobile">
                                <a
                                    href={navCtaLink}
                                    className="btn btn-gold mobile-nav-cta"
                                    onClick={() => { closeMobile(); trackCalendlyClick('header-mobile'); }}
                                >
                                    {navCtaText}
                                </a>
                                <a
                                    href={platformAuthUrl}
                                    className="btn btn-primary mobile-nav-cta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMobile}
                                >
                                    Mon espace
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
