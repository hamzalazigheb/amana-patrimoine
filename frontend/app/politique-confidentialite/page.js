export const metadata = {
    title: 'Politique de Confidentialité | Amana Patrimoine',
    description: 'Politique de confidentialité et de protection des données personnelles d\'Amana Patrimoine, cabinet de conseil en gestion de patrimoine islamique.',
    robots: { index: false },
};

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PolitiqueConfidentialitePage() {
    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '860px' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                        Politique de confidentialité
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                        Dernière mise à jour : mars 2026
                    </p>

                    <Section title="1. Responsable du traitement">
                        <p>
                            <strong>Amana Patrimoine</strong><br />
                            60 rue François Ier, 75008 Paris<br />
                            Email : contact@amana-patrimoine.fr<br />
                            Téléphone : +33 (0)1 89 70 00 00
                        </p>
                    </Section>

                    <Section title="2. Données collectées">
                        <p>Nous collectons les données suivantes :</p>
                        <ul>
                            <li>Nom, prénom, adresse email, numéro de téléphone (via les formulaires de contact et Calendly)</li>
                            <li>Données de navigation : pages visitées, durée de session, adresse IP (via Google Analytics)</li>
                            <li>Données de comportement publicitaire (via Meta Pixel, uniquement avec votre consentement)</li>
                        </ul>
                    </Section>

                    <Section title="3. Finalités du traitement">
                        <ul>
                            <li>Répondre à vos demandes de contact et de rendez-vous</li>
                            <li>Améliorer l'expérience utilisateur sur notre site</li>
                            <li>Analyser l'audience du site (statistiques anonymisées)</li>
                            <li>Vous contacter dans le cadre de notre relation commerciale</li>
                        </ul>
                    </Section>

                    <Section title="4. Base légale">
                        <ul>
                            <li><strong>Consentement</strong> : cookies analytics et publicitaires</li>
                            <li><strong>Intérêt légitime</strong> : amélioration de nos services</li>
                            <li><strong>Exécution d'un contrat</strong> : traitement de vos demandes de rendez-vous</li>
                        </ul>
                    </Section>

                    <Section title="5. Cookies utilisés">
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-brass-light)' }}>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Cookie</th>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Finalité</th>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Durée</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>Google Analytics (_ga)</td>
                                    <td style={{ padding: '8px' }}>Mesure d'audience</td>
                                    <td style={{ padding: '8px' }}>13 mois</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>Meta Pixel (_fbp)</td>
                                    <td style={{ padding: '8px' }}>Publicité ciblée</td>
                                    <td style={{ padding: '8px' }}>3 mois</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>cookie-consent</td>
                                    <td style={{ padding: '8px' }}>Mémorisation du consentement</td>
                                    <td style={{ padding: '8px' }}>12 mois</td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Section title="6. Partage des données">
                        <p>
                            Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
                        </p>
                        <ul>
                            <li>Google (Analytics, Tag Manager) — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-forest)' }}>politique de confidentialité Google</a></li>
                            <li>Meta (Pixel Facebook/Instagram) — <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-forest)' }}>politique de confidentialité Meta</a></li>
                            <li>Calendly (prise de rendez-vous) — <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-forest)' }}>politique Calendly</a></li>
                        </ul>
                    </Section>

                    <Section title="7. Durée de conservation">
                        <p>
                            Les données de contact sont conservées 3 ans après le dernier contact. Les données analytics sont anonymisées après 14 mois.
                        </p>
                    </Section>

                    <Section title="8. Vos droits (RGPD)">
                        <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
                        <ul>
                            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                            <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                        </ul>
                        <p>
                            Pour exercer ces droits, contactez-nous à :{' '}
                            <a href="mailto:contact@amana-patrimoine.fr" style={{ color: 'var(--color-forest)' }}>
                                contact@amana-patrimoine.fr
                            </a>
                        </p>
                        <p>
                            Vous pouvez également déposer une réclamation auprès de la{' '}
                            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-forest)' }}>
                                CNIL
                            </a>.
                        </p>
                    </Section>

                    <Section title="9. Sécurité">
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
                        </p>
                    </Section>
                </div>
            </main>
            <Footer />
        </>
    );
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: 'var(--color-forest)' }}>
                {title}
            </h2>
            <div style={{ color: 'var(--color-text)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {children}
            </div>
        </div>
    );
}
