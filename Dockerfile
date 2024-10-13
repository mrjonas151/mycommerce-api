# Build stage
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Gerar o cliente Prisma
RUN npx prisma generate

COPY . .

RUN npm run build

# Production stage
FROM node:20

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY prisma ./prisma
COPY .env .env

EXPOSE 8080

CMD ["npm", "start"]