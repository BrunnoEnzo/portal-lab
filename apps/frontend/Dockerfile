# apps/frontend/Dockerfile

# --- Estágio 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Garante que NEXT_PUBLIC_API_URL não seja necessário durante o build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# --- Estágio 2: Runner (Produção) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia a pasta standalone que contém o servidor
COPY --from=builder /app/.next/standalone ./
# Copia a pasta de assets estáticos de forma explícita
COPY --from=builder /app/.next/static ./.next/static
# Copia a pasta de assets públicos
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]