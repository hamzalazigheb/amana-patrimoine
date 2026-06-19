# SSL auto-renewal (AWS EC2)

Official domain: **amana-patrimoine.fr**

## Problem

`certbot renew --dry-run` fails when Nginx (Docker) occupies port 80 (standalone mode).

## Fix — Certbot hooks

Edit `/etc/letsencrypt/renewal/amana-patrimoine.fr.conf` on the server and add (adjust project path):

```ini
pre_hook = docker compose -f /home/ubuntu/amana-patrimoine/docker-compose.yml stop nginx
post_hook = docker compose -f /home/ubuntu/amana-patrimoine/docker-compose.yml start nginx
```

Verify:

```bash
sudo certbot renew --dry-run
curl -I https://amana-patrimoine.fr
```

## o2switch (.com)

- `amana-patrimoine.com` redirects to `https://amana-patrimoine.fr` (301)
- Replace self-signed cert on `.com` via cPanel → SSL/TLS Status → Run AutoSSL
