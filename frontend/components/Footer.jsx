'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img
                                src="/logo-amana.png"
                                alt="Amana Patrimoine"
                                className="footer-logo-img"
                            />
                        </div>
                        <p className="footer-desc">
                            Cabinet de Conseil en Gestion de Patrimoine Indépendant.
                            Une expertise institutionnelle au service de votre sérénité financière.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>Expertises</h4>
                        <nav className="footer-links">
                            <a href="/strategie" className="footer-link">Stratégie Patrimoniale</a>
                            <a href="/immobilier" className="footer-link">Investissement Immobilier</a>
                            <a href="/retraite" className="footer-link">Préparation Retraite</a>
                            <a href="/succession" className="footer-link">Transmission de Capital</a>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Solutions</h4>
                        <nav className="footer-links">
                            <a href="/enfants" className="footer-link">Protection de la Famille</a>
                            <a href="/reduire-impots" className="footer-link">Optimisation Fiscale</a>
                            <a href="/investissement" className="footer-link">Placements Éthiques</a>
                            <a href="/#methodology" className="footer-link">Notre Approche</a>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Cabinet</h4>
                        <nav className="footer-links">
                            <a href="tel:+33189700000" className="footer-link">+33 (0)1 89 70 00 00</a>
                            <a href="mailto:contact@amana-patrimoine.fr" className="footer-link">contact@amana-patrimoine.fr</a>
                            <span className="footer-link" style={{ cursor: 'default' }}>
                                8 Avenue Kléber<br />
                                75116 Paris
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {currentYear} Amana Patrimoine. Tous droits réservés.
                    </p>
                    <nav className="footer-legal">
                        <a href="/mentions-legales">Mentions Légales</a>
                        <a href="/confidentialite">Confidentialité</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
