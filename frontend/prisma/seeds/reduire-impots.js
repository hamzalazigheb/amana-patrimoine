const { createPage } = require('./_helpers');

module.exports = async function seedReduireImpots(prisma) {
  await createPage(prisma, 'reduire-impots', {
    title: 'Optimiser sa Fiscalité en tant que Particulier | Amana Patrimoine',
    description: 'Optimisation fiscale particulier : PER, assurance-vie, immobilier, transmission. Conseil conforme à la finance islamique.',
    keywords: 'optimisation fiscale, réduire impôts, PER, assurance-vie, déficit foncier, donation, IFI, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Optimisation Fiscale',
      title: 'Optimiser sa fiscalité en tant que particulier',
      subtitle: 'Reprendre le contrôle sur sa fiscalité, c\'est possible... et souvent plus simple qu\'on ne le pense. Beaucoup de contribuables subissent leur fiscalité. Pourtant, de nombreuses solutions légales existent pour réduire son impôt sur le revenu, optimiser la transmission de son patrimoine ou percevoir des revenus moins fiscalisés. L\'objectif n\'est pas de contourner les règles, mais de faire des choix intelligents et alignés avec vos valeurs, en utilisant les dispositifs prévus par la loi. Chez Amana Patrimoine, nous vous accompagnons pour optimiser votre fiscalité de manière légale, éthique et performante.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Fiscalité',
      title: 'Transformer votre contrainte fiscale en opportunité stratégique',
      paragraphs: [
        'L\'optimisation fiscale repose sur des dispositifs encadrés par la loi. Le législateur les a conçus pour encourager certains types d\'investissements.',
        'En orientant une partie de vos ressources vers des secteurs clés — épargne retraite, immobilier locatif, financement des PME — vous pouvez réduire votre impôt tout en consolidant votre patrimoine. La structuration de votre patrimoine et la préparation à la transmission constituent également des leviers pertinents pour réduire votre imposition.',
        'Chez Amana Patrimoine, nous vous accompagnons pour optimiser vos rendements et diminuer votre fiscalité, afin de développer votre patrimoine.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Enjeux',
      title: 'Pourquoi optimiser sa fiscalité ?',
      paragraphs: [
        'L\'impôt représente un poste de dépense majeur pour de nombreux foyers. L\'optimisation fiscale ne consiste pas à échapper à l\'impôt, mais à utiliser intelligemment les leviers offerts par la loi.',
        'Optimiser sa fiscalité répond à votre intérêt personnel — réduire l\'impôt et développer votre patrimoine — tout en remplissant les objectifs définis par l\'État.',
        'Cet enjeu est souvent peu ou mal adressé. L\'impôt grève vos revenus et diminue votre patrimoine, vous pénalisant ainsi que vos proches. Il est donc essentiel de s\'en saisir au plus tôt.',
      ],
      cards: [
        { icon: '/scale_8518857.png', title: 'Réduire sa pression fiscale', description: '' },
        { icon: '/economic_9752469.png', title: 'Faire fructifier son patrimoine plus rapidement', description: '' },
        { icon: '/insurance_7053796.png', title: 'Préparer l\'avenir de sa famille', description: '' },
        { icon: '/goal_11342863.png', title: 'Réallouer l\'épargne vers des projets utiles', description: '' },
      ],
    } },
    { type: 'content', content: {
      label: 'Méthode',
      title: 'Les grands principes d\'une stratégie fiscale efficace',
      steps: [
        { title: 'Une approche globale', description: 'Une stratégie patrimoniale efficace prend en considération l\'ensemble du patrimoine et des revenus : salaires, foncier, dividendes, plus-values. Elle doit s\'adapter à vos projets et objectifs.' },
        { title: 'La complexité des régimes fiscaux', description: 'En France, les régimes d\'imposition sont multiples : impôt sur le revenu (IR), impôt sur la fortune immobilière (IFI), contribution sociale généralisée (CSG), flat tax, barème progressif. Nos conseillers vous accompagnent pour agir sur les différents leviers.' },
        { title: 'L\'importance de l\'anticipation', description: 'Anticiper est la clé d\'une bonne gestion fiscale. Lorsque l\'impôt est là, c\'est trop tard. C\'est en amont qu\'il faut mettre en place les stratégies gagnantes.' },
        { title: 'La rigueur fiscale', description: 'En matière fiscale, la rigueur est essentielle. Une déclaration incomplète, un investissement mal structuré ou un montage non conforme peut entraîner des requalifications, des redressements, voire des pénalités financières lourdes. Chez Amana Patrimoine, nous accordons une attention particulière au respect du cadre légal.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Calendrier',
      title: 'Surveillez les échéances clés',
      steps: [
        { title: 'Avril – Juin : la déclaration de revenus', description: 'Chaque année, à l\'approche de l\'été, vient le moment de la déclaration de revenus. C\'est à ce moment de faire valoir vos réductions ou crédits d\'impôts mis en place avec votre conseiller : plan d\'épargne retraite, dons, souscription au capital de PME, FCPI/FIP. Une erreur ou un oubli peut annuler totalement l\'avantage fiscal attendu. Il est crucial de bien préparer sa déclaration.' },
        { title: 'Avril – Juin : déclaration de l\'IFI', description: 'Si votre patrimoine immobilier net dépasse 1,3 million d\'euros, vous êtes concerné par l\'IFI. Pour réduire efficacement votre IFI, certaines stratégies doivent être anticipées bien avant cette échéance : démembrement de propriété, investissement dans des PME éligibles (jusqu\'à 50 000€ d\'économie d\'impôt possible).' },
        { title: '31 décembre : les dernières minutes pour agir', description: 'Quelques leviers à activer avant le 31 décembre : investir dans un PER, souscrire à un FIP ou FCPI, effectuer des travaux déductibles, faire une donation, investir dans une SCPI fiscale, faire un don à une association reconnue d\'utilité publique.' },
        { title: 'Tous les 15 ans : pensez à vos abattements et donations', description: 'Le système fiscal français permet de transmettre jusqu\'à 100 000€ par parent et par enfant tous les 15 ans en franchise d\'impôt. Un bon suivi de vos donations vous permet de remobiliser ces abattements régulièrement.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Nos leviers d\'optimisation fiscale',
      steps: [
        { title: 'Immobilier locatif', description: 'Déficit foncier (déduction jusqu\'à 10 700 €/an), LMNP/LMP (amortissement, loyers peu fiscalisés), dispositifs Pinel, Denormandie, Malraux pour des réductions d\'impôt importantes.' },
        { title: 'Épargne retraite', description: 'PER (déduction des versements du revenu imposable), assurance-vie (fiscalité avantageuse après 8 ans, abattements successoraux jusqu\'à 152 500€ par bénéficiaire), Girardin industriel.' },
        { title: 'Investissements productifs', description: 'PME/start-up (réduction IR 25%, plafond 50k€ célibataire, 100k€ couple), dispositif Madelin IR/IFI (réduction jusqu\'à 25% IR et 50% IFI).' },
        { title: 'Transmission', description: 'Donations (abattements 100k€ tous les 15 ans), démembrement, assurance-vie (152 500€ par bénéficiaire hors succession), donation-partage.' },
        { title: 'IFI (Impôt sur la Fortune Immobilière)', description: 'Optimisation de la déclaration (dettes déductibles), sortie de l\'assiette via assurance-vie et capitalisation, investissements éligibles (réduction 50%, max 45k€).' },
        { title: 'Dons aux associations', description: 'Réduction 66% ou 75% du montant versé. Plafond 20% du revenu imposable.' },
        { title: 'GFI (Groupement Forestier d\'Investissement)', description: 'Réduction IR jusqu\'à 25%, exonération partielle IFI à 75%, protection contre l\'inflation, facilite la transmission.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Conformité',
      title: 'Optimisation et finance islamique',
      paragraphs: [
        'Est-il autorisé en islam de payer moins d\'impôts ? La réponse est oui. La question concerne les outils utilisés pour les réduire.',
        'Il n\'est pas autorisé d\'investir avec des effets de levier conventionnels car il s\'agit d\'usure (ribâ). Tout PER n\'est pas nécessairement conforme aux normes de finance islamique : cela dépend du contenu de l\'investissement et de la forme du contrat.',
        'Toute assurance-vie n\'est pas licite (halal) : cela dépend des clauses et des véhicules d\'investissement sélectionnés.',
        'Chez Amana Patrimoine, nos conseillers sont formés aux enjeux de finance islamique et aux enjeux attenants à la charia de manière générale. Notre accompagnement est conforme à l\'éthique musulmane dans sa globalité, de l\'investissement à la transmission, en passant par la Zakat.',
      ],
    } },
    { type: 'content', content: {
      label: 'Accompagnement',
      title: 'Notre méthode d\'accompagnement fiscal',
      paragraphs: [
        'Notre processus : bilan patrimonial complet et confidentiel, analyse de votre imposition actuelle (IR, IFI, fiscalité des revenus et du capital), identification des leviers utilisables en fonction de votre profil, élaboration d\'un plan d\'optimisation sur-mesure, suivi et ajustements dans le temps.',
        'Nous privilégions les stratégies pérennes, lisibles, sécurisées et adaptées à vos objectifs de vie.',
      ],
    } },
    { type: 'cta', content: {
      title: 'Parlons de votre fiscalité',
      subtitle: 'Vous souhaitez réduire vos impôts ? Investir intelligemment ? Structurer votre patrimoine de manière éthique et durable ?',
      description: 'Contactez-nous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
