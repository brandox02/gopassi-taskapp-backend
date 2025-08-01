# Etapa de desarrollo
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copiar dependencias primero para caché
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar el resto
COPY . .

# Generar Prisma client
RUN npx prisma generate

# Puerto para desarrollo
EXPOSE 3000

CMD ["yarn", "run", "start:dev"]

# Etapa de producción
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Solo copiar lo necesario para producción
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main.js"]