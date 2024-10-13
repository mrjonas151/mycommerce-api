# Build stage
FROM node:20 AS build

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todos os arquivos do projeto, incluindo o prisma/schema.prisma e o .env
COPY . .

# Gerar o cliente Prisma
RUN npx prisma generate

# Compilar o código TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Instalar apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Copiar os arquivos compilados e o cliente Prisma da fase de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Copiar o arquivo .env para a fase de produção
COPY .env .env

# Expor a porta 8080
EXPOSE 8080

# Iniciar a aplicação
CMD ["npm", "start"]