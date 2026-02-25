import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('qui-sommes-nous');
    return buildMetadata(
        page,
        'qui-sommes-nous',
        'Qui sommes-nous - L\'Équipe Amana Patrimoine',
        'Découvrez l\'équipe d\'Amana Patrimoine : des experts en gestion de patrimoine et finance islamique à Paris.'
    );
}

export default async function QuiSommesNousPage() {
    const page = await getPageBySlug('qui-sommes-nous');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Qui sommes-nous', slug: 'qui-sommes-nous' }]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
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
