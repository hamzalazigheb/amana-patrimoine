/** Default main navigation — merged with DB nav_items so new pages appear without wiping custom menus. */

export const DEFAULT_NAV_ITEMS = [
  {
    label: 'Nos Solutions',
    type: 'mega',
    columns: [
      {
        title: 'Planification',
        items: [
          { href: '/retraite', title: 'Préparer ma retraite', desc: 'Sécurisez votre avenir financier' },
          { href: '/strategie', title: 'Stratégie patrimoniale', desc: 'Optimisez votre patrimoine' },
          { href: '/succession', title: 'Préparer ma succession', desc: 'Transmettez en toute sérénité' },
        ],
      },
      {
        title: 'Investissement',
        items: [
          { href: '/immobilier', title: "Investir dans l'immobilier", desc: 'Patrimoine immobilier durable' },
          { href: '/investissement', title: 'Investir son argent', desc: 'Croissance et diversification' },
          { href: '/enfants', title: 'Avenir des enfants', desc: 'Préparez leur avenir' },
        ],
      },
      {
        title: 'Optimisation',
        items: [
          { href: '/reduire-impots', title: 'Optimiser ma fiscalité en tant que particulier', desc: 'Optimisation fiscale légale' },
          { href: '/reduire-impots-entreprise', title: "Optimiser ma fiscalité d'entreprise", desc: 'Optimisation fiscale légale' },
        ],
      },
    ],
  },
  {
    label: 'Ressources',
    type: 'dropdown',
    items: [
      { href: '/finance-islamique', title: 'Finance islamique', desc: 'Principes et solutions' },
      { href: '/scpi-halal', title: 'SCPI Halal', desc: 'Immobilier sans riba' },
      { href: '/assurance-vie-islamique', title: 'Assurance-vie islamique', desc: 'Épargner et transmettre' },
      { href: '/zakat', title: 'Zakat', desc: 'Guide et calcul' },
      { href: '/simulateurs', title: 'Simulateur Zakat', desc: 'Calculez en ligne', featureFlag: 'simulateurs_visible' },
      { href: '/lexique', title: 'Lexique', desc: 'Termes et définitions' },
      { href: '/blog', title: 'Blog', desc: 'Guides et analyses' },
      { href: '/nos-actualites', title: 'Nos actualités', desc: 'Vidéos & conseils' },
      { href: '/livres-blancs', title: 'Livres blancs', desc: 'Guides PDF gratuits' },
    ],
  },
  {
    label: 'Qui sommes-nous',
    type: 'link',
    href: '/qui-sommes-nous',
  },
  {
    label: 'Contact',
    type: 'link',
    href: '/contact',
  },
];

function mergeSubItems(dbItems, defaultItems) {
  const existing = new Set((dbItems || []).map((item) => item.href));
  const missing = (defaultItems || []).filter((item) => item.href && !existing.has(item.href));
  if (missing.length === 0) return dbItems || [];
  return [...(dbItems || []), ...missing];
}

function mergeMegaColumns(dbColumns, defaultColumns) {
  return (dbColumns || []).map((col) => {
    const defaultCol = (defaultColumns || []).find((c) => c.title === col.title);
    if (!defaultCol) return col;
    return { ...col, items: mergeSubItems(col.items, defaultCol.items) };
  });
}

/** Keep custom nav from DB; append any new default links not yet in the saved menu. */
export function mergeNavItems(dbItems, defaults = DEFAULT_NAV_ITEMS) {
  if (!Array.isArray(dbItems) || dbItems.length === 0) return defaults;

  const merged = dbItems.map((dbItem) => {
    const defaultItem = defaults.find((d) => d.label === dbItem.label && d.type === dbItem.type);
    if (!defaultItem) return dbItem;

    if (dbItem.type === 'dropdown') {
      return { ...dbItem, items: mergeSubItems(dbItem.items, defaultItem.items) };
    }

    if (dbItem.type === 'mega') {
      return { ...dbItem, columns: mergeMegaColumns(dbItem.columns, defaultItem.columns) };
    }

    return dbItem;
  });

  const dbLabels = new Set(merged.map((item) => item.label));
  const missingTopLevel = defaults.filter((item) => !dbLabels.has(item.label));
  return missingTopLevel.length > 0 ? [...merged, ...missingTopLevel] : merged;
}
