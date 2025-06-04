## Install

    composer install && npm install

### Public/Private keys

    php artisan install:api --passport

Get keys from /storage and add them to the .env file

    PASSPORT_PRIVATE_KEY=[your_private_key]
    PASSPORT_PUBLIC_KEY=[your_public_key]

### Client

    php artisan passport:client

Copy displayed client credentials to .env file

    OAUTH_CLIENT_ID=[your_client_id]
    OAUTH_CLIENT_SECRET=[your_client_secret]
    OAUTH_CLIENT_CALLBACK=http://your.domain/auth/callback
    OAUTH_CLIENT_SCOPE=*

### Migrations

    php artisan migrate

### Run

Host it on your server of choice (artisan serve won't work because of nested http requests)
