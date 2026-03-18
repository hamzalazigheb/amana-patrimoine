import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('scpi-halal');
    return buildMetadata(
        page,
        'scpi-halal',
        'SCPI Halal : Investir dans l\'Immobilier sans Riba',
        'SCPI halal conformes à la finance islamique : revenus immobiliers sans intérêt, critères charia, ESG. Conseil CGP Paris.'
    );
}

export default async function ScpiHalalPage() {
    const page = await getPageBySlug('scpi-halal');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'SCPI Halal', slug: 'scpi-halal' }]);
    const service = buildServiceJsonLd('SCPI Halal', 'Conseil en investissement SCPI halal conformes à la finance islamique : revenus sans riba, audit charia.', 'scpi-halal');
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
