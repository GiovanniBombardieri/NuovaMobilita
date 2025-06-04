#!/bin/bash
set -e

php artisan migrate --force
php artisan config:cache

echo "Variabili DB: DB_HOST=$DB_HOST DB_DATABASE=$DB_DATABASE DB_USERNAME=$DB_USERNAME DB_PASSWORD=${#DB_PASSWORD} chars"

# Connessione diretta al DB per controllare i dati della tabella tipo_recapito
echo "Connessione al DB: host=$DB_HOST, db=$DB_DATABASE, user=$DB_USERNAME"
RECAPITO_COUNT=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USERNAME -d $DB_DATABASE -t -c "SELECT COUNT(*) FROM tipo_recapito;" 2>&1 | tee /dev/stderr | xargs)
echo "RECAPITO_COUNT = '$RECAPITO_COUNT'"

if [ "$RECAPITO_COUNT" = "0" ]; then
  echo "Seed non ancora eseguito: avvio php artisan db:seed"
  php artisan db:seed --force
else
  echo "Seed già eseguito: saltiamo php artisan db:seed (count = $RECAPITO_COUNT)"
fi

php-fpm -D

# Sostituiamo ${PORT} nel file nginx.conf
envsubst '$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx-resolved.conf

# Avviamo nginx con il file aggiornato
nginx -c /etc/nginx/nginx-resolved.conf -g 'daemon off;'