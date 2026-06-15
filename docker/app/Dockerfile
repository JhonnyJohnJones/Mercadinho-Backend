# =========================================
# Builder
# =========================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

# =========================================
# Runner
# =========================================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install \
  --prod \
  --frozen-lockfile

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main"]