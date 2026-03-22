/**
 * Static build script for o2switch deployment.
 * Temporarily hides /api and /admin folders (not compatible with static export),
 * runs the Next.js static build, then restores them.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

// These folders are excluded from static build:
// - api/admin: require a Node.js server
// - blog: has dynamic [slug] route, page returns 404 anyway
// - simulateurs, bilan-patrimonial, ressources pages: hidden from public site
const foldersToHide = [
    'api',
    'admin',
    'blog',
    'simulateurs',
    'bilan-patrimonial',
    'finance-islamique',
    'scpi-halal',
    'assurance-vie-islamique',
    'zakat',
    'lexique',
];
const moved = [];

function restore() {
    for (const { from, to } of moved) {
        if (fs.existsSync(to)) {
            fs.renameSync(to, from);
            console.log(`✓ Restored: app/${path.basename(from)}`);
        }
    }
}

process.on('exit', restore);
process.on('SIGINT', () => { restore(); process.exit(1); });
process.on('uncaughtException', (e) => { console.error(e); restore(); process.exit(1); });

try {
    // Hide folders
    for (const folder of foldersToHide) {
        const from = path.join(appDir, folder);
        const to = path.join(appDir, `_${folder}_hidden`);
        if (fs.existsSync(from)) {
            fs.renameSync(from, to);
            moved.push({ from, to });
            console.log(`→ Hidden: app/${folder}`);
        }
    }

    // Clean .next cache
    const nextDir = path.join(__dirname, '..', '.next');
    if (fs.existsSync(nextDir)) {
        fs.rmSync(nextDir, { recursive: true, force: true });
        console.log('→ Cleared .next cache');
    }

    // Run build
    execSync('npx next build', {
        stdio: 'inherit',
        env: { ...process.env, STATIC_BUILD: 'true' },
        cwd: path.join(__dirname, '..'),
    });

    console.log('\n✓ Static build complete! Upload the /out folder to o2switch.');
} catch (e) {
    console.error('\n✗ Build failed');
    process.exit(1);
} finally {
    restore();
}
