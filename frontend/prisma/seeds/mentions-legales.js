const { createPage } = require('./_helpers');

module.exports = async function seedMentionsLegales(prisma) {
  await createPage(prisma, 'mentions-legales', {
    title: 'Mentions Légales | Amana Patrimoine',
    description: 'Mentions légales et informations sur Amana Patrimoine.',
  }, [
    { type: 'content', content: {
      label: 'Informations Légales',
      title: 'Mentions Légales',
      paragraphs: [
        'Ce site est édité par la société Amana Patrimoine, société par actions simplifiée au capital social de 1000€ dont le siège social est situé 60 RUE FRANCOIS IER, 75008 PARIS en France, immatriculée au registre du commerce et des sociétés de Paris sous le numéro 988458436, immatriculée à l\'ORIAS sous le numéro 25009552 en tant que COA, COBSP, CIF.',
        'Numéro ORIAS : 25009552. Catégories d\'agrément : COA - Conseiller en Opérations d\'Assurance, COBSP - Conseiller en Opérations de Banque et en Services de Paiement, CIF - Conseiller en Investissements Financiers.',
        'Vous pouvez vérifier ces informations sur le site de l\'ORIAS : www.orias.fr',
        'Adresse : 60 RUE FRANCOIS IER, 75008 PARIS, France. RCS : Paris B 988458436. Capital social : 1000€.',
        'Le directeur de la publication est le représentant légal de la société Amana Patrimoine.',
        'Ce site est hébergé par O2Switch.',
      ],
    } },
  ]);
};
