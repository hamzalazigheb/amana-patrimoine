const { createPage } = require('./_helpers');

module.exports = async function seedBlogZakatPatrimoine(prisma) {
  await createPage(prisma, 'blog/zakat-patrimoine-diversifie', {
    title: 'Zakat sur un Patrimoine Diversifié : Calcul Pratique et Complet',
    description: 'Comment calculer sa Zakat quand on a des SCPI, une assurance-vie, un PER, des actions et de l\'or ? Guide pratique avec exemples chiffrés.',
    keywords: 'zakat patrimoine diversifié, calcul zakat SCPI, zakat assurance vie, zakat PER, zakat actions, zakat or patrimoine',
  }, [
    { type: 'pageHero', content: {
      badge: 'Zakat & Patrimoine',
      title: 'Zakat sur un patrimoine diversifié : calcul pratique pas à pas',
      subtitle: 'Vous avez un livret A, des parts de SCPI, une assurance-vie, peut-être un PER et de l\'or. Comment calculer votre Zakat sur l\'ensemble de ces actifs ? Ce guide pratique vous accompagne, avec des exemples chiffrés pour chaque type d\'actif.',
      image: '/edu-heritage.png',
      ctaText: 'Utiliser le simulateur',
    } },
    { type: 'content', content: {
      label: 'Cas pratique',
      title: 'Étude de cas : patrimoine de Yassine, 42 ans, cadre',
      paragraphs: [
        'Yassine, 42 ans, ingénieur en région parisienne, possède le patrimoine suivant au 1er Ramadan 1446 (date de son Hawl) : résidence principale (480 000 €, exemptée), livret A : 12 000 €, assurance-vie sur fonds halal : 45 000 € (valeur de rachat), 50 parts de SCPI halal (valeur 24 000 €), PER halal : 18 000 € (valeur théorique), 50g d\'or non porté (valeur : 4 350 €), voiture (exemptée), dettes : mensualités de crédit immobilier restant à payer cette année : 14 400 €.',
        'Calculons sa Zakat étape par étape.',
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'Calcul',
      title: 'Calcul étape par étape',
      steps: [
        { title: 'Étape 1 : Identifier les actifs zakatable', description: 'Résidence principale → EXEMPTE (consensus des savants). Livret A 12 000 € → ZAKATABLE. Assurance-vie valeur de rachat 45 000 € → ZAKATABLE. SCPI halal valeur 24 000 € → ZAKATABLE (revenus et valeur si objectif revente/investissement). PER halal 18 000 € → ZAKATABLE selon opinion majoritaire contemporaine. Or non porté 50g × 87€/g = 4 350 € → ZAKATABLE. Crédit immobilier mensualités annuelles 14 400 € → DÉDUCTIBLE (méthode mensualité annuelle). Voiture personnelle → EXEMPTE.' },
        { title: 'Étape 2 : Calculer l\'assiette zakatable nette', description: 'Total brut zakatable = 12 000 (livret) + 45 000 (assurance-vie) + 24 000 (SCPI) + 18 000 (PER) + 4 350 (or) = 103 350 €. Dettes déductibles = 14 400 €. Assiette zakatable nette = 103 350 - 14 400 = 88 950 €.' },
        { title: 'Étape 3 : Vérifier le Nisab', description: 'Le Nisab en or 2026 ≈ 7 395 € (85g × 87 €/g). L\'assiette zakatable de Yassine (88 950 €) dépasse largement le Nisab. La Zakat est donc due.' },
        { title: 'Étape 4 : Calculer le montant de la Zakat', description: 'Zakat = 2,5% × 88 950 € = 2 223,75 €. Arrondi à 2 224 €. C\'est le montant que Yassine doit verser à des bénéficiaires éligibles (associations islamiques, personnes dans le besoin, etc.).' },
        { title: 'Étape 5 : Purification des dividendes (optionnel mais recommandé)', description: 'Si les fonds actions dans l\'assurance-vie ou le PER de Yassine ont eu 3% de revenus impurs, il doit purifier : 3% × dividendes perçus = montant à donner en plus. Cette purification est distincte de la Zakat — elle peut être combinée ou effectuée séparément.' },
      ],
    } },
    { type: 'content', content: {
      label: 'Questions courantes',
      title: 'Questions fréquentes sur la Zakat du patrimoine',
      paragraphs: [
        'Ma résidence principale est-elle zakatable ? Non. Par consensus (ijma\') de tous les savants, la résidence principale que vous occupez est exemptée de la Zakat. Seul l\'immobilier d\'investissement (locatif, SCPI) est zakatable.',
        'Dois-je inclure la valeur de mon appartement locatif ou seulement les loyers ? Les opinions divergent. L\'opinion la plus répandue en Europe : seuls les loyers perçus et non dépensés au jour du Hawl sont zakatable. Si votre objectif est la revente, la valeur du bien peut aussi être incluse.',
        'Mon PER est bloqué jusqu\'à ma retraite, dois-je quand même le déclarer ? L\'opinion majoritaire actuelle (ECFR, Sheikh Al-Qaradawi) considère que les épargnes bloquées comme le PER sont zakatable sur leur valeur théorique, car elles représentent une richesse réelle dont vous disposez ultimement. C\'est l\'opinion la plus prudente et celle que nous recommandons.',
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Comment calculer sa Zakat facilement sans erreur ?', answer: 'Utilisez notre calculateur de Zakat gratuit sur amana-patrimoine.fr. Il couvre tous les types d\'actifs (liquidités, or, actions, SCPI, assurance-vie, PER, immobilier d\'investissement, crypto), déduit les dettes éligibles, et calcule automatiquement votre Zakat nette en temps réel. Il cite les sources islamiques pour chaque catégorie.' },
    ] } },
    { type: 'cta', content: {
      title: 'Calculez votre Zakat et obtenez une synthèse personnalisée',
      subtitle: 'Notre simulateur gratuit calcule votre Zakat en temps réel, avec la possibilité de générer une synthèse complète.',
      description: 'Bilan patrimonial islamique disponible sur rendez-vous pour les patrimoines complexes.',
      ctaText: 'Calculer ma Zakat gratuitement',
      ctaLink: '/simulateurs',
    } },
  ]);
};
