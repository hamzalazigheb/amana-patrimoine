const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.globalSetting.upsert({
  where: { key: 'simulateurs_visible' },
  update: { value: 'true' },
  create: { key: 'simulateurs_visible', value: 'true' },
}).then((r) => console.log('OK:', r.value)).finally(() => p.$disconnect());
