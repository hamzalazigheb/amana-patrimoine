import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import SuccessionCalculator from '../../components/SuccessionCalculator';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('succession');
    return buildMetadata(
        page,
        'succession',
        'Préparer sa Succession - Transmission de Patrimoine Conforme',
        'Organisez la transmission de votre patrimoine selon la finance islamique. Assurance-vie, donation, testament : conseil expert à Paris.'
    );
}

export default async function SuccessionPage() {
    const page = await getPageBySlug('succession');

    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Préparer ma succession', slug: 'succession' }]);
    const service = buildServiceJsonLd('Transmission de Patrimoine', 'Conseil en transmission et succession conforme à la finance islamique.', 'succession');

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

    const faqIndex = page.blocks.findIndex(b => b.type === 'faq');
    const insertAt = faqIndex > 0 ? faqIndex : page.blocks.length;
    const blocksBefore = page.blocks.slice(0, insertAt);
    const blocksAfter = page.blocks.slice(insertAt);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <main id="main-content">
                <BlockRenderer blocks={blocksBefore} />
                <SuccessionCalculator />
                <BlockRenderer blocks={blocksAfter} />
            </main>
            <Footer />
        </>
    );
}
