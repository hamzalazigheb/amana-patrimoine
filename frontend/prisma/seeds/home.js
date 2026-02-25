const { createPage } = require('./_helpers');

module.exports = async function seedHome(prisma) {
  await createPage(prisma, 'home', {
    title: 'Amana Patrimoine - Conseil en Gestion de Patrimoine et Finance Islamique | Paris',
    description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Investissement, retraite, transmission. Paris et Île-de-France.',
    keywords: 'gestion patrimoine, conseil patrimonial, finance islamique, investissement halal, SCPI halal, PER conforme, Paris',
  }, [
    { type: 'hero', content: {
      title: 'Conseil en gestion de patrimoine et finance islamique',
      subtitle: '15 ans d\'expérience pour construire une stratégie patrimoniale sur-mesure, en accord avec vos convictions',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
      backgroundImage: '/Design sans titre (1) (1).png',
    } },
    { type: 'intro', content: {
      paragraphs: [
        'Amana Patrimoine est un cabinet de conseil en gestion de patrimoine, spécialisé en finance islamique. Nous accompagnons les particuliers, entrepreneurs et cadres dans la gestion et l\'optimisation de leur patrimoine.',
        'Notre approche repose sur trois piliers : indépendance totale dans le choix des solutions, transparence sur les frais et la stratégie, conformité stricte aux principes de la finance islamique.',
        'Que vous souhaitiez préparer votre retraite, investir dans l\'immobilier, optimiser votre fiscalité ou organiser votre succession, nous construisons avec vous une stratégie patrimoniale cohérente et durable.',
      ],
    } },
    { type: 'trust', content: {
      title: 'Pourquoi choisir Amana Patrimoine ?',
      items: [
        { title: '15 ans d\'expérience en gestion de patrimoine et finance islamique', description: 'Une expertise reconnue pour vous accompagner sur tous vos projets patrimoniaux, de l\'investissement à la transmission. Certification AMF et diplôme en finance islamique.' },
        { title: 'Un accompagnement sur-mesure avec un interlocuteur unique', description: 'Nous prenons le temps de comprendre votre situation, vos objectifs et vos contraintes pour vous proposer une stratégie vraiment adaptée. Un seul conseiller centralise l\'ensemble de vos démarches.' },
        { title: 'Une indépendance totale vis-à-vis des établissements financiers', description: 'Aucun lien capitalistique avec nos partenaires, ce qui nous permet de sélectionner les meilleures solutions pour vous, sans conflit d\'intérêts. Notre priorité : votre satisfaction.' },
        { title: 'Une transparence absolue sur les frais et la gestion', description: 'Vous savez exactement où va votre argent et comment votre stratégie évolue. Clarté totale sur les frais, les placements et les rapports de gestion.' },
      ],
    } },
    { type: 'services', content: {
      title: 'Nos domaines d\'expertise',
      description: 'Nous intervenons sur l\'ensemble des problématiques patrimoniales, avec une spécialisation en finance islamique et une approche globale de votre situation.',
      items: [
        { title: 'Stratégie patrimoniale', description: 'Construire une vision d\'ensemble de votre patrimoine. Nous réalisons un bilan complet de votre situation (actifs, passifs, revenus, fiscalité) pour définir une stratégie cohérente qui répond à vos objectifs de vie.', link: '/strategie' },
        { title: 'Investissement immobilier', description: 'Investir dans la pierre, en direct ou via des SCPI conformes aux normes de finance islamique. Location meublée (LMNP), déficit foncier, dispositifs fiscaux (Pinel, Malraux), SCPI sans dette bancaire : nous vous accompagnons sur tous les montages immobiliers.', link: '/immobilier' },
        { title: 'Préparation de la retraite', description: 'Anticiper votre retraite avec des solutions d\'épargne performantes et éthiques. Plan d\'épargne retraite (PER), assurance-vie, SCPI : nous construisons un complément de revenus qui vous permettra de maintenir votre niveau de vie.', link: '/retraite' },
        { title: 'Transmission et fiscalité', description: 'Transmettre votre patrimoine dans les meilleures conditions et réduire légalement vos impôts. Donation, démembrement, assurance-vie, optimisation IFI : nous organisons votre succession et votre fiscalité en respectant vos valeurs.', link: '/succession' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      title: 'Finance islamique : notre spécialité',
      paragraphs: [
        'Tous nos investissements sont conformes aux principes de la finance islamique. Cela signifie : exclusion totale des intérêts (riba), pas d\'investissement dans les secteurs interdits (alcool, armement, banques conventionnelles, jeux de hasard), validation par des comités charia reconnus.',
        'Nos conseillers sont formés à la finance islamique et au fiqh al-mu\'amalat (droit musulman des transactions). Nous pouvons également vous accompagner sur le calcul de la Zakat, un pilier de l\'islam qui peut s\'avérer complexe quand le patrimoine est diversifié.',
        'Cette approche éthique ne compromet pas la performance. Au contraire, elle permet d\'investir dans l\'économie réelle, sur des actifs tangibles, avec une vision de long terme.',
      ],
    } },
    { type: 'methodology', content: {
      title: 'Comment ça marche ?',
      steps: [
        { title: 'Premier contact gratuit', description: 'Un échange confidentiel pour comprendre votre situation, vos projets et vos contraintes. Aucun engagement de votre part.' },
        { title: 'Bilan patrimonial complet', description: 'Nous analysons en détail vos actifs, vos revenus, votre fiscalité et vos objectifs pour identifier les leviers d\'optimisation.' },
        { title: 'Stratégie sur-mesure', description: 'Nous vous présentons une stratégie claire, chiffrée, adaptée à votre profil. Vous décidez, nous mettons en œuvre.' },
        { title: 'Suivi régulier', description: 'Votre vie évolue, votre stratégie aussi. Nous restons à vos côtés pour adapter votre patrimoine à chaque étape.' },
      ],
    } },
    { type: 'partners', content: {
      title: 'Des partenariats stratégiques avec les acteurs incontournables du secteur',
      description: 'Nous travaillons avec des établissements financiers et patrimoniaux de premier plan : Suravenir, Vie Plus, HSBC, Franklin Templeton, Comgest, Norma Capital, SBSC. Ces partenariats nous permettent de vous proposer des solutions performantes, sans pour autant compromettre notre indépendance de conseil.',
      items: [
        { name: 'SURAVENIR', logo: '/logo-2025.svg' },
        { name: 'VIE PLUS', logo: '/logo-vieplus.png' },
        { name: 'HSBC', logo: '/hsbc-logo-200x25.svg' },
        { name: 'FRANKLIN TEMPLETON', logo: '/FT_logo_pos_RGB@2x.png' },
        { name: 'COMGEST', logo: '/logo--color.svg' },
        { name: 'NORMA CAPITAL', logo: '/norma.png' },
        { name: 'SBSC', logo: '/SBSC.avif' },
      ],
    } },
    { type: 'education', content: {
      title: 'Nos ressources pédagogiques',
      description: 'Découvrez prochainement nos guides, livres blancs et analyses pour approfondir vos connaissances en gestion de patrimoine et finance islamique.',
      items: [
        { image: '/edu-heritage.png', tag: 'Livre Blanc', title: 'Bientôt disponible' },
        { image: '/edu-paris.png', tag: 'Analyse', title: 'Bientôt disponible' },
        { image: '/transmisison.png', tag: 'Guide', title: 'Bientôt disponible' },
      ],
    } },
    { type: 'cta', content: {
      title: 'Planifier un entretien',
      subtitle: 'Rencontrez un de nos experts pour une analyse discrète et rigoureuse de vos besoins patrimoniaux. Aucun engagement n\'est requis.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
