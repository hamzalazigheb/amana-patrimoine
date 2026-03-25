const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with ALL production content...\n');

  // Admin user — password read from ADMIN_PASSWORD env var
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('⚠️  ADMIN_PASSWORD env var not set — skipping admin user upsert. Set it in .env before seeding.');
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: 'admin@amana-patrimoine.fr' },
      update: { passwordHash },
      create: { email: 'admin@amana-patrimoine.fr', passwordHash, name: 'Admin', role: 'admin' },
    });
    console.log('✓ Admin user created/updated');
  }

  // Global settings
  const settings = {
    site_name: 'Amana Patrimoine',
    site_description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.',
    hero_title: 'Conseil en gestion de patrimoine et finance islamique',
    hero_subtitle: '15 ans d\'expérience pour construire une stratégie patrimoniale sur-mesure, en accord avec vos convictions',
    hero_cta_text: 'Prendre rendez-vous',
    hero_cta_link: 'https://calendly.com/amana-patrimoine/30min',
    hero_image: '/Design sans titre (1) (1).png',
    footer_description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.',
    contact_phone: '+33 (0)1 89 70 00 00',
    contact_email: 'contact@amana-patrimoine.fr',
    contact_address: 'Paris et Île-de-France',
    calendly_url: 'https://calendly.com/amana-patrimoine/30min',
    simulateurs_visible: true,
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.globalSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
  }
  console.log('✓ Global settings\n');

  // Seed all pages
  const pages = [
    require('./seeds/home'),
    require('./seeds/strategie'),
    require('./seeds/immobilier'),
    require('./seeds/retraite'),
    require('./seeds/succession'),
    require('./seeds/enfants'),
    require('./seeds/investissement'),
    require('./seeds/reduire-impots'),
    require('./seeds/reduire-impots-entreprise'),
    require('./seeds/qui-sommes-nous'),
    require('./seeds/mentions-legales'),
    // Phase 3 — Nouvelles pages SEO
    require('./seeds/finance-islamique'),
    require('./seeds/scpi-halal'),
    require('./seeds/assurance-vie-islamique'),
    require('./seeds/zakat'),
    require('./seeds/lexique'),
    require('./seeds/bilan-patrimonial'),
    // Phase 4 — Blog
    require('./seeds/blog-guide-investissement-halal'),
    require('./seeds/blog-per-halal-retraite'),
    require('./seeds/blog-zakat-patrimoine'),
  ];

  for (const seedPage of pages) {
    await seedPage(prisma);
  }

  console.log('\n✅ Seed complete! ALL production content imported.');
  console.log('Login: admin@amana-patrimoine.fr — password is the value you set in ADMIN_PASSWORD env var.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
