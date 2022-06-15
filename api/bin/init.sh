composer install && \
cp .env.example .env &&
php artisan key:generate && \
php artisan storage:link && \
chmod 777 -R *
