const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error('ADMIN_PASSWORD is not set in .env');
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email: 'admin@amana-patrimoine.fr' },
    update: { passwordHash },
    create: {
      email: 'admin@amana-patrimoine.fr',
      passwordHash,
      name: 'Admin',
      role: 'admin',
    },
  });

  console.log('Admin user ready: admin@amana-patrimoine.fr');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
