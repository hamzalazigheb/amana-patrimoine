const { createPage } = require('./_helpers');

module.exports = async function seedQuiSommesNous(prisma) {
  await createPage(prisma, 'qui-sommes-nous', {
    title: 'Qui sommes-nous | Amana Patrimoine',
    description: 'Découvrez l\'équipe d\'Amana Patrimoine : des experts en gestion de patrimoine et finance islamique.',
    keywords: 'Amana Patrimoine, équipe, Mohamed Mosbahi, Yanis Mahmoud, finance islamique, Paris',
  }, [
    { type: 'founders', content: {
      label: 'Nos Fondateurs',
      background: '/Site 39.png',
      items: [
        {
          name: 'Mohamed Mosbahi',
          role: 'Co-Fondateur et Président',
          image: '/mohamedF.webp',
          description: 'Président d\'Amana Patrimoine, Mohamed bénéficie de plus de 15 ans d\'expérience en gestion de patrimoine, au cours desquels il a développé une expertise approfondie dans la compréhension et la réponse aux besoins patrimoniaux complexes de ses clients. Son parcours l\'a conduit à conseiller une clientèle variée, comprenant des TNS, des particuliers, des chefs d\'entreprise, des professionnels de santé et des sportifs de haut niveau, lui permettant aujourd\'hui d\'identifier rapidement les besoins spécifiques de chacun.\n\nTitulaire d\'un certificat et d\'un EMBA en finance islamique, la solide expérience de Mohamed et ses connaissances théoriques font de lui un atout majeur dans l\'univers de la gestion de patrimoine islamique et participative.\n\nConscient de la nécessité d\'un service dédié et à forte valeur ajoutée, Mohamed a initié la création d\'Amana Patrimoine, avec l\'ambition de fonder un cabinet qui place la confiance, la transparence, et l\'éthique islamique au coeur de son accompagnement.',
        },
        {
          name: 'Yanis Mahmoud',
          role: 'Co-Fondateur et CGP',
          image: '/YanisF.webp',
          description: 'Yanis est titulaire d\'une licence d\'économie de la Sorbonne, d\'un master PGE et d\'un certificat en finance islamique de la Financia Business School. Co-producteur du podcast « Parlons Finance Islamique » sur YouTube, Yanis anime des échanges avec des professionnels du secteur, enrichissant ainsi la réflexion collective autour des enjeux et des innovations de la finance islamique.\n\nDiplômé en 2024 avec une majeure en finance d\'entreprise et quelques expériences en audit financier et private equity, Yanis s\'est rapidement intéressé à la finance islamique, et a développé un attrait naturel pour la gestion de patrimoine lors de sa rencontre avec Mohamed à l\'Islamic Finance Summer School de la Durham University.\n\nFormé dès 2024 à la gestion de patrimoine, Yanis met aujourd\'hui toute son expertise au service des clients d\'Amana Patrimoine, avec un engagement profond pour une gestion de patrimoine honnête, responsable et conforme aux principes de la finance islamique.',
        },
      ],
    } },
    { type: 'content', content: {
      label: 'Carrières',
      title: 'Rejoignez Amana Patrimoine',
      paragraphs: [
        'Le succès d\'un cabinet repose avant tout sur ses talents, et les valeurs partagées. Pour cette raison, Amana Patrimoine est toujours à l\'écoute des candidatures qui souhaitent rejoindre une équipe experte, passionnée et dédiée à une gestion patrimoniale humaine et conforme aux principes de la finance islamique et participative.',
      ],
    } },
    { type: 'cta', content: {
      title: 'Rencontrez notre équipe',
      subtitle: 'Vous souhaitez échanger avec nos experts en gestion de patrimoine et finance islamique ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
