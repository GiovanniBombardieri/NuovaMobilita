FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip zip git curl libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip
    
# Node.js, NPM
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY ../frontend/dist /app/public

WORKDIR /app

COPY . /app

RUN composer install --optimize-autoloader

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]