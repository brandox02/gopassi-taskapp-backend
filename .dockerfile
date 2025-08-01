# Dockerfile
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g npm@latest
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --only=production
RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]