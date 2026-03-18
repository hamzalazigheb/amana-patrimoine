export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import EnfantsSimulator from '../../components/EnfantsSimulator';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('enfants');
    return buildMetadata(
        page,
        'enfants',
        'Épargne Enfants Halal : Financer les Études sans Riba',
        'Préparez les études de vos enfants avec une épargne halal : assurance-vie islamique, SCPI conformes, épargne programmée sans intérêt. Conseil expert Paris.'
    );
}

export default async function EnfantsPage() {
    const page = await getPageBySlug('enfants');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Épargne enfants halal', slug: 'enfants' }]);
    const service = buildServiceJsonLd('Épargne Enfants Halal', 'Conseil en épargne halal pour financer les études des enfants sans riba, conforme à la finance islamique.', 'enfants');

    const faqBlock = page?.blocks?.find(b => b.type === 'faq');
    const faqJsonLd = faqBlock ? buildFaqJsonLd(faqBlock.content?.items) : null;

    if (!page) {
        return (
            <>
                <Header />
                <main id="main-content">
                    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                        <p>Contenu en cours de chargement...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const simIndex = page.blocks.findIndex(b => b.type === 'content' && b.content?.label === 'Simulateur');
    const insertAt = simIndex >= 0 ? simIndex : 3;
    const blocksBefore = page.blocks.slice(0, insertAt);
    const blocksAfter = page.blocks.slice(simIndex >= 0 ? simIndex + 1 : insertAt);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <main id="main-content">
                <BlockRenderer blocks={blocksBefore} />
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-grid">
                            <div className="content-section-main">
                                <div className="content-section-header">
                                    <span className="section-label">Simulateur</span>
                                    <h2 className="section-title">L&apos;effet du temps sur l&apos;épargne</h2>
                                </div>
                                <div className="content-section-body">
                                    <EnfantsSimulator />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BlockRenderer blocks={blocksAfter} />
            </main>
            <Footer />
        </>
    );
}
