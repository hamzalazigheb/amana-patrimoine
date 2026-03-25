const { createPage } = require('./_helpers');

module.exports = async function seedBlogPerHalal(prisma) {
  await createPage(prisma, 'blog/per-halal-retraite-islamique', {
    title: 'PER Halal : Préparez votre Retraite et Réduisez vos Impôts (2026)',
    description: 'Le PER halal expliqué : comment déduire ses versements, choisir des fonds conformes, préparer sa retraite islamique. Guide pratique 2026.',
    keywords: 'PER halal 2026, plan épargne retraite islamique, PER Shariah Compliant, retraite islamique France, déduction fiscale PER halal',
  }, [
    { type: 'pageHero', content: {
      badge: 'Retraite Islamique',
      title: 'PER halal 2026 : préparez votre retraite islamique en réduisant vos impôts',
      subtitle: 'Le Plan d\'Épargne Retraite (PER) est l\'outil fiscal le plus puissant pour préparer sa retraite en France. Il peut être rendu 100% halal en choisissant les bons supports. Déduction fiscale immédiate, fonds Shariah Compliant, sortie en capital à la retraite.',
      image: '/Site 29.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'Rappel',
      title: 'Qu\'est-ce que le PER et pourquoi est-il si puissant fiscalement ?',
      paragraphs: [
        'Le Plan d\'Épargne Retraite (PER) est un produit d\'épargne créé par la loi PACTE en 2019. Son principal avantage : les versements effectués sont déductibles du revenu imposable, dans la limite d\'un plafond annuel (généralement 10% des revenus professionnels, plafonné à 35 194 € en 2026).',
        'Concrètement, si vous versez 10 000 € sur un PER et que vous êtes dans la tranche marginale d\'imposition (TMI) à 30%, vous économisez 3 000 € d\'impôts dès l\'année suivante. À 41%, c\'est 4 100 € d\'économie. À 45%, c\'est 4 500 €.',
        'Le capital est généralement bloqué jusqu\'à la retraite (sauf accidents de la vie et achat de résidence principale), ce qui incite à une épargne de long terme. À la retraite, vous pouvez sortir en capital (imposition sur les gains uniquement) ou en rente. La sortie en capital est généralement la plus avantageuse.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Halal',
      title: 'Comment rendre son PER 100% halal ?',
      steps: [
        { title: 'Choisir les bonnes unités de compte', description: 'Le PER est une enveloppe qui peut accueillir différents supports d\'investissement. Pour le rendre halal, il suffit de sélectionner uniquement des unités de compte Shariah Compliant : fonds actions screentés (Franklin Templeton Shariah, HSBC Islamic), SCPI halal (si l\'assureur les propose), fonds obligataires sukuk. Évitez absolument le fonds en euros garanti (génère des intérêts).' },
        { title: 'Vérifier la conformité auprès de l\'assureur', description: 'Tous les assureurs ne proposent pas de PER avec des unités de compte halal. Chez Amana Patrimoine, nous avons sélectionné des partenaires assureurs qui offrent un choix suffisant d\'unités de compte Shariah Compliant. Nous vous guidons dans cette sélection.' },
        { title: 'Éviter les frais excessifs', description: 'Les frais des unités de compte (frais de gestion annuels) varient de 0,2% à 2,5%. Optez pour des fonds avec des frais raisonnables (moins de 1,5% pour des fonds gérés activement, moins de 0,5% pour des ETF Shariah Compliant). Ces frais impactent significativement la performance sur le long terme.' },
        { title: 'Purification annuelle des dividendes', description: 'Même les fonds Shariah Compliant peuvent contenir une petite proportion de revenus impurs (généralement moins de 5%). Il faut purifier ces revenus annuellement en donnant la proportion correspondante à des associations caritatives. Chez Amana Patrimoine, nous calculons cette proportion pour vous.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Simulation',
      title: 'Simulation : l\'impact du PER halal sur 20 ans',
      paragraphs: [
        'Voici une simulation pour Khadija, 38 ans, cadre, TMI à 30%, qui verse 500 €/mois sur un PER halal avec un rendement cible de 5% net annuel.',
        'Versement mensuel : 500 € | Versements annuels : 6 000 € | Économie d\'impôts annuelle : 1 800 € (30% × 6 000 €) | Effort réel après déduction fiscale : 350 €/mois.',
        'Après 20 ans : Capital constitué ≈ 198 000 € (hypothèse 5%/an). Économies d\'impôts cumulées : 36 000 €. Capital net de la déduction fiscale non réinvestie ≈ 162 000 €. Ce capital lui permettra de percevoir un complément de revenu mensuel de 500 à 700 € pendant sa retraite.',
        '⚠ Avertissement : les simulations sont basées sur des hypothèses de rendement. Les performances passées ne préjugent pas des performances futures. Investir comporte un risque de perte en capital.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Peut-on avoir plusieurs PER ?', answer: 'Oui, la loi ne limite pas le nombre de PER. Mais les plafonds de déduction sont cumulés sur l\'ensemble des PER détenus. Il peut être judicieux d\'avoir un PER individuel pour vous et un pour votre conjoint, afin de doubler les plafonds au niveau du foyer fiscal.' },
      { question: 'Que se passe-t-il en cas de décès avant la retraite ?', answer: 'Le capital accumulé sur le PER est versé aux bénéficiaires désignés. S\'il s\'agit du conjoint ou d\'un partenaire de PACS, les fonds sont exonérés de droits de succession. Pour les autres bénéficiaires, la fiscalité est la même que l\'assurance-vie (152 500 €/bénéficiaire en franchise si versements avant 70 ans). C\'est un avantage souvent méconnu du PER.' },
    ] } },
    { type: 'cta', content: {
      title: 'Ouvrez votre PER halal dès aujourd\'hui',
      subtitle: 'Plus vous commencez tôt, plus l\'effet de capitalisation est puissant. Et plus vous économisez d\'impôts.',
      description: 'Premier rendez-vous gratuit. Simulation personnalisée de votre PER halal.',
      ctaText: 'Calculer mes économies d\'impôts',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
