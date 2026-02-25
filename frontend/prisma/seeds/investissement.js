const { createPage } = require('./_helpers');

module.exports = async function seedInvestissement(prisma) {
  await createPage(prisma, 'investissement', {
    title: 'Investir son Argent | Amana Patrimoine',
    description: 'Investissement éthique et conforme à la finance islamique : assurance-vie, PER, SCPI, private equity, marchés financiers.',
    keywords: 'investissement halal, finance islamique, SCPI, assurance-vie, PER, private equity, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Investissement Éthique',
      title: 'Investir son argent selon ses convictions : finance islamique et placements éthiques',
      subtitle: 'Investir, ce n\'est pas seulement chercher la performance. C\'est d\'abord se poser la question : pourquoi est-ce que j\'investis ? Pour préparer ma retraite ? Financer les études de mes enfants ? Acheter un bien immobilier ? Générer des revenus complémentaires ? Chez Amana Patrimoine, nous pensons qu\'une stratégie d\'investissement réussie commence par une vision claire de vos objectifs. Nous prenons le temps de comprendre votre situation, vos projets et vos convictions pour vous proposer des solutions adaptées, performantes et conformes aux principes de la finance islamique.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      title: 'Pourquoi investir ?',
      steps: [
        { title: 'Faire fructifier un capital dans la durée', description: 'Laisser son argent sur un compte courant, c\'est le voir perdre de la valeur à cause de l\'inflation. Investir permet de préserver et d\'augmenter son pouvoir d\'achat.' },
        { title: 'Préparer un projet à moyen terme', description: 'Achat immobilier, tour du monde, création d\'entreprise : certains projets nécessitent de constituer une épargne en amont.' },
        { title: 'Financer les études des enfants', description: 'Les frais de scolarité, le logement étudiant, les voyages linguistiques représentent un budget important. Anticiper ces dépenses dès la naissance permet d\'éviter le recours au prêt étudiant.' },
        { title: 'Se constituer un complément de revenus', description: 'Pour la retraite ou même avant, générer des revenus passifs offre une liberté financière et permet de réaliser des projets sans dépendre uniquement de son salaire.' },
        { title: 'Transmettre un patrimoine', description: 'Organiser la transmission de son capital à ses proches, dans un cadre fiscal optimisé et conforme à ses valeurs.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Principes',
      title: 'Les grands principes de l\'investissement éthique',
      paragraphs: [
        'Nous respectons les principes de la finance islamique dans tous nos placements. Cela implique plusieurs critères stricts :',
        'Pas d\'intérêt (riba). Les revenus générés proviennent de l\'activité réelle (loyers, dividendes, plus-values), pas de l\'usure.',
        'Exclusion des secteurs interdits. Nous n\'investissons pas dans l\'alcool, le porc, l\'armement, les banques conventionnelles, les assurances conventionnelles, les jeux de hasard, la pornographie.',
        'Pas de spéculation excessive (gharar et maysir). Les investissements sont adossés à des actifs réels et tangibles.',
        'Validation par des comités charia. Tous les fonds et supports que nous proposons sont audités par des Shariah Boards reconnus au niveau international.',
        'Partage équitable du risque. L\'investisseur et le gestionnaire partagent les risques et les bénéfices.',
      ],
    } },
    { type: 'content', content: {
      label: 'Méthodologie',
      title: 'Notre méthodologie d\'investissement',
      stepStyle: 'methodology',
      steps: [
        { title: 'Étape 1 : Analyse de votre situation', description: 'Nous étudions en détail votre situation patrimoniale, vos objectifs et vos contraintes pour vous proposer un accompagnement adapté.' },
        { title: 'Étape 2 : Définition de votre profil investisseur', description: 'Nous déterminons votre profil de risque, votre horizon d\'investissement et vos contraintes éthiques pour construire une stratégie qui vous correspond.' },
        { title: 'Étape 3 : Stratégie personnalisée', description: 'Nous concevons une stratégie d\'investissement sur-mesure alignée avec vos objectifs et vos valeurs : allocation d\'actifs optimisée, solutions conformes, diversification adaptée.' },
        { title: 'Étape 4 : Mise en oeuvre et suivi', description: 'Nous vous accompagnons dans la mise en place de votre stratégie et assurons un suivi régulier pour l\'ajuster si nécessaire.' },
      ],
    } },
    { type: 'tools', content: {
      label: 'Solutions',
      title: 'Les grands leviers d\'investissement',
      items: [
        { title: 'L\'assurance-vie', description: 'L\'outil préféré des Français pour investir à long terme. L\'assurance-vie combine fiscalité avantageuse après 8 ans, souplesse totale, et transmission optimisée.', features: ['Abattement annuel 4 600€', 'Capital disponible', 'Fonds éthiques validés'] },
        { title: 'Le PER (Plan Épargne Retraite)', description: 'Préparez votre retraite tout en réduisant vos impôts. Les versements effectués sur un PER sont déductibles du revenu imposable.', features: ['Déduction fiscale immédiate', 'Supports éthiques', 'Capital à la retraite'] },
        { title: 'Les SCPI', description: 'Investir dans l\'immobilier professionnel de manière accessible. Les SCPI permettent de percevoir des revenus réguliers sous forme de loyers.', features: ['Revenus trimestriels', 'Sans dette bancaire', 'Conformité Shariah'] },
        { title: 'L\'immobilier locatif', description: 'Se constituer une rente tangible et stable. L\'investissement dans l\'immobilier locatif permet de générer des revenus réguliers.', features: ['Rente régulière', 'Fiscalité LMNP', 'Structuration SCI'] },
        { title: 'Les marchés financiers', description: 'Investir en bourse permet de dynamiser son épargne sur le long terme, à condition d\'adopter une approche disciplinée.', features: ['Fonds Shariah Compliant', 'Validation comités charia', 'Diversification'] },
        { title: 'Le Private Equity', description: 'Financer l\'économie réelle en investissant dans des PME ou start-ups. Le private equity offre un rendement potentiel élevé.', features: ['Économie réelle', 'Rendement potentiel élevé', 'Diversification'] },
      ],
    } },
    { type: 'content', content: {
      label: 'Convictions',
      title: 'Comment investir selon ses convictions ?',
      paragraphs: [
        'Entre les labels ISR (Investissement Socialement Responsable), les critères ESG (Environnementaux, Sociaux et de bonne Gouvernance), les articles 8 et 9 du règlement SFDR, il n\'est pas toujours simple de s\'y retrouver.',
        'Notre rôle est de vous accompagner pour identifier des supports alignés avec vos principes. Nous travaillons avec des fonds validés par des comités charia reconnus, qui garantissent la conformité religieuse des investissements.',
        'Vous investissez en toute conscience, sur des actifs qui ont du sens pour vous, tout en visant une performance financière solide.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Qu\'est-ce qu\'un fonds Shariah Compliant ?', answer: 'Un fonds Shariah Compliant est un fonds d\'investissement conforme aux principes de la finance islamique. Il exclut les secteurs interdits (alcool, armement, banques conventionnelles), n\'investit pas dans des entreprises trop endettées, et ne génère pas de revenus liés à l\'intérêt (riba). Les investissements sont audités par un comité charia (Shariah Board) qui vérifie la conformité des placements.' },
      { question: 'La performance est-elle au rendez-vous ?', answer: 'Oui. Les études montrent que les fonds éthiques et Shariah Compliant peuvent offrir des performances comparables, voire supérieures aux fonds traditionnels sur le long terme. L\'exclusion de certains secteurs à risque et l\'accent mis sur la durabilité peuvent réduire la volatilité. Cependant, comme tout investissement, les performances passées ne garantissent pas les résultats futurs.' },
      { question: 'Comment gérez-vous les dividendes impurs ?', answer: 'Si une entreprise génère une petite partie de ses revenus via des activités non conformes (généralement moins de 5%), les dividendes correspondants sont considérés comme impurs. Nous calculons cette proportion et vous accompagnons pour reverser cette somme à des oeuvres caritatives, conformément aux principes de purification (tazkiya). Cela garantit que votre investissement reste éthique.' },
    ] } },
    { type: 'reassurance', content: { items: [
      { title: 'Conseil expert', description: 'Accompagnement par nos experts patrimoniaux et financiers.' },
      { title: 'Sur-mesure', description: 'Un suivi personnalisé pour atteindre vos objectifs.' },
      { title: 'Secret professionnel', description: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de votre stratégie d\'investissement',
      subtitle: 'Vous souhaitez faire fructifier votre épargne ? Investir en accord avec vos convictions ? Préparer votre retraite ou vos projets futurs ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
