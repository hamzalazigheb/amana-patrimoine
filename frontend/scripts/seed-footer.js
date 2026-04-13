const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const FOOTER_SETTINGS = {
  footer_description:
    'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Nous vous accompagnons dans la construction et la préservation de votre patrimoine selon vos valeurs.',
  contact_phone: '+33 (0)1 89 70 00 00',
  contact_email: 'contact@amana-patrimoine.fr',
  contact_address: '60 rue François Ier\n75008 Paris',
  contact_hours: 'Lun–Ven : 9h00–18h00',
  social_linkedin: 'https://www.linkedin.com/company/amana-patrimoine',
  social_instagram: 'https://www.instagram.com/amanapatrimoine',
  social_youtube: 'https://www.youtube.com/@amanapatrimoine',
  social_whatsapp: 'https://wa.me/33668603619',
  footer_columns: [
    {
      title: 'Expertises',
      links: [
        { label: 'Stratégie Patrimoniale', href: '/strategie' },
        { label: 'Investissement Immobilier', href: '/immobilier' },
        { label: 'Préparation Retraite', href: '/retraite' },
        { label: 'Transmission de Capital', href: '/succession' },
        { label: 'Protection de la Famille', href: '/enfants' },
        { label: 'Optimisation Fiscale', href: '/reduire-impots' },
        { label: 'Placements Éthiques', href: '/investissement' },
      ],
    },
    {
      title: 'Cabinet',
      links: [
        { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
        { label: 'Notre Approche', href: '/#methodology' },
        { label: 'Mentions Légales', href: '/mentions-legales' },
        { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
        { label: 'Carrières', href: '/carrieres' },
      ],
    },
  ],
};

async function main() {
  console.log('Seeding footer settings...');

  for (const [key, value] of Object.entries(FOOTER_SETTINGS)) {
    const serialized = JSON.stringify(value);
    await prisma.globalSetting.upsert({
      where: { key },
      update: { value: serialized },
      create: { key, value: serialized },
    });
    console.log(`  ✓ ${key}`);
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
