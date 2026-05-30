export const PARCOURS_STEPS = [
    {
        n: 1,
        label: 'Votre objectif',
        sub: 'Le projet qui guide la stratégie',
        mins: '2 min',
        title: 'Quel est votre objectif principal ?',
        helper: 'Une seule réponse — vous pourrez préciser plus tard.',
    },
    {
        n: 2,
        label: 'Votre situation',
        sub: 'Chiffres clés de votre patrimoine',
        mins: '3 min',
        title: 'Votre situation financière',
        helper: 'Vos données sont chiffrées et hébergées en France.',
    },
    {
        n: 3,
        label: 'Vos convictions',
        sub: 'Critères éthiques et religieux',
        mins: '2 min',
        title: 'Vos convictions et contraintes',
        helper: 'Nous calibrons votre allocation en fonction.',
    },
    {
        n: 4,
        label: 'Votre RDV',
        sub: '30 min avec un conseiller',
        mins: 'Programmation',
        title: 'Programmons votre rendez-vous',
        helper: 'Votre bilan vous sera présenté en direct par votre conseiller.',
    },
];

export const TIERS = [
    {
        id: 'essentiel',
        name: 'Essentiel',
        tagline: 'Pour démarrer simplement',
        rangeShort: '< 45 k€',
        priceLine: "0% Sans frais d'entrée",
        highlight: false,
        features: [
            'Onboarding 100 % digital en 10 min',
            'Versements libres dès 50 €',
            'Assurance-vie compatible finance islamique',
            'SCPI sélectionnées selon nos critères',
            'Tableau de bord en ligne',
            'Conseil à la carte',
        ],
    },
    {
        id: 'patrimoniale',
        name: 'Patrimoniale',
        tagline: "L'offre la plus choisie",
        rangeShort: '45 k€ – 1 M€',
        priceLine: "Frais d'entrée plafonnés à 2,5 %",
        highlight: true,
        features: [
            "Tout l'Essentiel, plus :",
            'Conseiller patrimonial dédié',
            'Bilan patrimonial 360° présenté en RDV',
            'Cashback sur chaque souscription',
            'SCPI · OPCI · sukuk · actions filtrées',
            'Optimisation fiscale (IR & IS)',
            'Préparation retraite & succession',
            'Revue annuelle de portefeuille',
        ],
    },
    {
        id: 'gestion-privee',
        name: 'Gestion privée',
        tagline: 'Ingénierie patrimoniale globale',
        rangeShort: '> 1 M€',
        priceLine: 'Honoraires sur mesure',
        highlight: false,
        features: [
            "Tout l'offre Patrimoniale, plus :",
            'Family office complet',
            'Ingénierie juridique sur mesure',
            'Holding · SCI · démembrement',
            'Investissements directs (capital-investissement)',
            "Articulation droit civil / fara'id",
            "Comité d'investissement trimestriel",
            'Sélection validée par notre partenaire Sakina',
        ],
    },
];

export const DELIVERABLES = [
    {
        t: 'Confirmation immédiate',
        d: 'Email de confirmation avec le créneau retenu, ajout calendrier automatique (Google, Outlook, Apple).',
        tag: 'Sous 1 minute',
    },
    {
        t: 'Préparation de votre dossier',
        d: 'Votre conseiller analyse vos réponses, identifie les axes prioritaires et prépare vos scénarios chiffrés.',
        tag: 'Sous 48 h',
    },
    {
        t: 'Présentation en RDV (30 min)',
        d: 'Bilan patrimonial, allocation cible, axes d’optimisation, succession — expliqués en visio ou par téléphone.',
        tag: '30 min en visio',
    },
    {
        t: 'Vous décidez de la suite',
        d: 'Aucune signature en RDV. Vous repartez avec votre bilan ; nous attendons votre retour si vous souhaitez avancer.',
        tag: 'Sans engagement',
    },
];

