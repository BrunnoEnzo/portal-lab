# apps/backend/Dockerfile

# --- Estágio 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Estágio 2: Produção ---
FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev
RUN npx prisma generate

# Copia o código transpilado (JavaScript) do estágio 'builder'
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3001

# Comando aprimorado: executa as migrations e depois inicia a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]