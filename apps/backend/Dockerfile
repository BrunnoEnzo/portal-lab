# apps/backend/Dockerfile

# --- Estágio 1: Builder ---
# Este estágio serve apenas para instalar tudo e construir o código TypeScript
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Gere o Prisma Client antes de construir o código
RUN npx prisma generate
# Apenas construímos o código. O Prisma Client será gerado no próximo estágio.
RUN npm run build

# --- Estágio 2: Produção (Lógica Corrigida) ---
# Começamos de uma imagem limpa novamente
FROM node:20-alpine
WORKDIR /usr/src/app

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./
# Copia a pasta do schema do Prisma ANTES de instalar as dependências
COPY prisma ./prisma
# Instala APENAS as dependências de produção
RUN npm install --omit=dev
# AGORA, geramos o Prisma Client diretamente no estágio final.
# Isso garante que ele exista e seja compatível com as dependências de produção.
RUN npx prisma generate
# Copia o código transpilado (JavaScript) do estágio 'builder'
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação NestJS vai usar
EXPOSE 3001
# Comando para iniciar a aplicação em modo de produção
CMD ["node", "dist/main"]