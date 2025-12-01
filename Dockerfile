FROM node:18.8-alpine AS base

FROM base AS builder

# Enable Corepack for pnpm
RUN corepack enable

WORKDIR /home/node/app
COPY package*.json ./
COPY pnpm-lock.yaml ./

COPY . .
RUN pnpm install
RUN pnpm build

FROM base AS runtime

ENV NODE_ENV=production

# Enable Corepack for pnpm
RUN corepack enable

WORKDIR /home/node/app
COPY package*.json  ./
COPY pnpm-lock.yaml ./

RUN pnpm install --prod

# Copy built application from builder stage
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]
