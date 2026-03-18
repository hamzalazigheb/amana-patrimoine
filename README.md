# Amana Patrimoine

Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.

---

## Project Structure

```
amana-patrimoine/
├── frontend/               # Next.js 14 app (App Router)
├── backend/                # Express.js API (contact form)
├── nginx/                  # Reverse proxy configuration
├── docker-compose.yml      # Production deployment
├── docker-compose.dev.yml  # Local development (PostgreSQL only)
└── deploy.sh               # AWS deployment script
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18 |
| Database | PostgreSQL 16 (via Prisma ORM) |
| Auth | Custom JWT (jsonwebtoken + httpOnly cookies) |
| CMS | Custom admin panel at `/admin` |
| Reverse Proxy | Nginx 1.25 |
| Deployment | Docker + Docker Compose on AWS EC2 |

---

## Frontend Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.js             # Home page (/)
│   ├── layout.js           # Root layout + SEO metadata
│   ├── globals.css         # Global styles + CSS variables
│   ├── admin/              # CMS admin panel (/admin)
│   ├── api/                # API routes
│   │   ├── auth/           # Login, logout, session
│   │   ├── admin/          # Protected admin APIs
│   │   ├── pages/          # Public CMS pages API
│   │   ├── media/          # Media library API
│   │   ├── settings/       # Site settings API
│   │   └── public/         # Public feature flags
│   ├── blog/               # Blog listing + articles
│   ├── simulateurs/        # Zakat calculator
│   └── [other pages]/      # Service pages
│
├── components/             # React components
│   ├── Header.jsx          # Site navigation
│   ├── Footer.jsx          # Site footer
│   ├── Hero.jsx            # Home hero section
│   ├── BlockRenderer.jsx   # CMS block renderer
│   ├── Services.jsx        # Services grid
│   ├── Methodology.jsx     # Process steps
│   ├── WhatsAppFab.jsx     # Floating WhatsApp button
│   ├── ZakatCalculator.jsx # Zakat calculator tool
│   └── admin/              # Admin panel components
│       └── blocks/         # Block editors (Hero, Content, FAQ, etc.)
│
├── lib/                    # Shared utilities
│   ├── auth.js             # JWT sign/verify
│   ├── auth-guard.js       # requireAdmin() helper
│   ├── cms.js              # CMS data fetching
│   ├── db.js               # Prisma client singleton
│   ├── rate-limit.js       # In-memory rate limiter
│   └── seo.js              # Metadata & JSON-LD helpers
│
├── prisma/
│   ├── schema.prisma       # Database schema (PostgreSQL)
│   ├── seed.js             # Database seeder
│   └── seeds/              # Per-page seed data (20 pages)
│
├── scripts/
│   └── backup.js           # Database + uploads backup
│
└── public/                 # Static assets (SVG icons, logos)
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- Docker Desktop (for local PostgreSQL)

### 1. Clone and install
```bash
git clone https://github.com/your-org/amana-patrimoine.git
cd amana-patrimoine/frontend
npm install
```

### 2. Start local PostgreSQL
```bash
# From project root:
docker-compose -f docker-compose.dev.yml up -d
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env — set DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Setup database
```bash
npx prisma db push      # Create tables
node prisma/seed.js     # Seed all content
```

### 5. Start dev server
```bash
npm run dev
# App: http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run seed      # Seed database with initial content
npm run backup    # Create backup of DB + uploads
```

---

## Production Deployment (AWS EC2)

```bash
# 1. SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 2. Clone repo and configure
git clone https://github.com/your-org/amana-patrimoine.git
cd amana-patrimoine
cp frontend/.env.example .env
nano .env   # Fill in all production values

# 3. First-time setup
chmod +x deploy.sh
./deploy.sh --setup   # Install Docker
./deploy.sh --ssl     # Get SSL certificate (requires domain DNS pointing to server)

# 4. Deploy
./deploy.sh
```

### Production environment variables required

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | 64-char random hex string |
| `ADMIN_PASSWORD` | Admin account password |
| `POSTGRES_PASSWORD` | PostgreSQL root password |
| `NEXTAUTH_URL` | Production URL (https://amana-patrimoine.fr) |

---

## Backup

```bash
cd frontend
npm run backup
# Creates: backups/backup-YYYY-MM-DD_HH-MM-SS/
#   - dev.db (SQLite) or use pg_dump for PostgreSQL
#   - data.json (all pages, blocks, settings)
#   - uploads/ (all uploaded images)
```

---

## Security

- JWT tokens signed with `JWT_SECRET` (HS256, verified in Edge middleware)
- Admin routes protected at middleware level + API level
- Rate limiting on login (5 attempts / 15 min)
- File uploads restricted to images, max 5MB
- HTTP security headers (CSP, HSTS, X-Frame-Options)
- HTML content sanitized before rendering

---

## License

Private — All rights reserved © Amana Patrimoine
