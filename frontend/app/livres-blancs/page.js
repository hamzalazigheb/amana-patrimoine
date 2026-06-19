export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import Breadcrumb from '../../components/Breadcrumb';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPageBySlug('livres-blancs');
  return buildMetadata(
    page,
    'livres-blancs',
    'Livres blancs — Guides patrimoine & finance islamique',
    'Recevez gratuitement nos livres blancs par e-mail : investissement halal, Zakat, transmission et bilan patrimonial islamique.'
  );
}

export default async function LivresBlancsPage() {
  const page = await getPageBySlug('livres-blancs');
  const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Livres blancs', slug: 'livres-blancs' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <Breadcrumb items={[{ name: 'Livres blancs', href: '/livres-blancs' }]} />
      <main id="main-content">
        {page ? (
          <BlockRenderer blocks={page.blocks} />
        ) : (
          <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <p>Contenu en cours de chargement…</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
