// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en','es'],
    routing: {
      prefixDefaultLocale: true,
   }
  },
  // Con <ViewTransitions /> Astro activa prefetchAll por defecto: cada enlace por
  // el que pasa el ratón dispara una navegación SSR completa en segundo plano
  // (golpeando la API de WordPress), que puede pisarse con la del clic real y
  // dejar la página a medio cargar. Lo desactivamos explícitamente.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ['../../..']
      }
    }
  }
});