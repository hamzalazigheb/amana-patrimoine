import Link from 'next/link';
import { getSettings } from '../lib/cms';
import CookieButton from './CookieButton';

const DEFAULT_COLUMNS = [
    {
        title: 'Expertises',
        links: [
            { label: 'Stratégie Patrimoniale', href: '/strategie' },
            { label: 'Investissement Immobilier', href: '/immobilier' },
            { label: 'Préparation Retraite', href: '/retraite' },
            { label: 'Transmission de Capital', href: '/succession' },
            { label: 'Protection de la Famille', href: '/enfants' },
            { label: 'Optimisation Fiscale', href: '/reduire-impots' },
            { label: 'Placements Éthiques', href: '/investissement' },
        ],
    },
    {
        title: 'Cabinet',
        links: [
            { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
            { label: 'Notre Approche', href: '/#methodology' },
            { label: 'Contact', href: '/contact' },
            { label: 'Mentions Légales', href: '/mentions-legales' },
            { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
        ],
    },
];

function SmartLink({ href, children, className }) {
    if (!href) return <span className={className}>{children}</span>;
    if (href.startsWith('/') || href.startsWith('#')) {
        return <Link href={href} className={className}>{children}</Link>;
    }
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default async function Footer() {
    let settings = {};
    try {
        settings = await getSettings();
    } catch {
        settings = {};
    }

    const currentYear = new Date().getFullYear();

    const description = settings.footer_description || 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.';
    const phone = settings.contact_phone || '+33 (0)1 89 70 00 00';
    const email = settings.contact_email || 'contact@amana-patrimoine.fr';
    const address = settings.contact_address || '60 rue François Ier\n75008 Paris';
    const hours = settings.contact_hours || 'Lun–Ven : 9h00–18h00';
    const linkedin = settings.social_linkedin || 'https://www.linkedin.com/company/amana-patrimoine';
    const instagram = settings.social_instagram || 'https://www.instagram.com/amanapatrimoine';
    const youtube = settings.social_youtube || 'https://www.youtube.com/@amanapatrimoine';
    const whatsapp = settings.social_whatsapp || 'https://wa.me/33668603619';
    const columns = Array.isArray(settings.footer_columns) && settings.footer_columns.length > 0
        ? settings.footer_columns
        : DEFAULT_COLUMNS;

    const addressLines = address.split('\n');

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
                                width="200"
                                height="60"
                            />
                        </div>
                        <p className="footer-desc">{description}</p>

                        <div className="footer-badges">
                            <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="footer-badge" title="Registre des intermédiaires en assurance">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                ORIAS
                            </a>
                            <span className="footer-badge">CIF</span>
                            <span className="footer-badge">CGP Indépendant</span>
                        </div>

                        <div className="footer-socials">
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn Amana Patrimoine">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                            )}
                            {instagram && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram Amana Patrimoine">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                    </svg>
                                </a>
                            )}
                            {youtube && (
                                <a href={youtube} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube Amana Patrimoine">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                                    </svg>
                                </a>
                            )}
                            {whatsapp && (
                                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp Amana Patrimoine">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {columns.map((col, i) => (
                        <div key={i} className="footer-column">
                            <h4>{col.title}</h4>
                            <nav className="footer-links" aria-label={col.title}>
                                {(col.links || []).map((link, j) => (
                                    <SmartLink key={j} href={link.href} className="footer-link">
                                        {link.label}
                                    </SmartLink>
                                ))}
                            </nav>
                        </div>
                    ))}

                    <div className="footer-column">
                        <h4>Contact</h4>
                        <address className="footer-links footer-address" style={{ fontStyle: 'normal' }}>
                            <span className="footer-link">
                                {addressLines.map((line, i) => (
                                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                                ))}
                            </span>
                            {phone && (
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="footer-link footer-link-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', flexShrink: 0 }}>
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    {phone}
                                </a>
                            )}
                            {email && (
                                <a href={`mailto:${email}`} className="footer-link footer-link-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', flexShrink: 0 }}>
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    {email}
                                </a>
                            )}
                            {hours && (
                                <span className="footer-link" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {hours}
                                </span>
                            )}
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
                        <CookieButton />
                    </nav>
                </div>
            </div>
        </footer>
    );
}
