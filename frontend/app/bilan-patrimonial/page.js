export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('bilan-patrimonial');
    return buildMetadata(
        page,
        'bilan-patrimonial',
        'Bilan Patrimonial Gratuit : Évaluez et Optimisez votre Patrimoine',
        'Bilan patrimonial gratuit à Paris avec un CGP indépendant. Analyse complète : actifs, fiscalité, retraite, succession. Finance islamique. Premier RDV sans engagement.'
    );
}

export default async function BilanPatrimonialPage() {
    const page = await getPageBySlug('bilan-patrimonial');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Bilan patrimonial gratuit', slug: 'bilan-patrimonial' }]);
    const service = buildServiceJsonLd('Bilan Patrimonial Gratuit', 'Bilan patrimonial gratuit avec un CGP indépendant spécialisé en finance islamique à Paris.', 'bilan-patrimonial');
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
