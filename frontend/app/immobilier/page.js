export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const revalidate = 3600;

export async function generateMetadata() {
    const page = await getPageBySlug('immobilier');
    return buildMetadata(
        page,
        'immobilier',
        'SCPI Halal & Immobilier Islamique : Investir sans Riba',
        'Investissez dans l\'immobilier halal : SCPI conformes à la finance islamique, financement sans riba, SCI, locatif éthique. Conseil CGP indépendant Paris.'
    );
}

export default async function ImmobilierPage() {
    const page = await getPageBySlug('immobilier');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'SCPI halal & immobilier islamique', slug: 'immobilier' }]);
    const service = buildServiceJsonLd('Investissement Immobilier Halal', 'Conseil en investissement immobilier halal : SCPI conformes, financement islamique, SCI, locatif éthique.', 'immobilier');

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
