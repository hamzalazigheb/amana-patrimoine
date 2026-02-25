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
                    </div>

                    <div className="footer-column">
                        <h4>Expertises</h4>
                        <nav className="footer-links" aria-label="Expertises">
                            <Link href="/strategie" className="footer-link">Stratégie Patrimoniale</Link>
                            <Link href="/immobilier" className="footer-link">Investissement Immobilier</Link>
                            <Link href="/retraite" className="footer-link">Préparation Retraite</Link>
                            <Link href="/succession" className="footer-link">Transmission de Capital</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Solutions</h4>
                        <nav className="footer-links" aria-label="Solutions">
                            <Link href="/enfants" className="footer-link">Protection de la Famille</Link>
                            <Link href="/reduire-impots" className="footer-link">Optimisation Fiscale</Link>
                            <Link href="/investissement" className="footer-link">Placements Éthiques</Link>
                            <Link href="/#methodology" className="footer-link">Notre Approche</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Cabinet</h4>
                        <nav className="footer-links" aria-label="Contact">
                            <span className="footer-link" style={{ cursor: 'default' }}>
                                Paris et Île-de-France<br />
                                Rendez-vous sur Paris et région parisienne
                            </span>
                            <a href="tel:+33189700000" className="footer-link">+33 (0)1 89 70 00 00</a>
                            <a href="mailto:contact@amana-patrimoine.fr" className="footer-link">contact@amana-patrimoine.fr</a>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        &copy; {currentYear} Amana Patrimoine. Tous droits réservés.
                    </p>
                    <nav className="footer-legal" aria-label="Mentions légales">
                        <Link href="/mentions-legales">Mentions Légales</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
