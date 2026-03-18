// Configuration PM2 pour o2switch
module.exports = {
  apps: [{
    name: 'amana-patrimoine',
    script: 'npm',
    args: 'start',
    cwd: '/home/votre-utilisateur/preprod-amana-patrimoine.fr/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}

