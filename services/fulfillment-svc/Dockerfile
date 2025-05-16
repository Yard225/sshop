# Dockerfile pour fulfillment-svc
FROM node:20-alpine AS builder
WORKDIR /app
COPY ../../.. .
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate && pnpm install --frozen-lockfile
WORKDIR /app/services/fulfillment-svc
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/services/fulfillment-svc/dist ./dist
COPY --from=builder /app/services/fulfillment-svc/package.json ./package.json
COPY --from=builder /app/services/fulfillment-svc/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
