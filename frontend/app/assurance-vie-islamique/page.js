import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('assurance-vie-islamique');
    return buildMetadata(
        page,
        'assurance-vie-islamique',
        'Assurance-Vie Islamique : Épargner et Transmettre sans Intérêt',
        'Assurance-vie islamique halal : épargne sur fonds Shariah Compliant, transmission optimisée hors succession, sans riba. Conseil CGP expert Paris.'
    );
}

export default async function AssuranceVieIslamiquePage() {
    const page = await getPageBySlug('assurance-vie-islamique');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Assurance-vie islamique', slug: 'assurance-vie-islamique' }]);
    const service = buildServiceJsonLd('Assurance-Vie Islamique', 'Conseil en assurance-vie islamique halal : épargne sur fonds Shariah Compliant, transmission optimisée.', 'assurance-vie-islamique');
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