export const WHY_AMANA_COLUMNS = [
    {
        who: 'Banque traditionnelle',
        sub: 'BNP, Société Générale, Crédit Agricole…',
        highlight: false,
        points: [
            { ok: false, t: 'Produits compatibles finance islamique', sub: 'Quasi inexistants en France' },
            { ok: false, t: 'Spécialiste dédié', sub: 'Conseillers généralistes uniquement' },
            { ok: false, t: 'Filtrage sectoriel', sub: 'Aucun par défaut' },
            { ok: true, t: "Réseau d'agences", sub: 'Oui, large couverture' },
        ],
    },
    {
        who: 'CGP conventionnel',
        sub: 'Conseiller en gestion de patrimoine classique',
        highlight: false,
        points: [
            { ok: 'maybe', t: 'Produits compatibles disponibles', sub: 'Parfois, sans expertise réelle' },
            { ok: false, t: 'Spécialiste finance islamique', sub: 'Rare, sans formation dédiée' },
            { ok: false, t: 'Partenaire conformité religieuse', sub: 'Aucun, ou validation générique' },
            { ok: true, t: 'Compétence patrimoniale', sub: 'Oui sur la partie civile / fiscale' },
        ],
    },
    {
        who: 'Robo-advisor halal',
        sub: "Apps mobiles d'investissement halal",
        highlight: false,
        points: [
            { ok: true, t: 'Spécialisation halal', sub: "Oui, c'est leur ADN" },
            { ok: false, t: 'Conseil patrimonial', sub: 'Aucun — juste un compte titre' },
            { ok: false, t: 'Optimisation fiscale', sub: 'Non, hors périmètre' },
            { ok: false, t: "Succession · fara'id", sub: 'Aucun accompagnement' },
        ],
    },
    {
        who: 'Amana Patrimoine',
        sub: 'Cabinet spécialisé · partenariat Sakina Consulting',
        highlight: true,
        points: [
            { ok: true, t: 'Spécialisation finance islamique', sub: "Notre ADN, depuis l'origine" },
            { ok: true, t: 'Partenaire conformité religieuse', sub: 'Sakina Consulting, cas par cas' },
            { ok: true, t: 'Conseil patrimonial 360°', sub: "Civil, fiscal, succession, fara'id" },
            { ok: true, t: 'Régulation française', sub: 'ORIAS · ANACOFI · cabinet contrôlable' },
        ],
    },
];

export const CHARIA_PILLARS = [
    {
        t: 'Sans riba',
        d: "Aucune rémunération fixée d'avance sur le capital. Chaque rendement repose sur un actif réel ou un partage du risque légitime.",
        ex: "Concrètement : pas de livret bancaire, pas d'obligations classiques, pas de prêts à intérêts.",
    },
    {
        t: 'Sans gharar excessif',
        d: 'Contrats clairs, objet identifié, exposition au risque maîtrisée. Pas de spéculation sans contrepartie réelle.',
        ex: 'Concrètement : pas de produits dérivés purs, pas de short-selling, pas de marges sur effet de levier.',
    },
    {
        t: 'Filtrage sectoriel',
        d: 'Exclusion des secteurs interdits selon les principes majoritaires de la finance islamique appliquée.',
        ex: 'Exclus : alcool, tabac, jeux, armement offensif, pornographie, finance conventionnelle.',
    },
    {
        t: 'Partenariat Sakina Consulting',
        d: 'Nos critères et nos sélections de supports sont définis avec Sakina Consulting, cabinet spécialisé en finance islamique appliquée — pour faire le pont entre doctrine et réalité de marché.',
        ex: 'Le partenariat couvre la méthodologie, le cadre éthique appliqué et la documentation de chaque support proposé.',
    },
];

