#!/bin/bash
# ══════════════════════════════════════════════════════
# Amana Patrimoine — AWS Deployment Script
#
# Run this on the AWS EC2 server after git pull.
# First time setup: run with --setup flag
# Normal deploy:   ./deploy.sh
# ══════════════════════════════════════════════════════

set -e  # Exit on any error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()   { echo -e "${GREEN}[+]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ─── First-time server setup ──────────────────────────
if [ "$1" == "--setup" ]; then
  log "Installing Docker and Docker Compose..."
  sudo apt-get update -qq
  sudo apt-get install -y docker.io docker-compose-plugin curl

  sudo systemctl enable docker
  sudo systemctl start docker
  sudo usermod -aG docker $USER

  log "Installing Certbot for SSL..."
  sudo apt-get install -y certbot

  warn "Docker installed. Please log out and back in for group changes to take effect."
  warn "Then run: ./deploy.sh --ssl to get SSL certificates."
  exit 0
fi

# ─── SSL certificate setup ────────────────────────────
if [ "$1" == "--ssl" ]; then
  warn "Make sure ports 80 and 443 are open in AWS Security Group."
  read -p "Enter your domain (e.g. amana-patrimoine.fr): " DOMAIN

  log "Stopping nginx if running..."
  docker compose stop nginx 2>/dev/null || true

  log "Getting SSL certificate for $DOMAIN and www.$DOMAIN..."
  sudo certbot certonly --standalone \
    -d "$DOMAIN" -d "www.$DOMAIN" \
    --non-interactive --agree-tos \
    --email contact@$DOMAIN

  log "Copying certificates..."
  sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ./nginx/ssl/
  sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ./nginx/ssl/
  sudo chown $USER:$USER ./nginx/ssl/*.pem

  log "SSL certificates installed."
  exit 0
fi

# ─── Normal deployment ────────────────────────────────
log "Starting deployment..."

# Check .env exists
if [ ! -f ".env" ]; then
  error ".env file not found. Copy .env.example to .env and fill in your values."
fi

# Pull latest code
log "Pulling latest code from git..."
git pull origin master

# Build and restart containers
log "Building Docker images..."
docker compose build --no-cache

log "Starting containers..."
docker compose up -d

# Wait for DB to be ready
log "Waiting for database..."
sleep 10

# Run Prisma migrations
log "Running database migrations..."
docker compose exec -T frontend npx prisma db push

# Run seed (only if DB is empty)
log "Checking if seed is needed..."
PAGE_COUNT=$(docker compose exec -T frontend node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.page.count().then(n => { console.log(n); p.\$disconnect(); });
" 2>/dev/null || echo "0")

if [ "$PAGE_COUNT" -eq "0" ]; then
  log "Database is empty — running seed..."
  docker compose exec -T frontend node prisma/seed.js
else
  warn "Database already has $PAGE_COUNT pages — skipping seed."
fi

# Show status
log "Deployment complete!"
echo ""
docker compose ps
echo ""
log "Logs: docker compose logs -f frontend"
