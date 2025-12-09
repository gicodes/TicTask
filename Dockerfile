FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ────────────── DEVELOPMENT ──────────────
FROM base AS development
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# ────────────── BUILDER ──────────────
FROM base AS builder
RUN npm ci

COPY . .
RUN npm run build

# ────────────── PRODUCTION ──────────────
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./

EXPOSE 3000
CMD ["npm", "start"]