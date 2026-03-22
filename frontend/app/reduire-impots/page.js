// export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

const BUBBLE_STEPS = [
    'Bilan patrimonial complet et confidentiel',
    'Analyse de votre imposition actuelle (IR, IFI, fiscalité des revenus et du capital)',
    'Identification des leviers utilisables en fonction de votre profil',
    "Élaboration d'un plan d'optimisation sur-mesure",
    'Suivi et ajustements dans le temps',
];

function AccompagnementBubbles() {
    return (
        <section className="content-section">
            <div className="container">
                <div className="content-section-header">
                    <span className="section-label">Accompagnement</span>
                    <h2 className="section-title">Notre méthode d&apos;accompagnement fiscal</h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
                    {BUBBLE_STEPS.map((step, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            background: 'var(--color-ivory)',
                            border: '1px solid var(--color-brass-light)',
                            borderRadius: '100px',
                            padding: '0.6rem 1.25rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-forest)',
                            fontFamily: 'var(--font-body)',
                        }}>
                            <span style={{
                                width: '22px', height: '22px', minWidth: '22px',
                                background: 'var(--color-forest)',
                                color: '#fff',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem', fontWeight: 600,
                            }}>{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '1.5rem', color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Nous privilégions les stratégies pérennes, lisibles, sécurisées et adaptées à vos objectifs de vie.
                </p>
            </div>
        </section>
    );
}

function isAccompagnementBlock(block) {
    if (block.type !== 'content') return false;
    const label = (block.content?.label || '').toLowerCase();
    const paragraphs = block.content?.paragraphs || [];
    const hasNotreProcesus = paragraphs.some(
        p => typeof p === 'string' && p.toLowerCase().includes('notre processus')
    );
    return label.includes('accompagnement') || hasNotreProcesus;
}

export async function generateMetadata() {
    const page = await getPageBySlug('reduire-impots');
    return buildMetadata(
        page,
        'reduire-impots',
        'Réduire ses Impôts Légalement & Éthiquement',
        'Optimisez votre fiscalité avec des solutions légales et conformes à la finance islamique : PER, assurance-vie, immobilier, transmission. Conseil CGP indépendant Paris.'
    );
}

export default async function ReduireImpotsPage() {
    const page = await getPageBySlug('reduire-impots');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Réduire mes impôts', slug: 'reduire-impots' }]);
    const service = buildServiceJsonLd('Optimisation Fiscale', 'Conseil en optimisation fiscale légale et conforme à la finance islamique : PER, assurance-vie, immobilier.', 'reduire-impots');

    const faqBlock = page?.blocks?.find(b => b.type === 'faq');
    const faqJsonLd = faqBlock ? buildFaqJsonLd(faqBlock.content?.items) : null;

    const blocks = page?.blocks || [];
    const hasAccompagnement = blocks.some(isAccompagnementBlock);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <main id="main-content">
                {page ? (
                    hasAccompagnement ? (
                        blocks.map((block, i) =>
                            isAccompagnementBlock(block)
                                ? <AccompagnementBubbles key={i} />
                                : <BlockRenderer key={i} blocks={[block]} />
                        )
                    ) : (
                        <BlockRenderer blocks={blocks} />
                    )
                ) : (
                    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                        <p>Contenu en cours de chargement...</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
