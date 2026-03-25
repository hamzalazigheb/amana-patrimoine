'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img
                                src="/logo-amana.png"
                                alt="Amana Patrimoine - Cabinet de gestion de patrimoine"
                                className="footer-logo-img"
                            />
                        </div>
                        <p className="footer-desc">
                            Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.
                        </p>
                        {/* Certification badges */}
                        <div className="footer-badges">
                            <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="footer-badge" title="Registre des intermédiaires en assurance">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                ORIAS
                            </a>
                            <span className="footer-badge">CIF</span>
                            <span className="footer-badge">CGP Indépendant</span>
                        </div>

                        {/* Social links */}
                        <div className="footer-socials">
                            <a href="https://www.linkedin.com/company/amana-patrimoine" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn Amana Patrimoine">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/amanapatrimoine" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram Amana Patrimoine">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@amanapatrimoine" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube Amana Patrimoine">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                                </svg>
                            </a>
                            <a href="https://wa.me/33189700000" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp Amana Patrimoine">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Expertises</h4>
                        <nav className="footer-links" aria-label="Expertises">
                            <Link href="/strategie" className="footer-link">Stratégie Patrimoniale</Link>
                            <Link href="/immobilier" className="footer-link">Investissement Immobilier</Link>
                            <Link href="/retraite" className="footer-link">Préparation Retraite</Link>
                            <Link href="/succession" className="footer-link">Transmission de Capital</Link>
                            <Link href="/enfants" className="footer-link">Protection de la Famille</Link>
                            <Link href="/reduire-impots" className="footer-link">Optimisation Fiscale</Link>
                            <Link href="/investissement" className="footer-link">Placements Éthiques</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Cabinet</h4>
                        <nav className="footer-links" aria-label="Cabinet">
                            <Link href="/qui-sommes-nous" className="footer-link">Qui sommes-nous</Link>
                            <Link href="/#methodology" className="footer-link">Notre Approche</Link>
                            <Link href="/mentions-legales" className="footer-link">Mentions Légales</Link>
                            <Link href="/politique-confidentialite" className="footer-link">Politique de confidentialité</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Contact</h4>
                        <address className="footer-links footer-address" style={{ fontStyle: 'normal' }}>
                            <span className="footer-link">
                                60 rue François Ier<br />
                                75008 Paris
                            </span>
                            <a href="tel:+33189700000" className="footer-link footer-link-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', flexShrink: 0 }}>
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                +33 (0)1 89 70 00 00
                            </a>
                            <a href="mailto:contact@amana-patrimoine.fr" className="footer-link footer-link-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', flexShrink: 0 }}>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                contact@amana-patrimoine.fr
                            </a>
                            <span className="footer-link" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                Lun–Ven : 9h00–18h00
                            </span>
                        </address>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        &copy; {currentYear} Amana Patrimoine. Tous droits réservés.
                    </p>
                    <nav className="footer-legal" aria-label="Liens légaux">
                        <Link href="/mentions-legales">Mentions Légales</Link>
                        <Link href="/politique-confidentialite">Confidentialité</Link>
                        <button
                            className="footer-legal-btn"
                            onClick={() => typeof window.__openCookiePrefs === 'function' && window.__openCookiePrefs()}
                        >
                            Gérer mes cookies
                        </button>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
