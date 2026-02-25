import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('strategie');
    return buildMetadata(
        page,
        'strategie',
        'Stratégie Patrimoniale Personnalisée',
        'Définissez votre stratégie patrimoniale sur mesure avec Amana Patrimoine. Audit, objectifs, allocation d\'actifs conforme à la finance islamique.'
    );
}

export default async function StrategiePage() {
    const page = await getPageBySlug('strategie');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Stratégie patrimoniale', slug: 'strategie' }]);
    const service = buildServiceJsonLd('Stratégie Patrimoniale', 'Conseil en stratégie patrimoniale personnalisée et conforme à la finance islamique.', 'strategie');

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
