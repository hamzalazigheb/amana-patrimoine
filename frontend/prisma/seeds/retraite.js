const { createPage } = require('./_helpers');

module.exports = async function seedRetraite(prisma) {
  await createPage(prisma, 'retraite', {
    title: 'Préparer sa Retraite | Amana Patrimoine',
    description: 'Préparez votre retraite avec des solutions conformes à la finance islamique. PER, SCPI, assurance-vie éthique.',
    keywords: 'retraite, PER halal, complémentaire retraite, épargne retraite islamique, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Préparation Retraite',
      title: 'Préparer sa retraite avec des solutions conformes à la finance islamique',
      subtitle: 'Le système de retraite par répartition ne suffira pas à maintenir votre niveau de vie. Pour les cadres, la baisse de revenus au moment du départ à la retraite peut atteindre 40 à 50%. Anticiper cette baisse en se constituant un complément de retraite, c\'est reprendre la main sur son avenir.',
      image: '/Site 29.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      title: 'Pourquoi préparer sa retraite dès maintenant ?',
      paragraphs: [
        'Plus vous commencez tôt, plus l\'effet de capitalisation joue en votre faveur. Un versement de 200 € par mois sur 25 ans peut générer un capital bien supérieur à la somme des versements, grâce au réinvestissement des gains.',
        'Les pensions de retraite sont en baisse. Le montant moyen d\'une pension est souvent bien inférieur au dernier salaire perçu, ce qui oblige à revoir son train de vie à la baisse. Le départ à la retraite est également repoussé, mais les projets de vie n\'attendent pas.',
        'Il existe des solutions d\'épargne défiscalisantes. Le plan d\'épargne retraite (PER) permet par exemple de déduire les versements de vos revenus imposables, ce qui représente une économie d\'impôt immédiate.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Étude de Cas',
      title: 'Exemple concret : l\'impact d\'une stratégie anticipée',
      paragraphs: [
        'Samir, 42 ans, Cadre Supérieur — Objectif : Préparer sa retraite tout en réduisant ses impôts.',
        'Effort mensuel : 450 € — Économie d\'impôt annuelle : 1 620 €* — Horizon : 22 ans — Allocation : Dynamique éthique.',
        'Résultats comparatifs : Livret A (épargne standard) → 142 000 € | Stratégie PER Amana (optimisée) → 315 000 €**.',
        '* Sur la base d\'une tranche marginale d\'imposition à 30%. ** Simulation basée sur un rendement cible de 5,5% net. Les performances passées ne garantissent pas les résultats futurs.',
      ],
    } },
    { type: 'tools', content: {
      label: 'Solutions',
      title: 'Les solutions pour préparer votre retraite',
      items: [
        { title: 'Le PER (Plan d\'Épargne Retraite)', description: 'Le plan d\'épargne retraite est devenu l\'outil de référence pour préparer sa retraite tout en réduisant ses impôts. Les versements effectués sur un PER sont déductibles de vos revenus imposables, dans la limite d\'un plafond annuel.', features: ['Déductibilité fiscale immédiate', 'Supports conformes finance islamique', 'Sortie en capital ou rente'] },
        { title: 'Les SCPI', description: 'Les SCPI permettent d\'investir dans l\'immobilier professionnel avec un ticket d\'entrée accessible. Vous percevez des revenus trimestriels sous forme de loyers, sans avoir à gérer vous-même les biens.', features: ['Revenus trimestriels', 'Sans dette bancaire', 'Conformité Shariah'] },
        { title: 'L\'assurance-vie', description: 'L\'assurance-vie reste l\'un des placements préférés des Français : fiscalité avantageuse après 8 ans, souplesse totale, transmission optimisée hors succession.', features: ['Capital disponible à tout moment', 'Fonds conformes sans riba', 'Transmission optimisée'] },
        { title: 'L\'investissement immobilier locatif', description: 'Investir dans l\'immobilier locatif permet de se constituer une rente régulière et de valoriser son capital sur le long terme. La location meublée non professionnelle (LMNP) offre une fiscalité avantageuse.', features: ['Rente régulière', 'Valorisation du capital', 'Fiscalité LMNP avantageuse'] },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      title: 'Retraite et finance islamique : comment ça marche ?',
      paragraphs: [
        'Préparer sa retraite en respectant les principes de la finance islamique, c\'est possible. Nos conseillers sont formés à la finance islamique et au fiqh al-mu\'amalat (droit musulman des transactions). Ils s\'assurent que chaque solution proposée respecte les critères suivants :',
        'Absence totale d\'intérêt (riba). Les supports d\'investissement ne génèrent pas de revenus liés à l\'usure.',
        'Exclusion des secteurs interdits. Pas d\'investissement dans l\'alcool, le porc, l\'armement, les banques conventionnelles, les jeux de hasard, la pornographie.',
        'Validation par des comités charia. Tous les fonds et SCPI que nous proposons sont audités par des Shariah Boards reconnus au niveau international.',
        'Adossement à des actifs réels. Les investissements sont liés à l\'économie réelle (immobilier, entreprises), pas à de la spéculation pure.',
        'Partage équitable du risque. Contrairement aux produits bancaires classiques, le risque est partagé entre l\'investisseur et le gestionnaire.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Qu\'est-ce qui rend un PER éthique ?', answer: 'Un PER est considéré comme éthique quand il investit uniquement sur des supports conformes à la finance islamique : fonds actions excluant les secteurs interdits, SCPI sans dette bancaire, obligations sukuk. Ces supports sont validés par des comités charia (Shariah Board) qui vérifient la conformité des investissements et des contrats. Tous nos PER respectent ces critères et sont audités par des experts en finance islamique.' },
      { question: 'Puis-je retirer mon capital avant la retraite ?', answer: 'Cela dépend du support. Le PER bloque le capital jusqu\'à la retraite, sauf pour l\'achat de la résidence principale ou en cas d\'accident de la vie (invalidité, décès du conjoint, surendettement, expiration des droits au chômage). L\'assurance-vie, elle, est totalement liquide : vous pouvez retirer votre argent à tout moment, sans condition.' },
      { question: 'L\'avantage fiscal du PER est-il immédiat ?', answer: 'Oui, absolument. Les versements effectués en 2025 sont déductibles de vos revenus imposables déclarés en 2026. Si vous versez 10 000 € et que vous êtes dans la tranche à 30%, vous économisez 3 000 € d\'impôt dès l\'année suivante.' },
    ] } },
    { type: 'reassurance', content: { items: [
      { title: 'Conseil expert', description: 'Accompagnement par nos experts patrimoniaux et financiers.' },
      { title: 'Sur-mesure', description: 'Un suivi personnalisé pour atteindre vos objectifs.' },
      { title: 'Secret professionnel', description: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de votre retraite',
      subtitle: 'Vous souhaitez préparer votre retraite intelligemment ? Réduire vos impôts tout en investissant selon vos convictions ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit. Nous analysons votre situation et vous proposons une stratégie adaptée à vos objectifs.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
