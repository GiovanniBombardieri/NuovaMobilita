#!/bin/bash
set -e

php artisan migrate --force
php artisan config:cache

# Controlla se la tabella tipo_recapito è vuota (indicatore che il seed non è ancora stato eseguito)
if [ "$(php artisan db:query 'select count(*) from tipo_recapito' --no-ansi | tail -n1)" = "0" ]; then
  echo "Seed non ancora eseguito: avvio php artisan db:seed"
  php artisan db:seed
else
  echo "Seed già eseguito: saltiamo php artisan db:seed"
fi

php artisan serve --host=0.0.0.0 --port=8000