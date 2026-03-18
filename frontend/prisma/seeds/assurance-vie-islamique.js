const { createPage } = require('./_helpers');

module.exports = async function seedAssuranceVieIslamique(prisma) {
  await createPage(prisma, 'assurance-vie-islamique', {
    title: 'Assurance-Vie Islamique : Épargner et Transmettre sans Intérêt',
    description: 'Assurance-vie islamique halal : épargne sur fonds Shariah Compliant, transmission optimisée hors succession, sans riba. Conseil CGP expert Paris.',
    keywords: 'assurance vie islamique, assurance vie halal, épargne islamique, takaful France, assurance vie sans intérêt, transmission halal',
  }, [
    { type: 'pageHero', content: {
      badge: 'Assurance-Vie Islamique',
      title: 'Assurance-vie islamique : épargnez et transmettez sans riba',
      subtitle: 'L\'assurance-vie est le placement préféré des Français. Elle peut être rendue 100% conforme à la finance islamique en sélectionnant les bonnes unités de compte. Épargne sur fonds halal, transmission optimisée hors succession, fiscalité avantageuse après 8 ans.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Définition',
      title: 'Qu\'est-ce que l\'assurance-vie islamique ?',
      paragraphs: [
        'L\'assurance-vie islamique (ou assurance-vie halal) est un contrat d\'assurance-vie classique dont les supports d\'investissement sont exclusivement des fonds conformes à la finance islamique. Contrairement à ce que son nom pourrait laisser entendre, ce n\'est pas un contrat d\'assurance décès au sens strict — c\'est avant tout un outil d\'épargne à long terme.',
        'La conformité islamique de l\'assurance-vie repose sur deux éléments : premièrement, les unités de compte (fonds d\'investissement) doivent être Shariah Compliant — c\'est-à-dire screentées selon les critères islamiques (exclusion sectorielle, ratio d\'endettement, purification des revenus impurs). Deuxièmement, le contrat ne doit pas inclure de fonds en euros garanti classique (qui génère des intérêts fixes), ou du moins cette part doit être minimisée.',
        'Chez Amana Patrimoine, nous sélectionnons des contrats d\'assurance-vie permettant d\'investir sur une large gamme d\'unités de compte halal : SCPI conformes, fonds actions Shariah Compliant, fonds obligataires sukuk, fonds immobiliers éthiques.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Avantages',
      title: 'Les avantages de l\'assurance-vie islamique',
      steps: [
        { title: 'Fiscalité avantageuse après 8 ans', description: 'Après 8 ans de détention, les gains bénéficient d\'un abattement annuel de 4 600 € (ou 9 200 € pour un couple). Au-delà, l\'imposition est de 7,5% + prélèvements sociaux (17,2%), soit une pression fiscale bien inférieure à la flat tax de 30%.' },
        { title: 'Transmission optimisée hors succession', description: 'Les capitaux versés sur une assurance-vie ne font pas partie de la succession civile. Chaque bénéficiaire désigné peut recevoir jusqu\'à 152 500 € en franchise de droits de succession (pour les versements effectués avant 70 ans). C\'est un outil de transmission exceptionnel.' },
        { title: 'Disponibilité du capital', description: 'Contrairement au PER, le capital investi en assurance-vie est disponible à tout moment. Vous pouvez effectuer des rachats partiels ou totaux sans condition, même avant 8 ans (avec une fiscalité moins avantageuse). Cette liquidité en fait un outil très flexible.' },
        { title: 'Conformité charia garantie', description: 'En sélectionnant les bonnes unités de compte, l\'intégralité de votre épargne peut être investie sur des supports halal. Aucun investissement dans des secteurs haram, aucun intérêt généré, validation par Shariah Board.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Fonctionnement',
      title: 'Comment fonctionne une assurance-vie halal ?',
      steps: [
        { title: 'Ouverture du contrat', description: 'Vous ouvrez un contrat d\'assurance-vie auprès d\'un assureur partenaire (Suravenir, Vie Plus, HSBC Vie, etc.). Chez Amana Patrimoine, nous avons sélectionné des assureurs proposant des unités de compte halal.' },
        { title: 'Choix des unités de compte', description: 'Vous investissez sur des unités de compte Shariah Compliant : fonds actions filtrés, SCPI halal, fonds immobiliers éthiques, sukuk. Nous vous aidons à construire une allocation adaptée à votre profil de risque et à votre horizon.' },
        { title: 'Versements réguliers ou ponctuels', description: 'Vous pouvez effectuer des versements libres ou programmer des versements mensuels automatiques. Ces versements sont investis immédiatement sur vos unités de compte.' },
        { title: 'Désignation des bénéficiaires', description: 'Vous désignez librement les bénéficiaires en cas de décès. La clause bénéficiaire peut être rédigée sur-mesure pour respecter vos volontés et optimiser la transmission selon vos convictions.' },
        { title: 'Rachats et sortie', description: 'Vous pouvez effectuer un rachat partiel ou total à tout moment. Après 8 ans, la fiscalité devient particulièrement avantageuse. À votre décès, les capitaux sont versés aux bénéficiaires désignés, hors succession.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'L\'assurance-vie est-elle halal ?', answer: 'Une assurance-vie peut être halale à condition que ses supports d\'investissement soient exclusivement composés de fonds Shariah Compliant. Le fonds en euros classique (qui génère des intérêts fixes garantis) n\'est pas conforme. En revanche, un contrat en unités de compte 100% investies sur des fonds halal (actions screentées, SCPI halal, sukuk) est conforme. Chez Amana Patrimoine, nous sélectionnons les contrats et les unités de compte pour garantir cette conformité.' },
      { question: 'Quelle est la différence entre assurance-vie islamique et takaful ?', answer: 'Le takaful est le modèle islamique d\'assurance pure (protection en cas de décès/invalidité). L\'assurance-vie islamique au sens courant en France est plutôt un contrat d\'épargne et de capitalisation à long terme dont les supports sont halal. Ce n\'est pas du takaful au sens strict, mais c\'est ce qui est accessible en France via les assureurs agréés.' },
      { question: 'Peut-on transmettre son assurance-vie selon les règles islamiques ?', answer: 'Oui. La clause bénéficiaire de l\'assurance-vie peut être rédigée de manière à respecter vos volontés, y compris en tenant compte des proportions islamiques (ta\'sib). Nos conseillers maîtrisent les règles successorales islamiques et le droit français pour vous aider à rédiger une clause bénéficiaire qui respecte les deux.' },
      { question: 'Quel est le montant minimum pour ouvrir une assurance-vie islamique ?', answer: 'Le ticket d\'entrée varie selon les contrats : de 300 € à 5 000 € en versement initial, avec la possibilité de mettre en place des versements mensuels dès 50-100 €. Nous vous orientons vers les contrats les plus adaptés à votre capacité d\'épargne.' },
    ] } },
    { type: 'cta', content: {
      title: 'Ouvrez votre assurance-vie islamique',
      subtitle: 'Vous souhaitez épargner à long terme en respectant vos convictions ? Optimiser la transmission de votre patrimoine ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
