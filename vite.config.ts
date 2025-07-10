import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // garante o `index.d.ts` na raiz do dist
      outDir: 'dist'
    })
  ],
  server: {
    host: true,
    port: 5173,
    // watch: {
    //   usePolling: true
    // }
  },
  build: {
    target: 'es2018',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'ReactUiLib',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: true
  }
});
