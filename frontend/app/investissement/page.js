import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('investissement');
    return buildMetadata(
        page,
        'investissement',
        'Investir son Argent - Placements Éthiques et Conformes',
        'Investissez votre argent dans des placements conformes à la finance islamique : assurance-vie, SCPI, private equity halal. Conseil expert à Paris.'
    );
}

export default async function InvestissementPage() {
    const page = await getPageBySlug('investissement');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Investir son argent', slug: 'investissement' }]);
    const service = buildServiceJsonLd('Investissement Éthique', 'Conseil en investissement conforme à la finance islamique : assurance-vie, SCPI, private equity halal.', 'investissement');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
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
