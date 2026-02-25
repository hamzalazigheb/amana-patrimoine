import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const revalidate = 3600;

export async function generateMetadata() {
    const page = await getPageBySlug('immobilier');
    return buildMetadata(
        page,
        'immobilier',
        'Investir dans l\'Immobilier - SCPI et Immobilier Conforme',
        'Investissez dans l\'immobilier avec des solutions conformes à la finance islamique : SCPI halal, nue-propriété, immobilier locatif. Conseil expert à Paris.'
    );
}

export default async function ImmobilierPage() {
    const page = await getPageBySlug('immobilier');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Investissement immobilier', slug: 'immobilier' }]);
    const service = buildServiceJsonLd('Investissement Immobilier', 'Conseil en investissement immobilier conforme à la finance islamique : SCPI, nue-propriété, immobilier locatif.', 'immobilier');

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
