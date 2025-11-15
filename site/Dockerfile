# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /site

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi



# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /site
COPY --from=deps /site/node_modules ./node_modules
COPY . .


# #prisma setup
# RUN npx prisma generate

RUN npx prisma generate
# RUN npx prisma migrate deploy

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /site

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1


COPY --from=builder /site/public ./public
COPY --from=builder /site/prisma ./prisma
COPY --from=builder /site/.next/standalone ./
COPY --from=builder /site/.next/static ./.next/static
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /site/prisma
RUN chown -R nextjs:nodejs /site/
RUN chown -R nextjs:nodejs /site/.next

ENTRYPOINT ["./docker-entrypoint.sh"]

USER nextjs

EXPOSE 3000

ENV PORT=3000


# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

# this does not run bcs i have ENTRYPOINT
CMD ["node", "server.js"] 
