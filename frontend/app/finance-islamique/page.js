export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('finance-islamique');
    return buildMetadata(
        page,
        'finance-islamique',
        'Finance Islamique en France : Principes, Solutions & Conseil',
        'Tout comprendre sur la finance islamique en France : riba, halal, charia. Placements conformes, SCPI halal, PER éthique. Conseil expert CGP Paris.'
    );
}

export default async function FinanceIslamiqueePage() {
    const page = await getPageBySlug('finance-islamique');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Finance islamique', slug: 'finance-islamique' }]);
    const service = buildServiceJsonLd('Finance Islamique', 'Conseil en finance islamique : placements halal, SCPI conformes, PER éthique, assurance-vie islamique.', 'finance-islamique');
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
