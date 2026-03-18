const { createPage } = require('./_helpers');

module.exports = async function seedLexique(prisma) {
  await createPage(prisma, 'lexique', {
    title: 'Lexique de la Finance Islamique - Termes et Définitions',
    description: 'Glossaire complet de la finance islamique : riba, mudaraba, musharaka, sukuk, takaful, mourabaha, ijara, nisab, hawl. Définitions claires et sources islamiques.',
    keywords: 'lexique finance islamique, glossaire finance islamique, définition riba, mudaraba, musharaka, sukuk, takaful, mourabaha',
  }, [
    { type: 'pageHero', content: {
      badge: 'Lexique',
      title: 'Lexique de la finance islamique : tous les termes essentiels',
      subtitle: 'Riba, mudaraba, musharaka, sukuk, takaful, gharar, ijara... La finance islamique possède son propre vocabulaire. Ce lexique vous donne des définitions claires, pratiques et sourcées pour comprendre les concepts fondamentaux.',
      image: '/edu-heritage.png',
      ctaText: 'Prendre rendez-vous',
    } },
    { type: 'content', content: {
      label: 'A – G',
      title: 'Les termes fondamentaux (A à G)',
      steps: [
        { title: 'Amanah (أمانة) — La confiance', description: 'Principe islamique fondamental désignant la fiducie, la loyauté et la responsabilité. En finance islamique, un gestionnaire de fonds est considéré comme un amin (dépositaire de confiance) vis-à-vis des capitaux qui lui sont confiés. L\'amanah implique la transparence et l\'honnêteté dans toutes les transactions.' },
        { title: 'Bay\' (بيع) — La vente', description: 'Contrat de vente islamique. Pour être valide, il doit porter sur un objet licite (halal), existant au moment de la vente (ou livrable à terme avec conditions précises), avec un prix connu et accepté par les deux parties. La bay\' est la base de nombreux produits financiers islamiques (mourabaha, salam, istisna\').' },
        { title: 'Fatwa (فتوى) — Avis juridique islamique', description: 'Opinion émise par un savant islamique qualifié (mufti ou faqih) sur une question de droit islamique. En finance islamique, les Shariah Boards émettent des fatwas pour certifier la conformité des produits financiers. Une fatwa n\'est pas forcément unanime : différents savants peuvent avoir des avis divergents sur un même produit.' },
        { title: 'Gharar (غرر) — L\'incertitude excessive', description: 'Terme désignant l\'incertitude, l\'ambiguïté ou le risque excessif dans un contrat. Le gharar est interdit en finance islamique car il peut conduire à des injustices. Il se distingue du risque commercial normal (autorisé) par son caractère excessif ou manipulatoire. Les produits dérivés spéculatifs, certains types d\'assurance-vie conventionnels et les ventes à découvert sont considérés comme contenant du gharar.' },
      ],
    } },
    { type: 'content', content: {
      background: 'beige',
      label: 'H – M',
      title: 'Termes essentiels (H à M)',
      steps: [
        { title: 'Halal (حلال) — Licite', description: 'Ce qui est autorisé par la loi islamique. En finance, un investissement halal respecte les interdictions du riba, du gharar et du maysir, et n\'est pas dans un secteur haram. L\'opposé est haram (interdit). Il existe aussi une zone intermédiaire : le makruh (répréhensible mais pas formellement interdit).' },
        { title: 'Hawl (حول) — Année lunaire', description: 'Période d\'un an lunaire (354 jours) pendant laquelle un bien doit être possédé au-dessus du Nisab pour être soumis à la Zakat. Le Hawl commence le jour où votre patrimoine atteint ou dépasse le Nisab pour la première fois.' },
        { title: 'Ijara (إجارة) — Leasing islamique', description: 'Contrat de location islamique dans lequel la banque ou l\'institution financière achète un bien et le loue au client pour une période déterminée. Équivalent islamique du crédit-bail ou du leasing. Utilisé pour le financement immobilier, l\'acquisition de véhicules ou d\'équipements.' },
        { title: 'Istisna\' (استصناع) — Contrat de fabrication', description: 'Contrat dans lequel une partie s\'engage à fabriquer ou construire un bien selon des spécifications précises, pour un prix convenu d\'avance. Utilisé notamment pour le financement de la construction immobilière. Les paiements peuvent être échelonnés.' },
        { title: 'Mourabaha (مرابحة) — Vente à marge', description: 'Structure de financement où la banque achète un bien au comptant, puis le revend au client à un prix majoré d\'une marge fixe (profit), payable en une ou plusieurs fois. C\'est l\'équivalent islamique du crédit immobilier. La marge est fixée dès le début et ne fluctue pas, contrairement à un taux d\'intérêt variable.' },
        { title: 'Mudaraba (مضاربة) — Commandite', description: 'Contrat de partenariat où l\'un apporte le capital (rab al-mal) et l\'autre le travail et l\'expertise (mudarib). Les profits sont partagés selon une clé de répartition convenue d\'avance. Les pertes sont supportées uniquement par l\'apporteur de capital (sauf faute du gestionnaire). C\'est la base de nombreux fonds d\'investissement islamiques.' },
        { title: 'Musharaka (مشاركة) — Partenariat', description: 'Contrat d\'association où deux parties ou plus apportent du capital et gèrent ensemble une activité. Les profits et les pertes sont partagés proportionnellement aux apports (ou selon accord). La musharaka dégressive est utilisée pour le financement immobilier : la banque et l\'acheteur co-possèdent le bien, et l\'acheteur rachète progressivement la part de la banque.' },
        { title: 'Maysir (ميسر) — Jeu de hasard', description: 'Terme désignant le jeu de hasard et toute forme de spéculation assimilée. Interdit en finance islamique car il génère de la richesse sans activité productive et implique que le gain d\'une partie se fait nécessairement au détriment de l\'autre.' },
      ],
    } },
    { type: 'content', content: {
      label: 'N – Z',
      title: 'Termes pratiques (N à Z)',
      steps: [
        { title: 'Nisab (نصاب) — Seuil minimum de richesse', description: 'Seuil minimum de patrimoine zakatable au-delà duquel la Zakat devient obligatoire. Exprimé en or (85g ≈ 7 395 €) ou en argent (595g ≈ 550 €) selon les cours actuels. La majorité des savants contemporains recommandent le Nisab en or, plus protecteur pour les petits patrimoines.' },
        { title: 'Riba (ربا) — L\'intérêt / l\'usure', description: 'Terme arabe désignant toute forme d\'augmentation ou d\'excédent injustifié dans un échange ou un prêt. Interdit explicitement dans le Coran (Sourate Al-Baqarah 2:275-279). Il existe deux types : riba al-nasi\'a (intérêt sur les prêts, le plus courant) et riba al-fadl (échange inégal de biens de même nature). L\'intérêt bancaire conventionnel est le riba le plus répandu.' },
        { title: 'Sukuk (صكوك) — Obligations islamiques', description: 'Équivalent islamique des obligations. Les sukuk représentent une part dans la propriété d\'un actif réel (immeuble, infrastructure, etc.) et génèrent un revenu fondé sur les flux de cet actif (loyers, dividendes) et non sur des intérêts. Les principales structures de sukuk sont : sukuk al-ijara, sukuk al-mudaraba, sukuk al-musharaka.' },
        { title: 'Takaful (تكافل) — Assurance islamique', description: 'Système d\'assurance coopérative islamique basé sur la contribution mutuelle et le partage du risque. Chaque participant verse une contribution dans un fonds commun. En cas de sinistre, l\'indemnisation provient de ce fonds. L\'opérateur takaful gère le fonds contre rémunération (wakala) ou avec participation aux profits (mudaraba). Différent de l\'assurance conventionnelle (basée sur le contrat aléatoire).' },
        { title: 'Zakat (زكاة) — L\'aumône obligatoire', description: 'Troisième pilier de l\'islam. Obligation pour tout musulman possédant un patrimoine supérieur au Nisab depuis un Hawl complet. Le taux est de 2,5% de la richesse zakatable. Les 8 bénéficiaires sont définis dans la Sourate At-Tawbah (9:60). La Zakat est un droit des pauvres sur la richesse des riches, pas une charité volontaire.' },
        { title: 'Shariah Board / Comité Charia', description: 'Organe indépendant composé de savants islamiques et d\'experts en finance, chargé d\'auditer la conformité des produits financiers islamiques. Émet des fatwas (avis) sur les produits soumis à examen. Principaux organismes de référence : AAOIFI, IFSB, ECFR. Les grandes maisons de gestion ont souvent leur propre Shariah Board.' },
      ],
    } },
    { type: 'faq', content: { items: [
      { question: 'Quelle est la différence entre finance islamique et finance éthique (ISR) ?', answer: 'La finance islamique et la finance ISR (Investissement Socialement Responsable) partagent des principes communs : exclusion de secteurs néfastes, promotion de l\'économie réelle, transparence. Mais elles diffèrent sur plusieurs points. La finance islamique est fondée sur des règles religieuses (charia) et intègre des critères spécifiques comme l\'interdiction du riba et des ratios d\'endettement limités. La finance ISR est fondée sur des critères ESG (environnement, social, gouvernance) sans référence religieuse. Un fonds peut être à la fois islamique et ISR.' },
      { question: 'Le bitcoin et les cryptomonnaies sont-ils halal ?', answer: 'C\'est un sujet de débat actif parmi les savants. La majorité des savants contemporains (ECFR, AAOIFI) considèrent que les cryptomonnaies peuvent être zakatable (comme des actifs). Sur leur licéité pour l\'investissement, les avis divergent : certains les autorisent (comme des marchandises), d\'autres les déconseillent fortement en raison du gharar et de la spéculation excessive. Il est recommandé de consulter un savant de confiance.' },
    ] } },
    { type: 'cta', content: {
      title: 'Des questions sur la finance islamique ?',
      subtitle: 'Vous souhaitez mieux comprendre les solutions disponibles pour votre patrimoine ? Nos experts vous accompagnent.',
      description: 'Prenez rendez-vous pour un premier échange gratuit et sans engagement.',
      ctaText: 'Prendre rendez-vous',
      ctaLink: 'https://calendly.com/amana-patrimoine/30min',
    } },
  ]);
};
