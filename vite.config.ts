import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        workbox: {
          maximumFileSizeToCacheInBytes: 5000000,
        },
        manifest: {
          name: 'Al Sharq Mobile & Computer Repair',
          short_name: 'Al Sharq',
          description: 'Expert mobile and laptop repair services in Sharjah, UAE.',
          theme_color: '#0e172a',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom') || id.includes('react-router') || id.includes('react-helmet-async')) {
                return 'framework';
              }
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('html-to-image')) {
                return 'pdf-export';
              }
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'charts';
              }
              if (id.includes('firebase')) {
                return 'firebase-db';
              }
              if (id.includes('lucide-react')) {
                return 'lucide-icons';
              }
              if (id.includes('motion')) {
                return 'motion-animations';
              }
            }
          },
        },
      },
    },
  };
});
