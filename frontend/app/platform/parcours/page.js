import Link from 'next/link';
import { getLandingUrls } from '../../../lib/landing/urls';

export const metadata = {
    title: 'Parcours — bientôt disponible',
};

export default function ParcoursPlaceholderPage() {
    const urls = getLandingUrls();

    return (
        <main
            style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 2rem',
                fontFamily: 'var(--font-body, system-ui)',
                textAlign: 'center',
            }}
        >
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Parcours en ligne
            </h1>
            <p style={{ maxWidth: 480, lineHeight: 1.6, color: '#3a3d36', marginBottom: '2rem' }}>
                Le parcours interactif sera connecté ici. En attendant, prenez rendez-vous
                avec un conseiller pour démarrer votre bilan.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                    href={urls.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '14px 28px',
                        background: '#d4a857',
                        color: '#131a14',
                        borderRadius: 6,
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    Prendre rendez-vous
                </a>
                <Link
                    href="/platform"
                    style={{
                        padding: '14px 28px',
                        border: '1px solid rgba(21,23,15,0.15)',
                        borderRadius: 6,
                        fontWeight: 600,
                        textDecoration: 'none',
                        color: '#131a14',
                    }}
                >
                    Retour à la landing
                </Link>
            </div>
        </main>
    );
}
