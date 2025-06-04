# # STAGE 1: build frontend
# FROM node:18 AS frontend

# WORKDIR /app
# COPY frontend/package.json frontend/package-lock.json* ./
# RUN npm install
# COPY frontend/ ./
# RUN npm run build

# # STAGE 2: build backend
# FROM php:8.2-cli

# RUN apt-get update && apt-get install -y \
#     unzip zip git curl libzip-dev libonig-dev libxml2-dev \
#     && docker-php-ext-install pdo_mysql zip
    
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# WORKDIR /app
# COPY backend /app
# RUN composer install --optimize-autoloader

# # Copy the built frontend from the first stage
# COPY --from=frontend /app/dist /app/public

# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip zip git curl libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . /app

RUN composer install --optimize-autoloader

# Laravel key generation (optional: can be done manually)
# RUN php artisan key:generate

CMD ["./start.sh"]