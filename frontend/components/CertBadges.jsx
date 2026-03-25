/**
 * C3 — Certification badges for service pages.
 * Shows ORIAS, CIF, and CGP Indépendant trust signals inline.
 */
export default function CertBadges({ className = '' }) {
    return (
        <div className={`cert-badges ${className}`} aria-label="Certifications et accréditations">
            <a
                href="https://www.orias.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-badge"
                title="Vérifié sur le registre ORIAS des intermédiaires en assurance"
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>ORIAS</span>
            </a>
            <span className="cert-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>CIF</span>
            </span>
            <span className="cert-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>CGP Indépendant</span>
            </span>
        </div>
    );
}
