import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('reduire-impots');
    return buildMetadata(
        page,
        'reduire-impots',
        'Réduire ses Impôts - Optimisation Fiscale Particulier',
        'Optimisez votre fiscalité personnelle de manière légale et conforme à la finance islamique. Conseil en défiscalisation à Paris.'
    );
}

export default async function ReduireImpotsPage() {
    const page = await getPageBySlug('reduire-impots');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Optimiser ma fiscalité', slug: 'reduire-impots' }]);
    const service = buildServiceJsonLd('Optimisation Fiscale Particulier', 'Conseil en optimisation fiscale personnelle conforme à la finance islamique.', 'reduire-impots');

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
