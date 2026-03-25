const { createPage } = require('./_helpers');

module.exports = async function seedFinanceIslamique(prisma) {
  await createPage(prisma, 'finance-islamique', {
    title: 'Finance Islamique en France : Principes, Solutions & Conseil',
    description: 'Tout comprendre sur la finance islamique en France : riba, halal, charia. Placements conformes, SCPI halal, PER éthique. Conseil expert CGP Paris.',
    keywords: 'finance islamique, finance islamique France, riba, halal, charia, placements islamiques, banque islamique France',
  }, [
    { type: 'pageHero', content: {
      badge: 'Finance Islamique',
      title: 'Finance islamique en France : principes, solutions et conformité',
      subtitle: 'La finance islamique n\'est pas réservée aux pays du Golfe. En France, des solutions concrètes permettent d\'investir, d\'épargner et de transmettre son patrimoine en respectant les principes de la charia. Chez Amana Patrimoine, nous sommes spécialisés dans ce domaine et accompagnons des centaines de clients dans cette démarche.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Définition',
      title: 'Qu\'est-ce que la finance islamique ?',
      paragraphs: [
        'La finance islamique est un système financier fondé sur les principes du droit islamique (charia). Elle interdit l\'intérêt (riba), la spéculation excessive (gharar), et les investissements dans des secteurs considérés comme illicites (haram) : alcool, armement, jeux de hasard, pornographie, banques conventionnelles.',
        'En revanche, elle encourage le partage équitable du risque entre les parties prenantes, l\'adossement des transactions à des actifs réels et tangibles, et le développement de l\'économie réelle. La finance islamique ne signifie pas "gratuit" : l\'investisseur peut et doit percevoir un rendement, mais celui-ci doit provenir d\'une activité productive réelle.',
        'Aujourd\'hui, la finance islamique représente plus de 3 000 milliards de dollars d\'actifs à l\'échelle mondiale. En France, elle reste encore peu connue du grand public, mais des solutions accessibles existent dès maintenant pour les particuliers.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Principes',
      title: 'Les 5 principes fondamentaux de la finance islamique',
      steps: [
        { title: 'Interdiction du riba (l\'intérêt)', description: 'Le riba désigne tout avantage ou excédent perçu en échange d\'un prêt ou d\'un dépôt d\'argent, sans contrepartie de travail ou de risque. Il est explicitement interdit par le Coran (Sourate Al-Baqarah, 2:275-279). Concrètement, cela exclut les prêts bancaires à intérêt, les livrets bancaires rémunérés à taux fixe, et les obligations conventionnelles.' },
        { title: 'Interdiction du gharar (l\'incertitude excessive)', description: 'Le gharar désigne l\'incertitude ou l\'ambiguïté excessive dans les contrats. Une transaction doit être claire sur son objet, son prix, son délai. Les produits dérivés spéculatifs, les ventes à découvert et les contrats d\'assurance-vie conventionnels sont souvent concernés par cette interdiction.' },
        { title: 'Interdiction du maysir (la spéculation)', description: 'Le maysir désigne le jeu de hasard ou toute activité assimilée à un jeu de hasard. Les transactions purement spéculatives, sans ancrage dans l\'économie réelle, sont interdites.' },
        { title: 'Exclusion des secteurs haram', description: 'Les investissements dans des activités illicites sont interdits : alcool, porc, tabac, armement, banques et assurances conventionnelles, jeux de hasard, médias contraires à l\'éthique, pornographie. Les fonds Shariah Compliant appliquent des filtres sectoriels stricts pour respecter ces critères.' },
        { title: 'Partage équitable des profits et pertes', description: 'La finance islamique encourage les structures de type musharaka (partenariat) et mudaraba (commandite) où le risque est partagé entre l\'investisseur et l\'entrepreneur. C\'est le modèle de l\'économie participative, aligné sur l\'économie réelle.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Les solutions de finance islamique disponibles en France',
      steps: [
        { title: 'SCPI Halal', description: 'Les SCPI (Sociétés Civiles de Placement Immobilier) halal permettent d\'investir dans l\'immobilier professionnel sans recourir à la dette bancaire. Elles sont auditées par des comités charia reconnus et respectent les critères ESG. Ticket d\'entrée accessible, revenus trimestriels, liquidité progressive.' },
        { title: 'PER Halal (Plan d\'Épargne Retraite)', description: 'Un PER halal est un Plan d\'Épargne Retraite dont les unités de compte sont exclusivement investies sur des fonds Shariah Compliant. Il permet de déduire les versements du revenu imposable tout en préparant une retraite conforme à ses convictions.' },
        { title: 'Assurance-vie Islamique', description: 'L\'assurance-vie islamique utilise des contrats de type takaful ou des unités de compte exclusivement investies sur des fonds éthiques screentés. Elle permet d\'épargner à long terme, de bénéficier d\'une fiscalité avantageuse, et d\'organiser la transmission de son patrimoine hors succession.' },
        { title: 'Fonds actions Shariah Compliant', description: 'Des fonds d\'investissement en actions d\'entreprises filtrées selon les critères islamiques : exclusion sectorielle, ratio d\'endettement limité, purification des revenus impurs. Plusieurs grands gestionnaires (Franklin Templeton, Amundi) proposent ces solutions.' },
        { title: 'Sukuk (obligations islamiques)', description: 'Les sukuk sont l\'équivalent islamique des obligations. Ils représentent une part dans un actif réel et génèrent un revenu fondé sur les flux de cet actif (loyers, dividendes), sans intérêt. Ils constituent un excellent outil de diversification et de stabilisation de portefeuille.' },
        { title: 'Financement immobilier islamique', description: 'Mourabaha (achat-revente à marge fixe), Musharaka dégressive (co-propriété progressive) : ces structures permettent de financer l\'acquisition d\'un bien immobilier sans emprunt à intérêt. Quelques établissements en Europe proposent ces solutions, et nous vous accompagnons dans leur mise en place.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Garanties',
      title: 'Comment s\'assurer qu\'un produit est bien halal ?',
      paragraphs: [
        'La conformité d\'un produit financier à la charia est garantie par un Shariah Board (comité charia). C\'est un organe indépendant composé de savants islamiques et d\'experts en finance, qui audit les produits et émet des avis de conformité (fatwas).',
        'Les principaux organismes de référence en Europe sont : AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions), IFSB (Islamic Financial Services Board), ECFR (European Council for Fatwa and Research), et des comités charia privés liés aux grandes maisons de gestion.',
        'Chez Amana Patrimoine, nous ne proposons que des solutions dont la conformité charia a été vérifiée et validée par des comités reconnus. Nous vous fournissons systématiquement les documents de conformité correspondants.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'La finance islamique est-elle réservée aux musulmans ?', answer: 'Non. La finance islamique est accessible à tous, quelle que soit la religion. Ses principes — exclusion de la spéculation, adossement à l\'économie réelle, partage du risque — rejoignent les préoccupations de nombreux investisseurs éthiques, qu\'ils soient musulmans ou non. De nombreux clients non-musulmans choisissent des produits islamiques pour leur cohérence éthique.' },
      { question: 'Est-ce qu\'il existe des banques islamiques en France ?', answer: 'Il n\'existe pas de banque islamique agréée proposant des comptes courants islamiques en France à ce jour. En revanche, des solutions de placement halal (SCPI, fonds, assurance-vie, PER) sont accessibles via des conseillers en gestion de patrimoine spécialisés comme Amana Patrimoine. Pour le financement immobilier islamique, certaines institutions en Grande-Bretagne et au Luxembourg proposent des solutions utilisables en France.' },
      { question: 'La performance des placements islamiques est-elle comparable aux placements classiques ?', answer: 'Oui. De nombreuses études académiques montrent que les indices Shariah Compliant surperforment ou font jeu égal avec les indices classiques sur le long terme. L\'exclusion des secteurs à risque (alcool, tabac, armement) a souvent protégé les portefeuilles islamiques lors des crises financières. Finance islamique et performance ne sont pas contradictoires.' },
      { question: 'Qu\'est-ce que le Nisab et à quoi sert-il ?', answer: 'Le Nisab est le seuil minimum de richesse au-delà duquel la Zakat devient obligatoire. Il est calculé en équivalent or (85g d\'or ≈ 7 395 € en 2026) ou argent (595g d\'argent). Si votre patrimoine zakatable dépasse ce seuil depuis un an lunaire complet (Hawl), vous devez verser 2,5% de ce patrimoine en Zakat.' },
      { question: 'Comment Amana Patrimoine garantit-il la conformité islamique de ses conseils ?', answer: 'Tous nos conseillers sont formés à la finance islamique et au fiqh al-mu\'amalat (droit islamique des transactions). Nous ne proposons que des solutions validées par des Shariah Boards reconnus. Nous pouvons vous fournir les certificats de conformité de chaque produit recommandé. Notre démarche est transparente : si une solution n\'est pas claire sur sa conformité, nous ne la recommandons pas.' },
    ] } },
    { type: 'reassurance', content: { items: [
      { title: 'Expertise reconnue', description: 'Spécialistes en finance islamique depuis plus de 15 ans.' },
      { title: 'Solutions validées', description: 'Chaque produit est certifié par un comité charia reconnu.' },
      { title: 'Conseil indépendant', description: 'Aucun lien capitalistique avec nos partenaires.' },
    ] } },
    { type: 'cta', content: {
      title: 'Commencez votre parcours en finance islamique',
      subtitle: 'Vous souhaitez investir en accord avec vos convictions ? Comprendre les solutions disponibles en France ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
