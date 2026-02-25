const { createPage } = require('./_helpers');

module.exports = async function seedReduireImpotsEntreprise(prisma) {
  await createPage(prisma, 'reduire-impots-entreprise', {
    title: 'Optimiser la Fiscalité de son Entreprise : Conseil Fiscal Pro | Amana',
    description: 'Optimisation fiscale entreprise : structuration, rémunération dirigeant, transmission. Conseil fiscal professionnel conforme finance islamique.',
    keywords: 'fiscalité entreprise, optimisation fiscale professionnelle, impôt société, rémunération dirigeant, transmission entreprise',
  }, [
    { type: 'pageHero', content: {
      badge: 'Optimisation Fiscale Entreprise',
      title: 'Optimiser la fiscalité de son entreprise',
      subtitle: 'Que vous soyez entrepreneur individuel, dirigeant d\'entreprise ou professionnel libéral, la fiscalité de votre activité influence directement votre rentabilité. Trop souvent négligée ou subie, la fiscalité peut pourtant devenir un levier de performance. Anticiper, structurer, arbitrer : les bonnes décisions peuvent faire la différence entre une entreprise sous pression et une entreprise optimisée. Chez Amana Patrimoine, nous vous accompagnons pour structurer votre entreprise et optimiser sa fiscalité de manière intelligente, pérenne et éthique.',
      image: '/0.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Notre Approche',
      title: 'Une vision globale pour votre optimisation fiscale',
      stepStyle: 'methodology',
      steps: [
        { title: 'Diagnostic fiscal complet', description: 'Analyse exhaustive de la structure fiscale de votre entreprise' },
        { title: 'Définition des objectifs', description: 'Rentabilité, transmission, épargne, retraite : nous clarifions vos priorités' },
        { title: 'Stratégies sur mesure', description: 'Proposition de solutions fiscales chiffrées et hiérarchisées' },
        { title: 'Mise en œuvre accompagnée', description: 'Coordination avec vos partenaires (expert-comptable, avocat, notaire)' },
        { title: 'Suivi annuel', description: 'Ajustement en fonction de l\'évolution de votre activité et de la législation' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Objectifs',
      title: 'Notre mission',
      cards: [
        { icon: '/icon-fiscal-optimization.svg', title: 'Réduire la charge fiscale globale', description: 'IR, IS, IFI - Optimisation de tous les impôts' },
        { icon: '/icon-treasury.svg', title: 'Renforcer votre trésorerie', description: 'Amélioration de la liquidité et de la rentabilité' },
        { icon: '/icon-retirement.svg', title: 'Préparer la transmission', description: 'Anticipation et structuration patrimoniale' },
        { icon: '/icon-protection.svg', title: 'Sécuriser vos revenus', description: 'Protection et pérennisation de vos actifs' },
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Les leviers d\'optimisation fiscale à votre disposition',
      steps: [
        { title: 'Choisir la bonne structure et le bon régime fiscal', description: 'Le choix de la structure juridique (entreprise individuelle, SAS, SARL, holding, SCI) influence directement votre niveau d\'imposition. Le régime fiscal (IR ou IS) peut être optimisé selon votre activité et vos projets.' },
        { title: 'Optimiser votre rémunération', description: 'Le pilotage intelligent de votre rémunération est un levier puissant. Arbitrage entre salaire et dividendes, gestion des frais professionnels, dispositifs d\'épargne d\'entreprise.' },
        { title: 'Intégrer l\'immobilier dans votre stratégie fiscale', description: 'L\'immobilier professionnel peut devenir un actif stratégique. En l\'intégrant via une SCI ou une holding, vous pouvez générer des loyers déductibles, amortir des biens et faciliter leur transmission.' },
        { title: 'Investir pour défiscaliser', description: 'Les investissements dans l\'économie réelle (PME, start-up) peuvent bénéficier de réductions d\'impôt importantes tout en soutenant l\'innovation.' },
        { title: 'Innover et utiliser la fiscalité de la R&D', description: 'Crédit d\'Impôt Recherche (CIR), Crédit d\'Impôt Innovation (CII), statut Jeune Entreprise Innovante (JEI) : financez votre développement tout en allégeant votre imposition.' },
        { title: 'Préparer la transmission de votre entreprise', description: 'Structurer la transmission pour minimiser les droits de succession : donation de parts, démembrement, pacte Dutreil.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Conformité',
      title: 'Optimisation et finance islamique',
      paragraphs: [
        'Est-il autorisé en islam de payer moins d\'impôts ? La réponse est assurément oui. La question à se poser est concernant les outils utilisés pour les réduire.',
        'Il n\'est évidemment pas autorisé d\'investir avec des effets de leviers conventionnels car il s\'agit d\'usure (riba). Tout PER n\'est pas nécessairement conforme aux normes de finance islamique, tout dépendra du contenu de l\'investissement et de la forme du contrat. Tout investissement de trésorerie n\'est pas nécessairement licite (halal), cela dépend du véhicule d\'investissement et des clauses contractuelles.',
        'Chez Amana Patrimoine, nos conseillers sont formés aux enjeux de finance islamique. Notre accompagnement est conforme à l\'éthique musulmane dans sa globalité, de l\'investissement à la transmission en passant par la Zakat.',
      ],
    } },
    { type: 'cta', content: {
      title: 'Parlons de votre fiscalité d\'entreprise',
      subtitle: 'Vous souhaitez réduire la charge fiscale de votre entreprise ? Optimiser votre rémunération ? Préparer la transmission dans un cadre conforme à vos convictions ?',
      description: 'Contactez-nous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
