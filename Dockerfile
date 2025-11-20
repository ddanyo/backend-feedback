FROM node:25-alpine AS build

# Обновляем системные пакеты Alpine, чтобы применять патчи безопасности
RUN apk update && apk upgrade --no-cache

# Установите рабочую директорию
WORKDIR /app

# Копируйте файлы package и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте остальные файлы проекта
COPY . .

# Соберите NestJS проект (предполагается, что 'npm run build' создаёт папку 'dist')
FROM node:25-alpine

# Обновляем системные пакеты Alpine, чтобы применять патчи безопасности
RUN apk update && apk upgrade --no-cache

# Установите рабочую директорию
WORKDIR /app

# Копируйте только файлы package.json для установки продакшн-зависимостей
COPY package*.json ./
# Устанавливаем только зависимости, необходимые для запуска (без devDependencies)
RUN npm install --only=production
COPY package*.json ./
# Устанавливаем только зависимости, необходимые для запуска (без devDependencies)
RUN npm install --only=production

# Копируйте собранный код из стадии 'build'
COPY --from=build /app/dist ./dist

# Порт, который слушает NestJS (внутри контейнера)
EXPOSE 80

# Команда запуска (предполагается, что у вас есть 'node dist/main.js' или аналог)
CMD [ "node", "dist/main" ]