import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    server: {
        port: 8080,
        allowedHosts: true
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css'],
            refresh: true
        }),
        tailwindcss()
    ]
});
