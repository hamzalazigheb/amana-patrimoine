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
      images: [{ url: `${SITE_URL}/logo10.png`, width: 1200, height: 630, alt: `${title} - ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/logo10.png`],
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

const STATIC_FAQS = {
  immobilier: [
    { question: 'Comment investir dans l\'immobilier en conformité avec la finance islamique ?', answer: 'La finance islamique permet l\'investissement immobilier via SCPI halal, financement Mourabaha ou Musharaka, et investissement locatif direct. Amana Patrimoine vous guide vers des solutions certifiées Shariah Compliant.' },
    { question: 'Qu\'est-ce qu\'une SCPI halal ?', answer: 'Une SCPI halal est une Société Civile de Placement Immobilier dont les actifs et modes de financement sont validés par un comité charia (Shariah Board). Elle exclut toute dette bancaire avec intérêts et les secteurs interdits.' },
    { question: 'Quel est le ticket d\'entrée pour investir en SCPI ?', answer: 'Les SCPI halal sont accessibles avec un ticket d\'entrée modéré et des versements mensuels programmés, permettant à chacun d\'investir progressivement dans l\'immobilier professionnel.' },
  ],
  retraite: [
    { question: 'Qu\'est-ce qu\'un PER éthique conforme à la finance islamique ?', answer: 'Un PER éthique investit uniquement sur des supports Shariah Compliant : fonds actions excluant les secteurs interdits, SCPI sans dette bancaire. Tous sont validés par des Shariah Boards reconnus.' },
    { question: 'Puis-je retirer mon capital avant la retraite ?', answer: 'Le PER bloque le capital jusqu\'à la retraite, sauf pour l\'achat de la résidence principale ou accident de vie. L\'assurance-vie est totalement liquide à tout moment.' },
    { question: 'L\'avantage fiscal du PER est-il immédiat ?', answer: 'Oui, les versements sont déductibles de vos revenus imposables dès l\'année du versement. Pour une tranche à 30%, verser 10 000 € génère 3 000 € d\'économie d\'impôt l\'année suivante.' },
  ],
  investissement: [
    { question: 'Qu\'est-ce qu\'un investissement éthique en finance islamique ?', answer: 'Un investissement éthique en finance islamique exclut l\'intérêt (riba), les secteurs interdits (alcool, armement, jeux) et privilégie l\'économie réelle. Il est validé par un Shariah Board reconnu.' },
    { question: 'Quels sont les supports d\'investissement conformes disponibles ?', answer: 'Les supports conformes incluent : SCPI halal, fonds actions ISR/Shariah, assurance-vie sur unités de compte éthiques, investissement immobilier direct. Amana Patrimoine sélectionne des partenaires certifiés.' },
  ],
  enfants: [
    { question: 'À quel âge ouvrir un contrat d\'épargne pour mon enfant ?', answer: 'Idéalement dès la naissance. Plus tôt le contrat est ouvert, plus vous bénéficiez de la capitalisation sur 18 ans et de l\'antériorité fiscale de l\'assurance-vie (avantages après 8 ans de détention).' },
    { question: 'Est-ce que l\'argent versé appartient à l\'enfant ?', answer: 'Oui, les fonds versés sur un contrat au nom d\'un mineur lui appartiennent. Les parents en assurent la gestion légale jusqu\'à sa majorité. Une clause de pacte adjoint peut encadrer l\'âge de disponibilité.' },
    { question: 'Comment garantir que l\'épargne est conforme à la finance islamique ?', answer: 'Nous sélectionnons uniquement des supports Shariah Compliant certifiés par des comités charia reconnus, excluant l\'armement, le tabac, l\'alcool et la spéculation bancaire.' },
  ],
  succession: [
    { question: 'Comment transmettre son patrimoine en respectant les règles islamiques ?', answer: 'La transmission islamique repose sur les règles de la Faraïd (partage successoral coranique) complétées par des outils civils français comme l\'assurance-vie, la SCI ou la donation. Amana Patrimoine vous accompagne pour concilier droit français et droit musulman.' },
    { question: 'L\'assurance-vie est-elle compatible avec la succession islamique ?', answer: 'L\'assurance-vie sort de la succession civile française et permet de désigner librement des bénéficiaires. Elle doit être utilisée avec discernement pour ne pas contrevenir aux règles de la Faraïd. Nous vous conseillons sur un arbitrage équilibré.' },
    { question: 'Qu\'est-ce que la donation et comment l\'utiliser en finance islamique ?', answer: 'La donation permet de transmettre de son vivant en bénéficiant d\'abattements fiscaux renouvelables tous les 15 ans. Elle doit respecter l\'équité entre héritiers telle que préconisée par les principes islamiques.' },
  ],
  strategie: [
    { question: 'Qu\'est-ce qu\'une stratégie patrimoniale globale ?', answer: 'Une stratégie patrimoniale globale analyse l\'ensemble de vos actifs, revenus, dettes et objectifs (retraite, transmission, investissement) pour définir un plan d\'action cohérent et optimisé sur le long terme.' },
    { question: 'Pourquoi faire appel à un conseiller en gestion de patrimoine indépendant ?', answer: 'Un CGP indépendant n\'est lié à aucun établissement financier, ce qui lui permet de sélectionner objectivement les meilleures solutions du marché. Amana Patrimoine est enregistré à l\'ORIAS et adhère aux standards de la profession.' },
    { question: 'La finance islamique est-elle accessible à tous les profils ?', answer: 'Oui. Que vous soyez salarié, entrepreneur, ou proche de la retraite, des solutions conformes existent à chaque étape de vie. Nos conseillers adaptent la stratégie à votre profil, vos objectifs et vos convictions.' },
  ],
  'reduire-impots': [
    { question: 'Quels sont les principaux dispositifs de réduction d\'impôt disponibles ?', answer: 'Les principaux dispositifs incluent le PER (déduction des versements), l\'investissement immobilier (déficit foncier, Malraux), l\'assurance-vie, et les dons aux associations. Certains sont compatibles avec la finance islamique.' },
    { question: 'Le PER permet-il vraiment de réduire ses impôts ?', answer: 'Oui, les versements volontaires sur un PER sont déductibles de votre revenu imposable dans la limite d\'un plafond annuel. Pour une tranche à 41%, verser 5 000 € génère 2 050 € d\'économie d\'impôt.' },
    { question: 'Comment optimiser sa fiscalité en respectant la finance islamique ?', answer: 'Les solutions compatibles incluent : le PER sur supports Shariah Compliant, l\'investissement en SCPI halal (déficit foncier), la donation à des associations caritatives islamiques (réduction IR jusqu\'à 75%), et la structuration via SCI.' },
  ],
};

export function buildFaqJsonLd(faqItems, slug) {
  const items = faqItems && faqItems.length > 0 ? faqItems : (slug ? STATIC_FAQS[slug] : null);
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * B3 — BlogPosting schema for blog articles
 */
export function buildBlogPostingJsonLd({ title, description, slug, createdAt, updatedAt, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description || '',
    url: `${SITE_URL}/blog/${slug}`,
    image: image ? `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}` : `${SITE_URL}/logo10.png`,
    datePublished: createdAt || new Date().toISOString(),
    dateModified: updatedAt || createdAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Mohamed Mosbahi',
      url: `${SITE_URL}/qui-sommes-nous`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo10.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}

/**
 * C2 — AggregateRating for the organization
 */
export function buildAggregateRatingJsonLd({ ratingValue = 5, ratingCount = 47, bestRating = 5 } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: '+33189700000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      ratingCount: String(ratingCount),
      bestRating: String(bestRating),
      worstRating: '1',
    },
  };
}
