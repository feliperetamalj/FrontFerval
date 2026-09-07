import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configuracion de Vite.
 * https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],

  build: {
    // Los assets menores a 4 KB se incrustan como data URI y ahorran peticiones.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        /**
         * Separa React y el router en su propio chunk. Al cambiar el contenido
         * del sitio, el navegador conserva el vendor ya cacheado.
         */
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
