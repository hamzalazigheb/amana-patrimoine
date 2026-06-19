const { createPage } = require('./_helpers');

module.exports = async function seedNosActualites(prisma) {
  await createPage(prisma, 'nos-actualites', {
    title: 'Nos actualités — Vidéos & conseils patrimoine',
    description: 'Retrouvez les dernières vidéos d\'Amana Patrimoine : finance islamique, investissement halal, Zakat, transmission et gestion de patrimoine.',
    keywords: 'actualités patrimoine, vidéos finance islamique, YouTube Amana Patrimoine, conseils investissement halal',
  }, [
    { type: 'pageHero', content: {
      badge: 'Actualités',
      title: 'Nos actualités',
      subtitle: 'Vidéos, analyses et conseils sur la gestion de patrimoine et la finance islamique. Abonnez-vous à notre chaîne YouTube pour ne rien manquer.',
      image: '/bureau-amana.jpeg',
    } },
    { type: 'actualites', content: {
      sectionTitle: 'Notre dernière vidéo',
      sectionDescription: 'Conseils et analyses sur la gestion de patrimoine et la finance islamique.',
      items: [],
      articlesSectionTitle: 'Presse & informations',
      articlesSectionDescription: 'Retrouvez nos interventions médias et articles sur la finance islamique et la gestion de patrimoine.',
      articles: [
        {
          tag: 'Presse',
          title: 'Amana Patrimoine, le cabinet de référence en finance islamique',
          description: 'Découvrez notre approche de la gestion de patrimoine conforme aux principes de la Charia.',
          url: 'https://www.example.com/article-presse',
          linkLabel: 'Lire la suite',
        },
        {
          tag: 'Information',
          title: 'Comprendre l\'investissement halal en France',
          description: 'Panorama des solutions disponibles : SCPI, PER, assurance-vie et actions conformes.',
          url: '/blog/guide-investissement-halal',
          linkLabel: 'Lire la suite',
        },
      ],
    } },
    { type: 'cta', content: {
      title: 'Une question sur votre patrimoine ?',
      subtitle: 'Échangez en toute confidentialité avec un conseiller spécialisé.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
