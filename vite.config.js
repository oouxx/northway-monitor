import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import commonjs from '@rollup/plugin-commonjs'
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        commonjs()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
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