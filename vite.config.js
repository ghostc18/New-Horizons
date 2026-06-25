import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['jquery'],
                    'utils': ['./src/js/utils.js']
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});