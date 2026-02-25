const { createPage } = require('./_helpers');

module.exports = async function seedImmobilier(prisma) {
  await createPage(prisma, 'immobilier', {
    title: 'Investir dans l\'Immobilier | Amana Patrimoine',
    description: 'Investissement immobilier : SCPI, locatif, SCI, financement islamique. Conseil indépendant et accompagnement sur-mesure.',
    keywords: 'investissement immobilier, SCPI halal, immobilier islamique, SCI, LMNP, Paris',
  }, [
    { type: 'pageHero', content: {
      badge: 'Investissement Immobilier',
      title: 'Investir dans l\'immobilier : un pilier incontournable du patrimoine',
      subtitle: 'L\'immobilier occupe une place centrale dans une stratégie patrimoniale. Il permet un investissement tangible, stable et de générer une rente récurrente. L\'investissement immobilier ne se fait pas d\'une seule façon. En fonction de votre profil, de votre appétence au risque, de vos moyens et de nombreux facteurs, la stratégie change du tout au tout. Face à toutes les possibilités, à la complexité des montages, aux freins juridiques, fiscaux et financiers, il est nécessaire de se faire accompagner par un professionnel.',
      image: '/edu-paris.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      title: 'Une approche indépendante, personnalisée et éthique',
      paragraphs: [
        'Amana Patrimoine accompagne ses clients avec une démarche indépendante, sur-mesure et éthique.',
        'Nous sommes indépendants : nous travaillons avec des partenaires qualifiés que nous choisissons parce qu\'ils conviennent à notre clientèle. Nous n\'avons pas de biais commercial et une liberté totale dans la sélection des solutions. Notre priorité est votre satisfaction.',
        'Notre accompagnement est sur-mesure : nous débutons chaque mission par une analyse détaillée de vos besoins et de votre profil afin de vous proposer un accompagnement le plus adapté possible. Chaque détail compte : objectifs, budget, situation familiale, fiscalité.',
        'Nous respectons vos convictions : notre équipe peut vous accompagner sur des montages conformes à la finance islamique pour financer vos différents projets immobiliers.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Méthodologie',
      title: 'Un accompagnement global, du conseil à la concrétisation',
      steps: [
        { title: 'Phase 1 : Audit patrimonial et définition des objectifs', description: 'Comprendre votre situation personnelle, vos objectifs patrimoniaux, vos contraintes éthiques ou fiscales.' },
        { title: 'Phase 2 : Élaboration de la stratégie', description: 'Choix de la bonne solution : rendement, défiscalisation, localisation, transmission, diversification.' },
        { title: 'Phase 3 : Mise en oeuvre', description: 'Accompagnement pour les démarches : recherche de biens, montage juridique, financement. Mise en relation avec des partenaires de confiance (promoteurs, notaires, banques, SCPI).' },
        { title: 'Phase 4 : Suivi dans le temps', description: 'Optimisation continue. Conseil sur la transmission ou la revente.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Solutions',
      title: 'Une expertise large, couvrant l\'ensemble des possibilités immobilières',
      steps: [
        { title: 'Résidence principale', description: 'Accompagnement sur l\'achat, la fiscalité et la transmission.' },
        { title: 'Investissement locatif direct', description: 'Location nue ou meublée (LMNP), optimisation fiscale (déficit foncier, amortissement), structuration via société civile immobilière (SCI) si nécessaire.' },
        { title: 'Dispositifs fiscaux', description: 'Pinel, Malraux, Monuments historiques.' },
        { title: 'SCPI (Sociétés Civiles de Placement Immobilier)', description: 'Investissement de manière progressive et accessible, avec des versements mensuels programmés dans l\'immobilier professionnel, totalement conforme aux normes de finance islamique (sans intérêt, sans placement de trésorerie), respectant les normes ESG.' },
        { title: 'Création et structuration de SCI', description: 'Pour faciliter l\'achat collectif ou transmettre efficacement.' },
        { title: 'Immobilier à l\'étranger', description: 'Accompagnement juridique et fiscal, gestion des risques de succession internationale.' },
        { title: 'Déclarations et régularisations', description: 'IFI (Impôt sur la Fortune Immobilière), mise en conformité juridique et fiscale.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Finance Islamique',
      title: 'Finance islamique et immobilier',
      paragraphs: [
        'Nos SCPI font l\'objet d\'un audit de conformité par des comités charia (Shariah Board) reconnus.',
        'Nous garantissons : l\'absence de financement par la dette bancaire, le respect des critères ESG (Environnementaux, Sociaux et de bonne Gouvernance), la sélection rigoureuse d\'activités locatives conformes (pas de banques, d\'assurances, de bars, de casinos), un investissement totalement conforme aux normes de la finance islamique.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Comment commencer à investir dans l\'immobilier ?', answer: 'Il existe diverses stratégies pour commencer à investir dans l\'immobilier. La stratégie d\'investissement dépend d\'une multitude de facteurs : budget, localisation, objectifs, temps disponible pour la gestion, aversion au risque. Nos conseillers en gestion de patrimoine commenceront par réaliser un bilan patrimonial complet et par définir vos objectifs afin de vous accompagner au mieux. Par la suite, la stratégie à adopter et des opportunités d\'investissement pourront vous être présentées.' },
      { question: 'Qui peut investir dans l\'immobilier ?', answer: 'Tout le monde peut investir dans l\'immobilier, sans avoir recours à l\'emprunt avec intérêt. L\'investissement immobilier via SCPI est accessible avec un ticket d\'entrée modéré et des versements mensuels programmés. Nous vous proposons des stratégies patrimoniales correspondant à vos objectifs en fonction de vos capacités.' },
      { question: 'Comment investir dans l\'immobilier en conformité avec les normes de finance islamique ?', answer: 'L\'investissement dans la pierre est un investissement rassurant car très concret. La finance islamique permet l\'investissement immobilier, à la fois dans le neuf, dans l\'ancien, dans des fonds immobiliers, dans de la location gérée et autres types d\'investissement immobilier. Les outils à notre disposition sont variés et nul besoin d\'avoir recours au prêt à intérêt (riba).' },
      { question: 'Comment financer un bien immobilier ?', answer: 'Dans nos stratégies patrimoniales, nous pouvons accompagner sur les différents modes de financement disponibles en finance islamique, bien que nous ne soyons pas nous-même financeurs. Nous pouvons vous accompagner sur la structuration de vos contrats de financement, proposer des solutions de financement Shariah Compliant dans vos stratégies patrimoniales (Mourabaha, Istithna, Musharaka). Prenons rendez-vous pour parler de vos projets.' },
    ] } },
    { type: 'reassurance', content: { items: [
      { title: 'Conseil expert', description: 'Accompagnement par nos experts patrimoniaux et financiers.' },
      { title: 'Sur-mesure', description: 'Un suivi personnalisé pour atteindre vos objectifs.' },
      { title: 'Secret professionnel', description: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
    ] } },
    { type: 'cta', content: {
      title: 'Parlons de votre projet immobilier',
      subtitle: 'Vous souhaitez investir dans l\'immobilier ? Optimiser votre fiscalité ? Construire une stratégie conforme à vos convictions ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
