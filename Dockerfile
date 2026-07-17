# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /site

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage
FROM base AS builder
WORKDIR /site
COPY --from=deps /site/node_modules ./node_modules
COPY . .

ENV DATABASE_URL="file:/site/data/photos.db"
RUN cd prisma && npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Cleanup stage — strip all unnecessary files from standalone output
FROM base AS cleaner
WORKDIR /site

COPY --from=builder /site/.next/standalone ./
COPY --from=builder /site/.next/static ./.next/static
COPY --from=builder /site/public ./public
COPY --from=builder /site/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /site/prisma/migrations ./prisma/migrations
COPY --from=builder /site/prisma/seed.js ./prisma/seed.js

# Aggressively strip unnecessary files in a single layer
RUN set -ex \
    # Remove all Prisma engine binaries except the one musl engine
    && find . -name "libquery_engine-debian*" -delete \
    # Keep libquery_engine-linux-musl-openssl-3.0.x.so.node (needed at runtime) \
    && find . -name "query_engine_bg.*" -delete \
    # Remove Prisma edge/wasm/browser files
    && find . -path "*/generated/prisma/edge.js" -delete \
    && find . -path "*/generated/prisma/wasm.js" -delete \
    && find . -path "*/generated/prisma/wasm-*" -delete \
    && find . -path "*/generated/prisma/index-browser.js" -delete \
    # Remove dev dependencies that leaked into standalone
    && rm -rf node_modules/typescript node_modules/caniuse-lite \
    # Remove source dirs traced by standalone
    && rm -rf components app lib src \
    # Remove all type definitions, source maps, docs
    && find . -name "*.d.ts" -delete 2>/dev/null \
    && find . -name "*.map" -delete 2>/dev/null \
    && find . -name "*.md" -delete 2>/dev/null \
    && find . -name "LICENSE*" -delete 2>/dev/null \
    && find . -name "CHANGELOG*" -delete 2>/dev/null \
    && true

# Final minimal production image
FROM base AS runner
WORKDIR /site

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
ENV PRISMA_SCHEMA_PATH=/site/prisma/schema.prisma

# Install sqlite3 CLI for migrations and create user — single layer
RUN apk add --no-cache sqlite \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir -p /site/data \
    && chown nextjs:nodejs /site/data

# Copy cleaned standalone output from cleaner stage
COPY --from=cleaner --chown=nextjs:nodejs /site ./

# Copy migration runner and entrypoint
COPY --chown=nextjs:nodejs migrate.js ./migrate.js
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
