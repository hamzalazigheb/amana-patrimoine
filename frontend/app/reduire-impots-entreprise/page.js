import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('reduire-impots-entreprise');
    return buildMetadata(
        page,
        'reduire-impots-entreprise',
        'Optimiser la Fiscalité de son Entreprise - Conseil Fiscal Pro',
        'Optimisation fiscale entreprise : structuration, rémunération dirigeant, transmission. Conseil fiscal professionnel conforme à la finance islamique.'
    );
}

export default async function ReduireImpotsEntreprisePage() {
    const page = await getPageBySlug('reduire-impots-entreprise');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Optimiser ma fiscalité d\'entreprise', slug: 'reduire-impots-entreprise' }]);
    const service = buildServiceJsonLd('Optimisation Fiscale Entreprise', 'Conseil en optimisation fiscale pour entreprises, conforme à la finance islamique.', 'reduire-impots-entreprise');

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
