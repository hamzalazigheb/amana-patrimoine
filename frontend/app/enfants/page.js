import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import EnfantsSimulator from '../../components/EnfantsSimulator';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('enfants');
    return buildMetadata(
        page,
        'enfants',
        'Financer les Études de ses Enfants - Épargne Enfant Conforme',
        'Anticipez les besoins futurs de vos enfants : études, permis, logement. Épargne éthique et conforme à la finance islamique à Paris.'
    );
}

export default async function EnfantsPage() {
    const page = await getPageBySlug('enfants');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Avenir des enfants', slug: 'enfants' }]);
    const service = buildServiceJsonLd('Épargne Enfants', 'Conseil en épargne pour les études et l\'avenir des enfants, conforme à la finance islamique.', 'enfants');

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
