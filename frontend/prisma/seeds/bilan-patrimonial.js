const { createPage } = require('./_helpers');

module.exports = async function seedBilanPatrimonial(prisma) {
  await createPage(prisma, 'bilan-patrimonial', {
    title: 'Bilan Patrimonial Gratuit : Évaluez et Optimisez votre Patrimoine',
    description: 'Bilan patrimonial gratuit à Paris avec un CGP indépendant. Analyse complète : actifs, fiscalité, retraite, succession. Finance islamique. Premier RDV sans engagement.',
    keywords: 'bilan patrimonial, bilan patrimonial gratuit, bilan patrimoine Paris, CGP indépendant, analyse patrimoine, bilan financier islamique',
  }, [
    { type: 'pageHero', content: {
      badge: 'Bilan Patrimonial',
      title: 'Bilan patrimonial gratuit : faites le point sur votre situation',
      subtitle: 'Le bilan patrimonial est la première étape pour prendre les bonnes décisions financières. En 1h30 d\'échange confidentiel, nous analysons votre situation complète et identifions les leviers d\'optimisation : fiscal, immobilier, retraite, transmission, et conformité islamique.',
      image: '/bureau-amana.jpeg',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Définition',
      title: 'Qu\'est-ce qu\'un bilan patrimonial ?',
      paragraphs: [
        'Un bilan patrimonial est un audit complet de votre situation financière, fiscale et personnelle. Il permet de dresser une photographie précise de votre patrimoine à un instant T : vos actifs (immobilier, épargne, placements, entreprise), vos passifs (emprunts, dettes), vos revenus, votre imposition, votre situation familiale et vos objectifs à court, moyen et long terme.',
        'À partir de cette analyse, votre conseiller en gestion de patrimoine peut identifier les forces et les faiblesses de votre situation, détecter les opportunités d\'optimisation (fiscale, de rendement, de transmission), et construire avec vous une stratégie patrimoniale cohérente et personnalisée.',
        'Le bilan patrimonial n\'est pas réservé aux personnes fortunées. Il est pertinent dès que vous avez des projets (achat immobilier, retraite, transmission), des revenus à optimiser, ou simplement l\'envie de mieux comprendre et piloter votre patrimoine.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Déroulement',
      title: 'Comment se déroule un bilan patrimonial chez Amana Patrimoine ?',
      steps: [
        { title: 'Prise de rendez-vous', description: 'Le premier rendez-vous est gratuit, sans engagement et confidentiel. Il dure entre 1h et 1h30. Il peut se tenir en présentiel dans nos locaux parisiens ou en visioconférence, selon votre préférence.' },
        { title: 'Collecte des informations', description: 'Nous vous demandons de préparer quelques documents : derniers avis d\'imposition, relevés de comptes épargne, contrats d\'assurance-vie ou PER, titres de propriété, bulletins de salaire récents. Cela nous permet d\'être précis dès le premier échange.' },
        { title: 'Analyse complète', description: 'Votre conseiller analyse en détail votre situation : composition et valeur du patrimoine, fiscalité actuelle (IR, IFI, prélèvements sociaux), revenus et dépenses, couverture prévoyance, préparation retraite, organisation successorale, conformité islamique si souhaité.' },
        { title: 'Identification des enjeux', description: 'Nous identifions les forces de votre situation (actifs bien positionnés, optimisations déjà en place) et les axes d\'amélioration (sur-imposition, lacunes en transmission, placements sous-optimaux, conformité islamique incomplète).' },
        { title: 'Présentation des recommandations', description: 'À l\'issue du bilan, nous vous présentons un plan d\'action concret, chiffré et priorisé. Chaque recommandation est expliquée clairement, avec les solutions proposées, les impacts attendus et les prochaines étapes.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Domaines',
      title: 'Les 6 dimensions analysées lors du bilan patrimonial',
      steps: [
        { title: 'Patrimoine et allocation d\'actifs', description: 'Inventaire complet de vos actifs : immobilier (résidence principale, locatif, SCPI), épargne (livrets, PEL, assurance-vie, PER), investissements financiers (actions, obligations, fonds), entreprise (si applicable). Analyse de la diversification, des risques et des performances.' },
        { title: 'Fiscalité', description: 'Analyse de votre imposition actuelle (tranches marginales IR, IFI, prélèvements sociaux sur les revenus du capital). Identification des leviers de réduction fiscale : PER, immobilier déficit foncier, LMNP, dons, PME. Optimisation de la fiscalité des revenus patrimoniaux.' },
        { title: 'Retraite', description: 'Estimation de votre future pension (régime général, complémentaire, TNS). Calcul du gap entre vos revenus actuels et votre future retraite. Recommandations pour combler ce gap : PER, assurance-vie, immobilier locatif, SCPI.' },
        { title: 'Prévoyance et protection', description: 'Analyse de votre couverture en cas d\'arrêt de travail, d\'invalidité ou de décès. Vérification de l\'adéquation de vos contrats prévoyance et de votre couverture santé. Protection du conjoint et des enfants.' },
        { title: 'Transmission et succession', description: 'Analyse de votre situation successorale : héritiers, dévolution légale, fiscalité successorale estimée. Recommandations pour optimiser la transmission : assurance-vie (152 500 €/bénéficiaire), donations (100 000 €/enfant tous les 15 ans), démembrement, SCI.' },
        { title: 'Conformité islamique', description: 'Pour les clients souhaitant une gestion conforme à la finance islamique : audit des placements existants (riba ? secteurs haram ?), identification des ajustements nécessaires, calcul indicatif de la Zakat, recommandations de solutions halal alternatives.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Le bilan patrimonial est-il vraiment gratuit ?', answer: 'Oui. Le premier rendez-vous de bilan patrimonial est entièrement gratuit, sans engagement de votre part. C\'est notre manière de vous permettre de nous découvrir et d\'évaluer la valeur de notre accompagnement avant toute décision. Si vous souhaitez aller plus loin, nous vous présenterons les conditions de notre accompagnement lors du rendez-vous.' },
      { question: 'À quelle fréquence doit-on faire un bilan patrimonial ?', answer: 'Nous recommandons un bilan patrimonial complet tous les 2 à 3 ans, ou à chaque événement majeur : mariage, naissance, achat immobilier, héritage, changement de situation professionnelle, approche de la retraite. Pour nos clients accompagnés, nous effectuons un point annuel de suivi patrimonial.' },
      { question: 'Quelle est la différence avec un rendez-vous bancaire ?', answer: 'Un conseiller bancaire est salarié de sa banque et ne peut vous proposer que ses produits maison. Un CGP (Conseiller en Gestion de Patrimoine) indépendant comme Amana Patrimoine travaille avec l\'ensemble du marché et peut vous recommander les solutions les mieux adaptées, sans conflit d\'intérêts. De plus, notre spécialisation en finance islamique est unique.' },
      { question: 'Faut-il apporter des documents au premier rendez-vous ?', answer: 'Ce n\'est pas obligatoire pour le premier contact, mais avoir quelques éléments facilite l\'analyse : dernier avis d\'imposition, relevé de vos placements principaux, contrat de travail ou statuts si vous êtes entrepreneur. Plus vous êtes préparé, plus le rendez-vous sera productif.' },
    ] } },
    { type: 'cta', content: {
      title: 'Prenez rendez-vous pour votre bilan patrimonial gratuit',
      subtitle: 'En 1h30 d\'échange confidentiel, faites le point sur votre situation et identifiez les leviers d\'optimisation.',
      description: 'Premier rendez-vous gratuit, sans engagement. En présentiel à Paris ou en visioconférence.',
      ctaText: 'Réserver mon bilan gratuit',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
