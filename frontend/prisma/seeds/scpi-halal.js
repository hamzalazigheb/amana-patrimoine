const { createPage } = require('./_helpers');

module.exports = async function seedScpiHalal(prisma) {
  await createPage(prisma, 'scpi-halal', {
    title: 'SCPI Halal : Investir dans l\'Immobilier sans Riba',
    description: 'SCPI halal conformes à la finance islamique : revenus immobiliers sans intérêt, critères charia, ESG. Investissez dans la pierre sans riba. Conseil CGP Paris.',
    keywords: 'SCPI halal, SCPI islamique, SCPI charia, SCPI sans riba, investissement immobilier halal, revenus locatifs halal',
  }, [
    { type: 'pageHero', content: {
      badge: 'SCPI Halal',
      title: 'SCPI Halal : percevez des revenus immobiliers sans riba',
      subtitle: 'Les SCPI halal (Sociétés Civiles de Placement Immobilier conformes) permettent d\'investir dans l\'immobilier professionnel de manière accessible, progressive et totalement conforme aux principes de la finance islamique. Pas de dette bancaire, pas d\'intérêt, validation par comité charia.',
      image: '/edu-paris.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Définition',
      title: 'Qu\'est-ce qu\'une SCPI halal ?',
      paragraphs: [
        'Une SCPI (Société Civile de Placement Immobilier) est un véhicule d\'investissement collectif qui permet à des particuliers d\'acheter des parts dans un portefeuille d\'immobilier professionnel (bureaux, commerces, entrepôts, cliniques, écoles). En échange, les investisseurs perçoivent des revenus trimestriels sous forme de loyers.',
        'Une SCPI halal est une SCPI qui respecte trois critères supplémentaires pour être conforme à la finance islamique : 1) Pas de financement par dette bancaire à intérêt (la SCPI achète les biens avec les capitaux des investisseurs), 2) Exclusion des locataires exerçant des activités haram (alcool, banques conventionnelles, jeux de hasard), 3) Validation et audit régulier par un comité charia reconnu.',
        'Les revenus distribués proviennent uniquement des loyers perçus par les biens détenus — jamais d\'intérêts. C\'est le modèle de l\'investissement immobilier pur, sans effet de levier conventionnel.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Critères',
      title: 'Les critères de conformité d\'une SCPI halal',
      steps: [
        { title: 'Absence de financement par dette', description: 'La SCPI ne recourt pas à l\'emprunt bancaire à intérêt pour acquérir ses actifs. Elle utilise exclusivement les capitaux apportés par les associés. C\'est la condition la plus importante et la plus distinctive des SCPI halal.' },
        { title: 'Filtrage sectoriel des locataires', description: 'Les biens immobiliers ne sont pas loués à des entreprises dont l\'activité principale est haram : banques conventionnelles, assurances conventionnelles, débits de boisson, bureaux de tabac, casinos, etc. Ce filtrage est vérifié lors de l\'entrée de chaque locataire.' },
        { title: 'Audit par un Shariah Board', description: 'Un comité charia indépendant — composé de savants islamiques et d\'experts en finance — audite régulièrement les actifs, les locataires et les pratiques de la SCPI. Un certificat de conformité est émis et renouvelé périodiquement.' },
        { title: 'Respect des critères ESG', description: 'Les SCPI halal que nous recommandons respectent également les critères Environnementaux, Sociaux et de bonne Gouvernance (ESG). Cette double conformité — charia et ESG — garantit un investissement durable et responsable.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Avantages',
      title: 'Pourquoi investir en SCPI halal ?',
      steps: [
        { title: 'Accessibilité et progressivité', description: 'Vous pouvez commencer à investir dès quelques milliers d\'euros, avec des versements mensuels programmés. Pas besoin d\'un capital important pour se constituer un patrimoine immobilier diversifié.' },
        { title: 'Revenus trimestriels réguliers', description: 'Les loyers perçus par la SCPI vous sont redistribués chaque trimestre, proportionnellement au nombre de parts détenues. Ces revenus sont stables et prévisibles sur le long terme.' },
        { title: 'Diversification immédiate', description: 'En achetant des parts de SCPI, vous investissez indirectement dans des dizaines, voire des centaines d\'immeubles répartis géographiquement. Cette diversification réduit le risque lié à un bien unique.' },
        { title: 'Aucune gestion locative', description: 'La société de gestion s\'occupe de tout : acquisition des biens, gestion des locataires, entretien, travaux. Vous percevez vos revenus sans aucune contrainte de gestion.' },
        { title: 'Conformité charia garantie', description: 'Chaque SCPI halal que nous recommandons dispose d\'un certificat de conformité émis par un comité charia reconnu. Vous investissez avec la certitude que vos revenus sont 100% halal.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Quelle est la différence entre une SCPI classique et une SCPI halal ?', answer: 'La principale différence réside dans le financement. Une SCPI classique peut recourir à l\'emprunt bancaire à intérêt pour amplifier ses acquisitions (effet de levier). Une SCPI halal n\'y recourt pas : elle achète ses biens uniquement avec les fonds des investisseurs. Cela implique généralement un rendement légèrement différent, mais surtout une conformité totale avec les principes islamiques. De plus, le filtrage des locataires et l\'audit charia sont spécifiques aux SCPI halal.' },
      { question: 'Quel rendement peut-on attendre d\'une SCPI halal ?', answer: 'Les SCPI halal que nous recommandons affichent des taux de distribution annuels compris entre 4% et 6% (avant fiscalité). Ces rendements sont comparables, voire supérieurs, à ceux de nombreuses SCPI classiques. Attention : les performances passées ne préjugent pas des performances futures.' },
      { question: 'Peut-on intégrer des SCPI halal dans une assurance-vie ou un PER ?', answer: 'Oui, dans la mesure où l\'assureur propose ces SCPI en unités de compte. Nous sélectionnons des contrats d\'assurance-vie et des PER qui permettent d\'investir sur des SCPI halal. Cette combinaison est particulièrement avantageuse : elle conjugue la conformité charia, la fiscalité avantageuse de l\'enveloppe (assurance-vie ou PER), et les revenus immobiliers.' },
      { question: 'Comment sortir d\'une SCPI halal ?', answer: 'La revente de parts de SCPI peut prendre quelques semaines à quelques mois selon la liquidité du marché secondaire. Ce n\'est pas un investissement liquide comme une action en bourse. Il faut envisager un horizon d\'investissement minimum de 8 à 10 ans pour optimiser les rendements et limiter les frais d\'entrée.' },
    ] } },
    { type: 'cta', content: {
      title: 'Investissez en SCPI halal avec nos experts',
      subtitle: 'Vous souhaitez vous constituer des revenus immobiliers halal ? Diversifier votre patrimoine sans riba ?',
      description: 'Prenez rendez-vous pour un premier échange gratuit. Nous analysons votre situation et vous recommandons les SCPI les plus adaptées.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
