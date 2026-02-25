const { createPage } = require('./_helpers');

module.exports = async function seedStrategie(prisma) {
  await createPage(prisma, 'strategie', {
    title: 'Construire sa Stratégie Patrimoniale | Amana Patrimoine',
    description: 'Construisez une stratégie patrimoniale cohérente, durable et personnalisée, en parfaite adéquation avec vos aspirations.',
    keywords: 'stratégie patrimoniale, gestion patrimoine, bilan patrimonial, conseil patrimoine Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Stratégie Patrimoniale',
      title: 'Construire sa stratégie patrimoniale : une vision globale pour un avenir maîtrisé',
      subtitle: 'Votre patrimoine mérite mieux qu\'une série de produits empilés au hasard. Construire une stratégie patrimoniale, c\'est organiser ses finances de manière cohérente, durable et personnalisée, en fonction de ses objectifs de vie. Chez Amana Patrimoine, nous pensons que la bonne stratégie n\'est ni celle du banquier ni celle du voisin, mais celle qui respecte votre histoire, vos valeurs et vos ambitions.',
      image: '/bureau-amana.jpeg',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      title: 'Pourquoi construire une stratégie patrimoniale ?',
      paragraphs: [
        'Parce que votre patrimoine est un tout : il doit être pensé comme un système cohérent, pas comme une addition d\'investissements isolés.',
        'Une stratégie patrimoniale vous permet de donner un cap clair à vos décisions financières, d\'aligner vos choix d\'investissement avec vos objectifs (retraite, transmission, revenus complémentaires), de protéger votre famille, d\'optimiser votre fiscalité, et surtout de garder la maîtrise de votre avenir.',
        'Sans stratégie, on accumule des placements au gré des rencontres et des opportunités, sans vision d\'ensemble. Résultat : des frais inutiles, des doublons, une fiscalité mal maîtrisée, et au final, un patrimoine qui ne travaille pas pour vous.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Méthodologie',
      title: 'Les piliers d\'une stratégie patrimoniale réussie',
      steps: [
        { title: '1. Faire un diagnostic global', description: 'Avant d\'agir, il faut comprendre où vous en êtes. Quels sont vos actifs (immobilier, épargne, entreprise) ? Quelles sont vos dettes, vos revenus, vos projets ? Quel est votre niveau de risque acceptable ? Quelle est votre situation fiscale ? Ce bilan patrimonial est la base de toute stratégie sérieuse. Il permet d\'identifier les forces, les faiblesses, les opportunités et les risques de votre situation actuelle.' },
        { title: '2. Définir vos objectifs', description: 'Chaque stratégie part d\'un objectif clair. Voulez-vous préparer votre retraite ? Transmettre un capital à vos enfants ? Générer des revenus complémentaires ? Protéger votre conjoint ? Investir en accord avec vos valeurs ? Passer à une stratégie conforme aux normes de finance islamique ? Ces objectifs déterminent les solutions à privilégier et l\'horizon de placement.' },
        { title: '3. Choisir les bons leviers et les activer', description: 'Une fois vos priorités définies, nous activons les bons outils : immobilier (locatif, SCPI, démembrement), assurance-vie (souple, fiscalement avantageuse), PER (retraite et réduction d\'impôt), donation et transmission anticipée, investissements socialement responsables (ISR, fonds éthiques), structuration via société (SCI, holding) si besoin, investissements boursiers conformes. Une bonne stratégie patrimoniale intègre la fiscalité, mais ne la subit pas. Votre situation évolue : votre stratégie doit être vivante. Nous restons à vos côtés pour l\'adapter régulièrement.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Finance Islamique',
      title: 'Notre spécialisation en finance islamique',
      paragraphs: [
        'Tous nos investissements sont conformes aux normes internationales de finance islamique. Ces solutions sont validées par des comités charia (Shariah Board) reconnus qui auditent les contrats et les investissements proposés.',
        'Nos principes : aucun investissement dans des sociétés fortement endettées, exclusion sectorielle stricte (alcool, armement, banques et assurances conventionnelles, jeux de hasard, pornographie), aucun contrat contenant des intérêts (riba), investissements adossés à des actifs tangibles, partage équitable du risque.',
        'La Zakat (aumône obligatoire) est un des cinq piliers de l\'islam. Son calcul peut s\'avérer complexe dès lors que le patrimoine est diversifié : immobilier, SCPI, assurance-vie, actions, or, trésorerie. Nos experts vous accompagnent sur les questions de Zakat afin de vous permettre d\'être en conformité avec vos convictions religieuses.',
      ],
    } },
    { type: 'profiles', content: {
      label: 'Personnalisation',
      title: 'Exemples de stratégies personnalisées selon les profils',
      items: [
        { profile: 'Cadre avec forte imposition', solutions: 'PER, SCPI, assurance-vie, immobilier' },
        { profile: 'Jeune actif qui démarre', solutions: 'Assurance-vie, épargne régulière, SCPI' },
        { profile: 'Famille avec enfants', solutions: 'Assurance-vie, démembrement, donation' },
        { profile: 'Entrepreneur', solutions: 'Holding + fonds conformes, PER, fiducie' },
        { profile: 'Retraité avec capital à placer', solutions: 'SCPI, assurance-vie, gestion prudente' },
      ],
    } },
    { type: 'reassurance', content: { items: [
      { title: 'Conseil expert', description: 'Accompagnement par nos experts patrimoniaux et financiers.' },
      { title: 'Sur-mesure', description: 'Un suivi personnalisé pour atteindre vos objectifs.' },
      { title: 'Secret professionnel', description: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de votre stratégie',
      subtitle: 'Vous souhaitez faire le point sur votre patrimoine ? Structurer vos finances intelligemment ? Investir en accord avec vos convictions ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement. Ensemble, nous poserons les bases d\'une stratégie patrimoniale solide, cohérente et sur mesure.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
