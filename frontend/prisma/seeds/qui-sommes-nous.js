const { createPage } = require('./_helpers');

module.exports = async function seedQuiSommesNous(prisma) {
  await createPage(prisma, 'qui-sommes-nous', {
    title: 'Qui sommes-nous - Cabinet de Gestion de Patrimoine Islamique',
    description: 'Découvrez l\'équipe d\'Amana Patrimoine : des experts en gestion de patrimoine et finance islamique à Paris. Mohamed Mosbahi, fondateur et président du cabinet.',
    keywords: 'Amana Patrimoine équipe, Mohamed Mosbahi, CGP finance islamique, cabinet gestion patrimoine Paris, conseil patrimonial islamique',
  }, [
    { type: 'pageHero', content: {
      badge: 'Notre Cabinet',
      title: 'Un cabinet indépendant au service de votre patrimoine',
      subtitle: 'Amana Patrimoine est né d\'une conviction simple : chaque investisseur mérite un conseil honnête, transparent et en accord avec ses valeurs. Notre cabinet accompagne les particuliers et entrepreneurs dans la construction d\'un patrimoine durable, performant et conforme aux principes de la finance islamique.',
      image: '/bureau-amana.jpeg',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'founders', content: {
      label: 'Notre Fondateur',
      items: [
        {
          name: 'Mohamed Mosbahi',
          role: 'Fondateur et Président',
          image: '/mohamedF.webp',
          description: 'Président d\'Amana Patrimoine, Mohamed bénéficie de plus de 15 ans d\'expérience en gestion de patrimoine, au cours desquels il a développé une expertise approfondie dans la compréhension et la réponse aux besoins patrimoniaux complexes de ses clients. Son parcours l\'a conduit à conseiller une clientèle variée, comprenant des TNS, des particuliers, des chefs d\'entreprise, des professionnels de santé et des sportifs de haut niveau, lui permettant aujourd\'hui d\'identifier rapidement les besoins spécifiques de chacun.\n\nTitulaire d\'un certificat et d\'un EMBA en finance islamique, la solide expérience de Mohamed et ses connaissances théoriques font de lui un atout majeur dans l\'univers de la gestion de patrimoine islamique et participative.\n\nConscient de la nécessité d\'un service dédié et à forte valeur ajoutée, Mohamed a initié la création d\'Amana Patrimoine, avec l\'ambition de fonder un cabinet qui place la confiance, la transparence, et l\'éthique islamique au coeur de son accompagnement.',
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
