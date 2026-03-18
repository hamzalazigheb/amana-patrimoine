/**
 * Amana Patrimoine — Full Data Backup Script
 *
 * Creates a timestamped backup folder containing:
 *   1. SQLite database file (binary copy)
 *   2. JSON export of all DB tables (Pages, Blocks, Media, Settings, Users)
 *   3. All uploaded image files
 *   4. A backup manifest (metadata)
 *
 * Usage:  node scripts/backup.js
 * Output: backups/backup-YYYY-MM-DD_HH-MM-SS/
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, '-')
    .replace('T', '_')
    .slice(0, 19);

  const backupDir = path.join(process.cwd(), 'backups', `backup-${timestamp}`);
  const uploadsBackupDir = path.join(backupDir, 'uploads');

  fs.mkdirSync(backupDir, { recursive: true });
  fs.mkdirSync(uploadsBackupDir, { recursive: true });

  console.log(`\n📦 Amana Patrimoine — Backup\n${'─'.repeat(40)}`);
  console.log(`📁 Destination: ${backupDir}\n`);

  // ─── 1. Copy SQLite database file ──────────────────────────────────────────
  const dbPath = path.join(process.cwd(), 'prisma', 'prisma', 'dev.db');
  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, path.join(backupDir, 'dev.db'));
    const sizeKB = Math.round(fs.statSync(dbPath).size / 1024);
    console.log(`✅ Database file copied (${sizeKB} KB)`);
  } else {
    console.warn('⚠️  SQLite database file not found — skipping binary copy');
  }

  // ─── 2. JSON export of all tables ─────────────────────────────────────────
  console.log('\n📄 Exporting database tables to JSON...');

  const pages = await prisma.page.findMany({
    include: { blocks: { orderBy: { order: 'asc' } } },
    orderBy: { updatedAt: 'desc' },
  });

  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  const settings = await prisma.globalSetting.findMany();

  // Export users WITHOUT password hashes for security
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const exportData = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    summary: {
      pages: pages.length,
      blocks: pages.reduce((sum, p) => sum + p.blocks.length, 0),
      media: media.length,
      settings: settings.length,
      users: users.length,
    },
    pages,
    media,
    settings,
    users,
  };

  fs.writeFileSync(
    path.join(backupDir, 'data.json'),
    JSON.stringify(exportData, null, 2),
    'utf8'
  );

  console.log(`   Pages:    ${pages.length}`);
  console.log(`   Blocks:   ${exportData.summary.blocks}`);
  console.log(`   Media:    ${media.length}`);
  console.log(`   Settings: ${settings.length}`);
  console.log(`   Users:    ${users.length} (passwords excluded)`);
  console.log('✅ data.json created');

  // ─── 3. Copy uploaded files ────────────────────────────────────────────────
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    let copied = 0;
    for (const file of files) {
      const src = path.join(uploadsDir, file);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, path.join(uploadsBackupDir, file));
        copied++;
      }
    }
    console.log(`\n✅ Uploads copied: ${copied} files`);
  } else {
    console.log('\n⚠️  No uploads folder found');
  }

  // ─── 4. Write backup manifest ──────────────────────────────────────────────
  const manifest = {
    createdAt: new Date().toISOString(),
    node: process.version,
    backupFolder: backupDir,
    files: fs.readdirSync(backupDir),
    uploadFiles: fs.existsSync(uploadsBackupDir)
      ? fs.readdirSync(uploadsBackupDir).length
      : 0,
    summary: exportData.summary,
    instructions: {
      restoreDB: 'Copy dev.db back to frontend/prisma/prisma/dev.db',
      restoreUploads: 'Copy uploads/* back to frontend/public/uploads/',
      restoreJSON: 'Run: node scripts/restore.js backups/backup-YYYY-MM-DD_HH-MM-SS',
    },
  };

  fs.writeFileSync(
    path.join(backupDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  // ─── Summary ──────────────────────────────────────────────────────────────
  const totalSizeKB = Math.round(
    getFolderSize(backupDir) / 1024
  );

  console.log(`\n${'─'.repeat(40)}`);
  console.log(`✅ Backup complete!`);
  console.log(`📁 Location : backups/backup-${timestamp}/`);
  console.log(`📦 Total size: ~${totalSizeKB} KB`);
  console.log(`${'─'.repeat(40)}\n`);
}

function getFolderSize(folderPath) {
  let total = 0;
  for (const file of fs.readdirSync(folderPath)) {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    total += stat.isDirectory() ? getFolderSize(fullPath) : stat.size;
  }
  return total;
}

main()
  .catch((e) => { console.error('❌ Backup failed:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
