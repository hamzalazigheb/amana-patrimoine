const { createPage } = require('./_helpers');

module.exports = async function seedBlogInvestissementHalal(prisma) {
  await createPage(prisma, 'blog/guide-investissement-halal', {
    title: 'Guide Complet de l\'Investissement Halal en France (2025)',
    description: 'Tout savoir sur l\'investissement halal en France : SCPI, PER, assurance-vie, actions. Principes, solutions et pièges à éviter. Guide expert 2025.',
    keywords: 'investissement halal guide, placements halal 2025, comment investir halal France, SCPI halal guide',
  }, [
    { type: 'pageHero', content: {
      badge: 'Guide',
      title: 'Guide complet de l\'investissement halal en France (2025)',
      subtitle: 'Vous souhaitez investir en accord avec vos convictions islamiques mais vous ne savez pas par où commencer ? Ce guide vous explique tout : les principes, les solutions disponibles, les pièges à éviter et les étapes concrètes pour démarrer.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Introduction',
      title: 'Pourquoi l\'investissement halal est en plein essor en France',
      paragraphs: [
        'La France compte environ 5 à 6 millions de musulmans. Une part croissante d\'entre eux refuse de laisser leur épargne sur des comptes bancaires conventionnels générant des intérêts (riba), ou d\'investir dans des secteurs interdits par la charia. Cette demande a longtemps été ignorée par les acteurs financiers traditionnels.',
        'Depuis une dizaine d\'années, la situation a radicalement changé. Plusieurs grands gestionnaires d\'actifs — Franklin Templeton, Amundi, HSBC, Lyxor — ont lancé des fonds Shariah Compliant accessibles aux investisseurs français. Les SCPI conformes se sont multipliées. Les assureurs ont intégré des unités de compte halal dans leurs contrats.',
        'Aujourd\'hui, il est possible de construire une allocation patrimoniale 100% halal, diversifiée et performante, depuis la France. Ce guide vous montre comment.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Les bases',
      title: 'Les 3 règles fondamentales de l\'investissement halal',
      steps: [
        { title: 'Règle n°1 : Zéro riba (intérêt)', description: 'Aucun de vos placements ne doit générer de revenu lié à l\'intérêt. Cela exclut les livrets bancaires rémunérés (Livret A, Livret B, PEL), les obligations conventionnelles, et les fonds en euros des assurances-vie. Mais cela n\'interdit pas de percevoir des revenus : loyers (SCPI), dividendes d\'entreprises licites, plus-values sur actifs réels — tout cela est halal.' },
        { title: 'Règle n°2 : Exclusion des secteurs haram', description: 'Vos investissements ne doivent pas financer des secteurs illicites : alcool, porc, tabac, armement, banques conventionnelles, assurances conventionnelles, jeux de hasard, médias immoraux. Les fonds Shariah Compliant appliquent ces filtres automatiquement.' },
        { title: 'Règle n°3 : Validation par un comité charia', description: 'Pour vous assurer qu\'un produit est bien halal, vérifiez qu\'il a été audité par un Shariah Board reconnu (AAOIFI, ECFR, ou un comité privé réputé). Ce comité émet un certificat de conformité et effectue des audits réguliers. Sans ce certificat, un produit ne peut pas se revendiquer halal.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Les 5 meilleures solutions d\'investissement halal en France',
      steps: [
        { title: '1. Les SCPI halal — le must de l\'investissement immobilier', description: 'Pour qui : tout investisseur souhaitant des revenus immobiliers réguliers sans gérer un bien. Rendement : 4% à 6% annuel. Ticket d\'entrée : dès 1 000 €, avec versements mensuels. Point fort : aucune dette bancaire, validation charia, revenus trimestriels. Nos SCPI partenaires sont auditées par des Shariah Boards reconnus. Idéal pour une épargne programmée longue durée.' },
        { title: '2. Le PER halal — préparez votre retraite en déduisant vos impôts', description: 'Pour qui : les actifs souhaitant préparer leur retraite tout en réduisant leurs impôts. Avantage fiscal : déduction des versements du revenu imposable (économie de 30% à 45% selon la tranche). Supports : fonds actions Shariah Compliant, SCPI halal. Horizon : long terme (jusqu\'à la retraite). Un outil unique alliant performance, déduction fiscale et conformité islamique.' },
        { title: '3. L\'assurance-vie sur fonds halal — la flexibilité maximale', description: 'Pour qui : ceux qui veulent épargner à long terme avec disponibilité du capital et optimisation successorale. Fiscalité avantageuse après 8 ans. Jusqu\'à 152 500 € transmis par bénéficiaire hors droits de succession. Supports 100% halal disponibles chez plusieurs assureurs. C\'est le placement le plus polyvalent du patrimoine islamique.' },
        { title: '4. Les fonds actions Shariah Compliant — la performance boursière halal', description: 'Pour qui : investisseurs acceptant la volatilité pour viser des rendements plus élevés sur longue période. Deux approches : fonds indiciels (ETF Shariah Compliant, frais réduits) ou fonds actifs gérés par des gérants spécialisés. Performances comparables aux indices classiques sur 10 ans. Purification annuelle des dividendes impurs à prévoir.' },
        { title: '5. L\'or physique ou papier — la valeur refuge islamique', description: 'Pour qui : investisseurs souhaitant diversifier et se protéger contre l\'inflation. L\'or a toujours une valeur intrinsèque en islam (il est lui-même une mesure du Nisab). ETF or, or physique, parts de fonds spécialisés. À limiter à 5-10% du portefeuille. Soumis à la Zakat (2,5% de la valeur) si au-dessus du Nisab.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Par quoi commencer quand on veut investir en halal ?', answer: 'Commencez par un bilan patrimonial avec un CGP spécialisé en finance islamique. Cela vous permettra de définir vos objectifs, votre profil de risque et votre horizon d\'investissement avant de choisir les solutions. Chez Amana Patrimoine, ce premier rendez-vous est gratuit.' },
      { question: 'Combien d\'argent faut-il pour commencer à investir en halal ?', answer: 'Avec 50 à 100 € par mois, vous pouvez commencer à investir en halal via une assurance-vie ou un PER sur fonds Shariah Compliant. Les SCPI halal sont accessibles dès 1 000 € avec des versements mensuels programmés dès 50 €. Il n\'y a pas de capital minimum : la régularité est plus importante que le montant.' },
    ] } },
    { type: 'cta', content: {
      title: 'Passez à l\'action : démarrez votre stratégie halal',
      subtitle: 'Prêt à investir en accord avec vos convictions ? Nos experts vous accompagnent de A à Z.',
      description: 'Premier rendez-vous gratuit, sans engagement. Analyse personnalisée de votre situation.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
