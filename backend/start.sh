#!/bin/bash
set -e

php artisan migrate --force
php artisan config:cache

RECAPITO_COUNT=$(php check-seed.php)

if [ "$RECAPITO_COUNT" = "0" ]; then
  echo "Seed non ancora eseguito: avvio php artisan db:seed"
  php artisan db:seed
else
  echo "Seed già eseguito: saltiamo php artisan db:seed (count = $RECAPITO_COUNT)"
fi


php artisan serve --host=0.0.0.0 --port=8000
