const { createPage } = require('./_helpers');

module.exports = async function seedZakat(prisma) {
  await createPage(prisma, 'zakat', {
    title: 'Zakat : Calcul, Obligations et Patrimoine - Guide Complet',
    description: 'Tout savoir sur la Zakat : Nisab, Hawl, calcul sur l\'or, l\'argent, les investissements, l\'immobilier. Simulateur gratuit et conseil patrimonial islamique.',
    keywords: 'zakat calcul, zakat patrimoine, nisab 2025, hawl, zakat immobilier, zakat investissement, zakat SCPI, zakat assurance vie',
  }, [
    { type: 'pageHero', content: {
      badge: 'Zakat',
      title: 'Zakat : guide complet pour calculer et s\'acquitter de votre obligation',
      subtitle: 'La Zakat est le troisième pilier de l\'islam. Son calcul peut s\'avérer complexe lorsque le patrimoine est diversifié : immobilier, SCPI, assurance-vie, actions, or, cryptomonnaies. Ce guide complet vous explique tout, et notre simulateur gratuit vous accompagne dans votre calcul.',
      image: '/edu-heritage.png',
      ctaText: 'Calculer ma Zakat',
    } },
    { type: 'content', content: {
      label: 'Fondements',
      title: 'Qu\'est-ce que la Zakat ?',
      paragraphs: [
        'La Zakat est l\'un des cinq piliers de l\'islam. Elle est mentionnée 32 fois dans le Coran, souvent associée à la prière (salat). C\'est une obligation religieuse — pas une aumône volontaire — pour tout musulman adulte, libre, sain d\'esprit et possédant un patrimoine dépassant le Nisab (seuil minimum) depuis un an lunaire complet (Hawl).',
        'Le taux de la Zakat est de 2,5% de la richesse zakatable (1/40), un taux établi par consensus (ijma\') de tous les savants depuis les Compagnons du Prophète ﷺ (Hadith Abu Dawud n°1574). La Zakat est purificatrice pour le patrimoine et l\'âme du donateur, et constitue un mécanisme de redistribution des richesses au sein de la communauté musulmane.',
        'Les 8 catégories de bénéficiaires de la Zakat sont définies dans la Sourate At-Tawbah (9:60) : les pauvres (fuqara), les nécessiteux (masakin), les administrateurs de la Zakat, ceux dont les cœurs sont à gagner, les esclaves (pour leur affranchissement), les endettés, pour la cause d\'Allah, et les voyageurs en détresse.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Conditions',
      title: 'Les conditions d\'obligation de la Zakat',
      steps: [
        { title: 'Le Nisab (seuil minimum)', description: 'Le Nisab est le seuil de richesse au-delà duquel la Zakat devient obligatoire. Il est exprimé en or (85 grammes d\'or pur) ou en argent (595 grammes d\'argent pur). La majorité des savants contemporains recommandent d\'utiliser le Nisab en or. En 2025, le Nisab en or correspond à environ 7 395 € (selon le cours de l\'or).' },
        { title: 'Le Hawl (année lunaire)', description: 'La Zakat n\'est due que sur les biens possédés en continu depuis au moins un an lunaire (354 jours). Si votre patrimoine zakatable dépasse le Nisab au début de l\'année et reste au-dessus jusqu\'à la fin, la Zakat est due. Exception : les récoltes agricoles, zakatable à la récolte sans condition de Hawl.' },
        { title: 'La propriété complète', description: 'Les biens zakatable doivent être en votre pleine propriété, sans dette immédiate équivalente. Les dettes à court terme (remboursables dans les 12 mois) sont déductibles. Pour les prêts longs (immobilier), l\'opinion majoritaire retient uniquement la mensualité annuelle comme déductible.' },
        { title: 'L\'intention (niyya)', description: 'Comme tout acte d\'adoration en islam, la Zakat nécessite une intention sincère. Elle doit être versée avec conscience de s\'acquitter de cette obligation religieuse, pas uniquement pour des raisons philanthropiques ou fiscales.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Patrimoine',
      title: 'Zakat sur les différents types de patrimoine',
      steps: [
        { title: 'Liquidités et épargne', description: 'Les espèces en main, les comptes courants, le Livret A, les livrets d\'épargne réglementés sont entièrement zakatable. Taux : 2,5% de la valeur totale. À noter : l\'épargne déposée sur des comptes rémunérés à intérêt doit être purifiée au préalable (les intérêts ne sont pas zakatable car illicites).' },
        { title: 'Or et argent', description: 'L\'or et l\'argent physiques (pièces, lingots, bijoux) sont zakatable. Pour les bijoux en or portés régulièrement, les écoles malékite et shafi\'ite les exemptent si portés régulièrement. Les écoles hanafie et hanbalite les incluent. Choisissez l\'avis de votre école ou l\'opinion la plus prudente. Taux : 2,5% de la valeur marchande.' },
        { title: 'Actions et fonds d\'investissement', description: 'Deux méthodes sont reconnues. Méthode simple : 2,5% de la valeur totale du portefeuille. Méthode purifiée (AAOIFI) : appliquer le pourcentage d\'actifs zakatable (calculé par le gestionnaire) × 2,5%. Pour les fonds islamiques (SCPI halal, sukuk), la méthode simple est généralement applicable.' },
        { title: 'SCPI et immobilier d\'investissement', description: 'L\'immobilier d\'investissement (locatif, SCPI) est zakatable sur les revenus locatifs perçus et non dépensés au jour du Hawl, et sur la valeur des parts si l\'objectif est la revente. La résidence principale est exemptée par consensus (ijma\').' },
        { title: 'Assurance-vie et PER', description: 'La valeur de rachat de l\'assurance-vie et la valeur accessible du PER (si les fonds sont disponibles) sont zakatable. Pour les contrats bloqués (PER avant la retraite), l\'opinion majoritaire actuelle les inclut dans l\'assiette zakatable sur la valeur théorique.' },
        { title: 'Cryptomonnaies', description: 'La majorité des savants contemporains considèrent les cryptomonnaies comme des actifs (amwal) soumis à la Zakat à 2,5% si détenus depuis un Hawl complet (Fatwa ECFR 2018). S\'il s\'agit de trading actif (commerce), ils peuvent être soumis à la Zakat commerciale.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Comment calculer ma Zakat facilement ?', answer: 'Le moyen le plus simple est d\'utiliser notre calculateur de Zakat gratuit. Il couvre tous les types de biens : liquidités, or, argent, actions, SCPI, assurance-vie, PER, immobilier d\'investissement, commerce, dettes déductibles. Il suit les règles jurisprudentielles et cite les sources islamiques pour chaque catégorie.' },
      { question: 'Quand dois-je payer ma Zakat ?', answer: 'La Zakat est due dès que votre année lunaire (Hawl) est accomplie, c\'est-à-dire exactement un an après que votre patrimoine a dépassé le Nisab pour la première fois. Beaucoup de musulmans choisissent le mois de Ramadan pour s\'acquitter de la Zakat, ce qui est recommandé pour la symbolique spirituelle, à condition que le Hawl soit bien accompli.' },
      { question: 'La Zakat est-elle déductible des impôts en France ?', answer: 'Si vous versez votre Zakat à une association reconnue d\'utilité publique (ARUP) ou d\'intérêt général en France, les dons sont déductibles à 66% ou 75% du montant versé (dans la limite de 20% du revenu imposable). Ainsi, votre Zakat peut aussi vous faire bénéficier d\'une réduction d\'impôts.' },
      { question: 'Comment purifier mes dividendes impurs ?', answer: 'Si vous investissez dans des fonds actions et que certaines entreprises ont des revenus mineurs non conformes (généralement moins de 5%), vous devez purifier vos dividendes en proportion. Par exemple, si 3% des revenus d\'un fonds sont impurs, vous donnez 3% de vos dividendes à des associations caritatives. Chez Amana Patrimoine, nous calculons cette proportion et vous accompagnons dans cette démarche.' },
    ] } },
    { type: 'cta', content: {
      title: 'Calculez votre Zakat et obtenez un conseil patrimonial',
      subtitle: 'Patrimoine complexe ? Incertitudes sur vos obligations ? Besoin d\'une synthèse personnalisée ?',
      description: 'Utilisez notre simulateur gratuit ou prenez rendez-vous pour un bilan patrimonial islamique complet.',
      ctaText: 'Calculer ma Zakat',
      ctaLink: '/simulateurs',
    } },
  ]);
};
