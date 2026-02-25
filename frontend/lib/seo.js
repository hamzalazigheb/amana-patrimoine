const SITE_URL = 'https://amana-patrimoine.fr';
const SITE_NAME = 'Amana Patrimoine';

export function buildMetadata(page, slug, fallbackTitle, fallbackDesc) {
  const title = page?.title || fallbackTitle;
  const description = page?.description || fallbackDesc;
  const url = slug === 'home' ? SITE_URL : `${SITE_URL}/${slug}`;

  return {
    title,
    description,
    keywords: page?.keywords || '',
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      images: [{ url: '/logo10.png', width: 1200, height: 630, alt: `${title} - ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo10.png'],
    },
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}/${item.slug}`,
      })),
    ],
  };
}

export function buildServiceJsonLd(name, description, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { '@type': 'City', name: 'Paris' },
    description,
    url: `${SITE_URL}/${slug}`,
  };
}

export function buildFaqJsonLd(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
