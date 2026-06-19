const { createPage } = require('./_helpers');

module.exports = async function seedLivresBlancs(prisma) {
  await createPage(prisma, 'livres-blancs', {
    title: 'Livres blancs — Guides patrimoine & finance islamique',
    description: 'Recevez gratuitement nos livres blancs par e-mail : investissement halal, Zakat, transmission patrimoniale et bilan patrimonial islamique. Ressources pédagogiques par Amana Patrimoine.',
    keywords: 'livre blanc patrimoine, guide finance islamique PDF, investissement halal guide, zakat guide, transmission patrimoine islamique',
  }, [
    { type: 'pageHero', content: {
      badge: 'Ressources',
      title: 'Nos livres blancs',
      subtitle: 'Nous aimons partager notre savoir de la manière la plus claire possible. Recevez nos guides pratiques par e-mail sur la gestion de patrimoine et la finance islamique.',
      image: '/bureau-amana.jpeg',
    } },
    { type: 'whitepapers', content: {
      sectionTitle: 'Choisissez votre guide',
      sectionDescription: 'Des contenus structurés, rédigés par nos conseillers, pour vous aider à avancer sereinement dans vos projets patrimoniaux.',
      items: [
        {
          id: 'investissement-halal',
          image: '/edu-heritage.png',
          title: "Guide de l'investissement halal",
          subtitle: 'SCPI, PER, assurance-vie : ce qu\'il faut savoir pour investir en conformité',
          pdfFile: '/downloads/guide-investissement-halal.pdf',
        },
        {
          id: 'zakat-patrimoine',
          image: '/transmisison.png',
          title: 'Zakat & purification du patrimoine',
          subtitle: 'Méthode de calcul, assiette zakatable et bonnes pratiques',
          pdfFile: '/downloads/guide-zakat-patrimoine.pdf',
        },
        {
          id: 'transmission-succession',
          image: '/edu-paris.png',
          title: 'Transmission & succession',
          subtitle: 'Transmettre son patrimoine en accord avec vos convictions',
          pdfFile: '/downloads/guide-transmission-succession.pdf',
        },
        {
          id: 'bilan-patrimonial',
          image: '/bureau-amana.jpeg',
          title: 'Bilan patrimonial islamique',
          subtitle: 'Structurer vos projets de vie et optimiser votre patrimoine',
          pdfFile: '/downloads/guide-bilan-patrimonial.pdf',
        },
      ],
      form: {
        title: 'Recevez vos livres blancs',
        description: 'Remplissez le formulaire ci-dessous : le ou les guide(s) sélectionné(s) vous seront envoyés par e-mail.',
        submitLabel: 'Envoyer ma demande',
        cardCtaLabel: 'Recevoir le guide',
        successTitle: 'Merci pour votre demande',
        successMessage: 'Le(s) guide(s) sélectionné(s) vous seront envoyés par e-mail sous 24 à 48 h. Pensez à vérifier vos spams.',
        projectOptions: [
          { value: 'bilan', label: 'Bilan patrimonial' },
          { value: 'investissement', label: 'Investissement halal' },
          { value: 'zakat', label: 'Zakat & purification' },
          { value: 'retraite', label: 'Retraite / PER halal' },
          { value: 'succession', label: 'Succession & transmission' },
          { value: 'fiscalite', label: 'Optimisation fiscale' },
          { value: 'autre', label: 'Autre demande' },
        ],
        newsletterLabel: 'Je souhaite recevoir les communications d\'Amana Patrimoine',
      },
    } },
    { type: 'cta', content: {
      title: 'Un projet patrimonial ?',
      subtitle: 'Échangez en toute confidentialité avec un conseiller spécialisé en finance islamique.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
