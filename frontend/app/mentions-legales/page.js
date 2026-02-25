import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('mentions-legales');
    return buildMetadata(
        page,
        'mentions-legales',
        'Mentions Légales',
        'Mentions légales et informations juridiques du cabinet Amana Patrimoine.'
    );
}

export default async function MentionsLegalesPage() {
    const page = await getPageBySlug('mentions-legales');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Mentions légales', slug: 'mentions-legales' }]);

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