export const TESTIMONIALS = [
    {
        q: "J'ai fait le parcours en ligne un dimanche soir. Mardi midi, mon conseiller m'a présenté mon bilan en direct — toutes mes questions ont eu une réponse immédiate. Aucune autre expérience comparable.",
        who: 'Younès M.',
        what: 'Dirigeant PME',
        tier: 'Patrimoniale',
        initials: 'YM',
    },
    {
        q: "J'ai démarré avec Essentiel en sortant des études. J'ai basculé sur Patrimoniale trois ans plus tard — aucun frottement, aucun changement d'interlocuteur.",
        who: 'Salma B.',
        what: 'Ingénieure',
        tier: 'Patrimoniale',
        initials: 'SB',
    },
    {
        q: "Holding familiale, démembrement, waqf… Articuler tout ça avec mes convictions n'aurait été possible avec aucun cabinet conventionnel.",
        who: 'Karim & Naïma R.',
        what: 'Family office',
        tier: 'Gestion privée',
        initials: 'KR',
    },
];

export const FAQ_ITEMS = [
    {
        q: 'Faut-il une carte bancaire pour démarrer le parcours ?',
        a: "Non. Le parcours est entièrement gratuit et sans engagement. Aucun moyen de paiement n'est demandé. À la fin du parcours en ligne, un RDV de 30 min est programmé avec votre conseiller, qui vous présente votre bilan en direct. Vous décidez ensuite si vous souhaitez aller plus loin.",
    },
    {
        q: 'Comment fonctionne la conformité religieuse ?',
        a: "Nos critères de sélection et notre cadre éthique sont définis en partenariat avec Sakina Consulting, cabinet spécialisé en finance islamique appliquée. À ce jour, nous n'avons pas encore d'audit charia externe par un organisme tiers indépendant — c'est une étape envisagée mais non franchie. Nous préférons être transparents sur ce point plutôt qu'afficher une certification que nous n'avons pas.",
    },
    {
        q: 'Quelle différence avec une app halal mobile ?',
        a: "Les apps halal vous donnent accès à des supports d'investissement filtrés — c'est utile, mais limité. Nous proposons un conseil patrimonial complet : civil, fiscal, succession, transmission, fara'id, structuration. Le bilan, présenté en RDV par un conseiller, ne se limite pas à une allocation d'actifs.",
    },
    {
        q: 'Mes données sont-elles protégées ?',
        a: 'Toutes vos données sont chiffrées (AES-256) et hébergées en France, chez OVH (certifié HDS et SecNumCloud). Conformité RGPD complète. Nous ne revendons jamais vos informations à des partenaires, ni à des fins commerciales, jamais.',
    },
    {
        q: 'Quels sont les frais et comment êtes-vous rémunérés ?',
        a: "0 % de frais d'entrée sur Essentiel. Frais plafonnés à 2,5 % sur Patrimoniale, avec cashback compensatoire. Honoraires sur mesure en Gestion privée. En tant que cabinet de courtage et de conseil, nous percevons des rétro-commissions de la part de nos partenaires fournisseurs — le détail est consultable dans nos mentions légales. Notre engagement : ne pas laisser ces rémunérations biaiser nos recommandations.",
    },
    {
        q: 'Puis-je récupérer mon argent à tout moment ?',
        a: "Oui. L'assurance-vie reste ouverte à tout moment (liquidité immédiate sur la plupart des supports). Les SCPI et autres actifs ont leurs conditions propres de sortie, identiques à celles d'un autre cabinet — nous n'imposons aucune contrainte additionnelle.",
    },
    {
        q: 'Êtes-vous régulés en France ?',
        a: "Oui. Amana Patrimoine SAS est immatriculée à l'ORIAS sous le n° 25009552 en tant que CIF (Conseiller en Investissements Financiers), COBSP et IAS. Nous sommes adhérents Anacofi-Courtage. Tous nos statuts sont vérifiables sur orias.fr.",
    },
];

export const TRUST_STRIP_ITEMS = [
    { k: 'ORIAS', v: 'N° 25009552' },
    { k: 'ANACOFI', v: 'CIF · COBSP · IAS' },
    { k: 'Sakina Consulting', v: 'Partenaire finance islamique' },
    { k: 'RGPD', v: 'Données en France' },
    { k: '15 ans', v: 'Expertise patrimoine' },
];
