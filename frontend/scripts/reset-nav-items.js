/**
 * Deletes the `nav_items` key from globalSetting so the Header
 * falls back to its correctly-encoded DEFAULT_NAV_ITEMS.
 *
 * Run: node scripts/reset-nav-items.js
 */
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const deleted = await p.globalSetting.deleteMany({
    where: { key: 'nav_items' },
  });
  if (deleted.count > 0) {
    console.log('✅  nav_items removed from database. Header will now use default nav.');
  } else {
    console.log('ℹ️   nav_items was not in the database — nothing to delete.');
  }
}

main()
  .catch((e) => { console.error('❌ Error:', e.message); process.exit(1); })
  .finally(() => p.$disconnect());
