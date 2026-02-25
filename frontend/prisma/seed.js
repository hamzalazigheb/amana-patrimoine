const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with ALL production content...\n');

  // Admin user
  const passwordHash = await bcrypt.hash('amana2025', 10);
  await prisma.user.upsert({
    where: { email: 'admin@amana-patrimoine.fr' },
    update: {},
    create: { email: 'admin@amana-patrimoine.fr', passwordHash, name: 'Admin', role: 'admin' },
  });
  console.log('✓ Admin user');

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
  ];

  for (const seedPage of pages) {
    await seedPage(prisma);
  }

  console.log('\n✅ Seed complete! ALL production content imported.');
  console.log('Login: admin@amana-patrimoine.fr / amana2025');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
