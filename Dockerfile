FROM node:25-alpine AS build
WORKDIR /app
COPY package*.json ./   
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:25-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/generated ./generated
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD [ "sh", "-c", "npx prisma migrate deploy && node dist/main" ]