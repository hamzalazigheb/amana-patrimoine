const { createPage } = require('./_helpers');

module.exports = async function seedSuccession(prisma) {
  await createPage(prisma, 'succession', {
    title: 'Préparer sa Succession | Amana Patrimoine',
    description: 'Transmission de patrimoine : donation, assurance-vie, démembrement, testament. Accompagnement conforme à la finance islamique.',
    keywords: 'succession, transmission patrimoine, donation, démembrement, assurance-vie, testament, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Succession & Transmission',
      title: 'Préparer sa succession : transmettre sereinement et intelligemment',
      subtitle: 'Transmettre, c\'est protéger ceux qu\'on aime. C\'est aussi affirmer ses valeurs, au-delà du temps. Trop souvent repoussée, la préparation de la succession est pourtant un acte de prévoyance, de générosité et de responsabilité. Sans anticipation, ce sont la loi et parfois le conflit qui décident à votre place. Chez Amana Patrimoine, nous vous aidons à organiser la transmission de votre patrimoine dans le respect de vos souhaits, de vos convictions et de vos proches.',
      image: '/transmisison.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      title: 'Pourquoi préparer sa succession ?',
      paragraphs: [
        'Ce n\'est pas réservé aux personnes âgées ou fortunées. Préparer sa succession est pertinent dès que vous avez des biens, des enfants, une volonté précise, ou une situation particulière.',
        'Préparer sa succession permet de protéger son conjoint, ses enfants ou d\'autres proches, d\'alléger la fiscalité successorale (qui peut atteindre 45% en ligne directe), de prévenir les conflits familiaux, et de transmettre selon ses valeurs, notamment dans une optique religieuse.',
        'Sans dispositions particulières (testament, donation, assurance-vie), la loi applique une répartition automatique selon le Code civil. Le quotient familial et les droits de succession s\'appliquent pleinement. Certains proches (concubin, beaux-enfants, amis) n\'ont aucun droit, sauf disposition expresse.',
        'Vous avez la liberté d\'organiser jusqu\'à la quotité disponible de votre patrimoine, mais encore faut-il le faire de votre vivant.',
      ],
    } },
    { type: 'tools', content: {
      label: 'Solutions',
      title: 'Quels outils pour organiser sa succession ?',
      items: [
        { title: 'L\'assurance-vie', description: 'L\'assurance-vie est l\'un des meilleurs outils de transmission. Elle permet de transmettre jusqu\'à 152 500 € par bénéficiaire sans droits de succession (si les versements ont été effectués avant 70 ans).', features: ['Hors succession', 'Choix libre des bénéficiaires', 'Fonds éthiques disponibles'] },
        { title: 'La donation', description: 'Donner de son vivant permet de transmettre dans un cadre plus souple et fiscalement avantageux. La donation en pleine propriété permet de transmettre jusqu\'à 100 000 € par enfant tous les 15 ans sans fiscalité.', features: ['Abattements renouvelables', 'Donation simple ou démembrée', 'Biens immobiliers ou financiers'] },
        { title: 'Le démembrement de propriété', description: 'Le démembrement consiste à séparer la nue-propriété et l\'usufruit. Cette technique est très utilisée pour optimiser la transmission.', features: ['Base taxable réduite', 'Conservation de l\'usufruit', 'Reconstitution automatique'] },
        { title: 'Le testament', description: 'Simple à rédiger, le testament permet de désigner des légataires hors succession, d\'organiser une répartition personnalisée, et de faire respecter certaines volontés.', features: ['Répartition personnalisée', 'Legs à des tiers', 'Authentification notariale'] },
        { title: 'La SCI familiale', description: 'Créer une SCI permet de structurer la détention de biens immobiliers, de faciliter la transmission par parts sociales et d\'organiser la gouvernance familiale autour du patrimoine.', features: ['Évite l\'indivision', 'Transmission progressive', 'Gouvernance organisée'] },
      ],
    } },
    { type: 'content', content: {
      label: 'Outils Juridiques',
      title: 'Outils juridiques de la succession',
      steps: [
        { title: 'Le testament', description: 'Le testament permet de répartir librement la quotité disponible entre les héritiers ou des tiers. Il doit respecter la réserve héréditaire et peut se faire sous différentes formes (olographe, authentique).' },
        { title: 'La donation', description: 'La donation permet de transmettre de son vivant une partie de son patrimoine en profitant des abattements fiscaux qui se renouvellent tous les 15 ans.' },
        { title: 'La donation-partage', description: 'La donation-partage combine donation et partage anticipé de l\'héritage entre les héritiers. Elle sécurise la transmission et limite les conflits futurs.' },
        { title: 'Le pacte de famille', description: 'Le pacte de famille permet de figer certaines règles de la succession à l\'avance. Très utilisé pour les transmissions d\'entreprises.' },
        { title: 'Le changement de régime matrimonial', description: 'Le changement de régime matrimonial peut s\'avérer nécessaire pour adapter la succession à la situation familiale.' },
        { title: 'Le mandat de protection future', description: 'Le mandat de protection future anticipe une éventuelle perte d\'autonomie en désignant à l\'avance la personne qui gérera vos biens.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Finance Islamique',
      title: 'Transmettre selon ses convictions',
      paragraphs: [
        'Transmettre, c\'est aussi transmettre des valeurs. Chez Amana Patrimoine, nous vous aidons à choisir des supports respectueux de vos convictions religieuses ou morales, à éviter les placements en contradiction avec vos principes, à prendre en compte les enjeux de justice, de solidarité et de durabilité.',
        'Nous nous entourons de professionnels compétents (notaires, fiscalistes, experts en finance éthique) pour vous accompagner dans l\'organisation de votre succession, en respectant à la fois le droit français et vos valeurs personnelles.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Pourquoi préparer sa succession dès 50 ans ?', answer: 'Le droit français prévoit des abattements sur les donations qui se renouvellent tous les 15 ans. Anticiper permet de \'purger\' la fiscalité plusieurs fois de son vivant, économisant potentiellement des centaines de milliers d\'euros à vos héritiers. Plus vous commencez tôt, plus vous pouvez transmettre sans fiscalité.' },
      { question: 'Comment respecter mes convictions religieuses tout en restant conforme au droit français ?', answer: 'Nous utilisons des outils juridiques comme le testament olographe ou authentique et les clauses bénéficiaires démembrées pour que la répartition de vos biens respecte vos volontés profondes tout en restant strictement légale au regard du droit français.' },
      { question: 'Qu\'en est-il de l\'assurance-vie après 70 ans ?', answer: 'Après 70 ans, le cadre fiscal change mais reste avantageux : un abattement global de 30 500 € s\'applique sur les primes versées (tous bénéficiaires confondus), et les plus-values sont totalement exonérées de droits de succession. L\'assurance-vie reste donc un outil intéressant même après 70 ans.' },
    ] } },
    { type: 'reassurance', content: { items: [
      { title: 'Conseil expert', description: 'Accompagnement par nos experts patrimoniaux et financiers.' },
      { title: 'Sur-mesure', description: 'Un suivi personnalisé pour atteindre vos objectifs.' },
      { title: 'Secret professionnel', description: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de votre succession',
      subtitle: 'Vous ne savez pas par où commencer ? Vous avez une situation complexe ou des volontés précises ?',
      description: 'Contactez-nous pour un échange confidentiel, gratuit et sans engagement. Nous vous aiderons à bâtir une stratégie de transmission sereine, légale et alignée avec vos valeurs.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
