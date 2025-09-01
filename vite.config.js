import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    base: './',
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']

    },
    server: {
        port: 8090,
        open: false,
        proxy: {
            '/version': {
                target: `http://localhost`
            },
            '/northstar': {
                target: `http://localhost`
            },
            '/redirect*': {
                target: `http://localhost`,
            },
        }
    },
    build: {
        outDir: 'dist',
    },
})