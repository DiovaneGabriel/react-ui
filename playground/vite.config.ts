// REACT-UI/playground/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    root: __dirname,
    plugins: [react()],
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, '../src'),
        },
    },
    server: {
        host: true,
        port: 5173,

        // add the next lines if you're using windows and hot reload doesn't work
        // watch: {
        //   usePolling: true
        // }
    },
});
