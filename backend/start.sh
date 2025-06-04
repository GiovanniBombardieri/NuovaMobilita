#!/bin/bash
set -e  # esce al primo errore

php artisan migrate --force
php artisan config:cache
php artisan serve --host=0.0.0.0 --port=8000