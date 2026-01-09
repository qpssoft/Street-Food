import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages deployment
  site: 'https://qpssoft.github.io',
  base: '/Street-Food',

  // Static site generation (no SSR)
  output: 'static',

  // Build configuration
  build: {
    // Inline critical CSS for performance
    inlineStylesheets: 'auto',
    // Generate static HTML files
    format: 'file',
  },

  // Image optimization with sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Responsive image formats
    formats: ['webp', 'avif', 'jpeg'],
    // Image quality settings
    quality: {
      webp: 80,
      avif: 75,
      jpeg: 85,
    },
  },

  // Compress HTML output
  compressHTML: true,

  // Vite configuration for build optimization
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Rollup options for chunk splitting
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    // Server configuration for development
    server: {
      port: 4321,
      host: true,
    },
  },
});
