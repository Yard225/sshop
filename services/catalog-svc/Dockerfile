# Dockerfile pour catalog-svc
FROM node:20-alpine AS builder
WORKDIR /app
COPY ../../.. .
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate && pnpm install --frozen-lockfile
WORKDIR /app/services/catalog-svc
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/services/catalog-svc/dist ./dist
COPY --from=builder /app/services/catalog-svc/package.json ./package.json
COPY --from=builder /app/services/catalog-svc/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
