export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import Breadcrumb from '../../components/Breadcrumb';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export async function generateMetadata() {
    const page = await getPageBySlug('investissement');
    return buildMetadata(
        page,
        'investissement',
        'Investissement Halal : Placements Éthiques & Conseil',
        'Placements halal conformes à la finance islamique : assurance-vie, SCPI sans riba, PER éthique. Conseil CGP indépendant Paris. Premier RDV gratuit.'
    );
}

export default async function InvestissementPage() {
    const page = await getPageBySlug('investissement');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Investissement halal', slug: 'investissement' }]);
    const service = buildServiceJsonLd('Investissement Halal', 'Conseil en placements halal conformes à la finance islamique : assurance-vie, SCPI sans riba, PER éthique.', 'investissement');

    const faqBlock = page?.blocks?.find(b => b.type === 'faq');
    const faqJsonLd = buildFaqJsonLd(faqBlock?.content?.items, 'investissement');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <Breadcrumb items={[{ name: 'Investissement', href: '/investissement' }]} />
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
