# ---- Stage 1: build ----
FROM node:20-alpine AS builder

WORKDIR /app

RUN yarn config set network-timeout 600000 -g

COPY package.json yarn.lock ./
RUN for i in 1 2 3 4 5; do \
      yarn install --frozen-lockfile --network-timeout 600000 && break; \
      echo "yarn install falhou (tentativa $i), aguardando e tentando de novo..."; \
      sleep 10; \
    done

COPY . .
RUN yarn build

# ---- Stage 2: dependências de produção ----
FROM node:20-alpine AS deps

WORKDIR /app

RUN yarn config set network-timeout 600000 -g

COPY package.json yarn.lock ./
RUN for i in 1 2 3 4 5; do \
      yarn install --frozen-lockfile --production --network-timeout 600000 \
        && yarn add drizzle-kit@^0.31.10 --ignore-scripts \
        && yarn cache clean && break; \
      echo "yarn install falhou (tentativa $i), aguardando e tentando de novo..."; \
      sleep 10; \
    done

# ---- Stage 3: imagem final ----
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock drizzle.config.ts ./
COPY drizzle ./drizzle
COPY src/database ./src/database
COPY scripts/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["/entrypoint.sh"]
