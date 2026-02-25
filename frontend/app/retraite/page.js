import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('retraite');
    return buildMetadata(
        page,
        'retraite',
        'Préparer sa Retraite - PER et Épargne Retraite Conforme',
        'Préparez votre retraite avec des solutions conformes à la finance islamique : PER, assurance-vie, épargne programmée. Conseil personnalisé à Paris.'
    );
}

export default async function RetraitePage() {
    const page = await getPageBySlug('retraite');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Préparer ma retraite', slug: 'retraite' }]);
    const service = buildServiceJsonLd('Préparation Retraite', 'Conseil en préparation de retraite conforme à la finance islamique : PER, assurance-vie, épargne programmée.', 'retraite');

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
