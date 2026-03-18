export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('retraite');
    return buildMetadata(
        page,
        'retraite',
        'Retraite Islamique & PER Halal : Préparez l\'Avenir sans Riba',
        'Préparez votre retraite islamique avec un PER halal, une SCPI conforme ou une assurance-vie éthique. Conseil CGP expert en finance islamique à Paris.'
    );
}

export default async function RetraitePage() {
    const page = await getPageBySlug('retraite');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Retraite islamique & PER halal', slug: 'retraite' }]);
    const service = buildServiceJsonLd('Retraite Islamique & PER Halal', 'Conseil en préparation de retraite islamique : PER halal, SCPI conformes, assurance-vie éthique.', 'retraite');

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
