export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export async function generateMetadata() {
    const page = await getPageBySlug('strategie');
    return buildMetadata(
        page,
        'strategie',
        'Stratégie Patrimoniale Islamique : Gestion de Patrimoine Halal',
        'Construisez une stratégie patrimoniale conforme à la finance islamique : bilan patrimonial, investissements halal, transmission, retraite. CGP indépendant Paris.'
    );
}

export default async function StrategiePage() {
    const page = await getPageBySlug('strategie');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Stratégie patrimoniale islamique', slug: 'strategie' }]);
    const service = buildServiceJsonLd('Stratégie Patrimoniale Islamique', 'Conseil en stratégie patrimoniale personnalisée et conforme à la finance islamique : bilan, investissements halal, transmission.', 'strategie');

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
