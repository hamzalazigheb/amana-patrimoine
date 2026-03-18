export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

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

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <main id="main-content">
                {page ? (
                    <BlockRenderer blocks={page.blocks} />
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
