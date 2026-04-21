#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Amana Patrimoine — SSL Deployment Script
# Run this on the AWS server as root (or sudo).
#
# Prerequisites:
#   1. Domain amana-patrimoine.fr must point to this server's IP (DNS propagated)
#   2. Port 80 and 443 must be open in the AWS security group
#   3. Docker + Docker Compose installed
#   4. Git repo is up to date (git pull already done)
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

DOMAIN="amana-patrimoine.fr"
EMAIL="contact@amana-patrimoine.fr"   # Replace with real admin email for cert renewal notices
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  Amana Patrimoine — SSL Deploy"
echo "  Domain : $DOMAIN"
echo "  Dir    : $PROJECT_DIR"
echo "═══════════════════════════════════════════════════"
echo ""

# ── STEP 1: Stop nginx to free port 80 for certbot standalone ─────────────────
echo "▶ STEP 1 — Stopping nginx to get the certificate..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" stop nginx 2>/dev/null || true

# ── STEP 2: Install certbot (if not already installed) ────────────────────────
echo "▶ STEP 2 — Installing certbot..."
if ! command -v certbot &>/dev/null; then
    apt-get update -q && apt-get install -y certbot
fi

# ── STEP 3: Obtain Let's Encrypt certificate ───────────────────────────────────
echo "▶ STEP 3 — Obtaining SSL certificate for $DOMAIN..."
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --domains "$DOMAIN,www.$DOMAIN" \
    --keep-until-expiring

echo "   ✓ Certificate obtained at /etc/letsencrypt/live/$DOMAIN/"

# ── STEP 4: Pull latest code ───────────────────────────────────────────────────
echo "▶ STEP 4 — Pulling latest code..."
cd "$PROJECT_DIR"
git pull origin main 2>/dev/null || echo "   (not a git worktree here, skip)"

# ── STEP 5: Update .env on the server ─────────────────────────────────────────
echo "▶ STEP 5 — Checking .env variables..."
ENV_FILE="$PROJECT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "   ERROR: $ENV_FILE not found. Copy .env.example and fill the values."
    exit 1
fi

# Ensure NEXT_PUBLIC_CHATBOT_API_URL is set to the HTTPS proxy URL
if ! grep -q "NEXT_PUBLIC_CHATBOT_API_URL" "$ENV_FILE"; then
    echo "NEXT_PUBLIC_CHATBOT_API_URL=https://$DOMAIN/chatbot" >> "$ENV_FILE"
    echo "   ✓ Added NEXT_PUBLIC_CHATBOT_API_URL to .env"
fi

# Ensure ENABLE_HSTS is true
if grep -q "^ENABLE_HSTS=" "$ENV_FILE"; then
    sed -i 's/^ENABLE_HSTS=.*/ENABLE_HSTS=true/' "$ENV_FILE"
else
    echo "ENABLE_HSTS=true" >> "$ENV_FILE"
fi
echo "   ✓ ENABLE_HSTS=true"

# Ensure NEXT_PUBLIC_SITE_URL is HTTPS
sed -i "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://$DOMAIN|" "$ENV_FILE" 2>/dev/null || true
echo "   ✓ NEXT_PUBLIC_SITE_URL=https://$DOMAIN"

# ── STEP 6: Rebuild frontend with new chatbot URL baked in ────────────────────
echo "▶ STEP 6 — Rebuilding frontend Docker image..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" build frontend

# ── STEP 7: Start all services (incl. nginx with SSL) ─────────────────────────
echo "▶ STEP 7 — Starting all services..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" up -d

# Wait for services to be healthy
echo "   Waiting 15 seconds for services to start..."
sleep 15

# ── STEP 8: Run DB migrations (safe — no data loss) ───────────────────────────
echo "▶ STEP 8 — Running Prisma DB push (safe, no data loss)..."
docker exec amana_frontend npx prisma db push --accept-data-loss=false 2>/dev/null || \
docker exec amana_frontend npx prisma db push

echo "   ✓ Database schema up to date"

# ── STEP 9: Health check ───────────────────────────────────────────────────────
echo "▶ STEP 9 — Health check..."
sleep 5
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$DOMAIN/" 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "308" ]; then
    echo "   ✓ https://$DOMAIN/ → HTTP $HTTP_STATUS"
else
    echo "   ⚠ https://$DOMAIN/ returned HTTP $HTTP_STATUS (check logs below)"
    docker compose -f "$PROJECT_DIR/docker-compose.yml" logs --tail=30 nginx
fi

# ── STEP 10: Set up automatic certificate renewal ─────────────────────────────
echo "▶ STEP 10 — Setting up auto-renewal cron..."
# Certbot creates /etc/cron.d/certbot automatically — verify it works
certbot renew --dry-run && echo "   ✓ Auto-renewal OK" || echo "   ⚠ Auto-renewal test failed — check certbot logs"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅  Deployment complete!"
echo ""
echo "  Site    : https://$DOMAIN"
echo "  Admin   : https://$DOMAIN/admin"
echo "  Chatbot : https://$DOMAIN/chatbot (proxied)"
echo ""
echo "  Next steps:"
echo "  - Log in to https://$DOMAIN/admin and verify content"
echo "  - Check chatbot widget in bottom-right corner"
echo "  - Verify Google Search Console sitemap submission"
echo "═══════════════════════════════════════════════════"
