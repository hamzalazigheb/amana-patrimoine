# ─────────────────────────────────────────────
# Stage 1: Install dependencies
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# Install all deps (including dev) for build
COPY package*.json ./
RUN npm ci

# ─────────────────────────────────────────────
# Stage 2: Build the Next.js app
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Patch schema for PostgreSQL (source schema uses sqlite for local dev)
RUN sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

# Generate Prisma client for linux/PostgreSQL
RUN npx prisma generate

# Build Next.js (output: standalone)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG JWT_SECRET=build-placeholder
ARG DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder
ARG NEXT_PUBLIC_CHATBOT_ENABLED=false
ARG NEXT_PUBLIC_CHATBOT_ID=69cefcc8cdd78aded2e4c7be
ARG NEXT_PUBLIC_CHATBOT_API_URL=https://amana-patrimoine.fr/chatbot
ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_CHATBOT_ENABLED=$NEXT_PUBLIC_CHATBOT_ENABLED
ENV NEXT_PUBLIC_CHATBOT_ID=$NEXT_PUBLIC_CHATBOT_ID
ENV NEXT_PUBLIC_CHATBOT_API_URL=$NEXT_PUBLIC_CHATBOT_API_URL
RUN npm run build

# ─────────────────────────────────────────────
# Stage 3: Production runner (minimal image)
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma schema and client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Install Prisma CLI, bcryptjs, and sharp (required for Next.js image optimization)
RUN npm install --no-save prisma@5.22.0 bcryptjs@2.4.3 sharp@0.33.2

# Copy seed files
COPY --from=builder /app/scripts ./scripts

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
