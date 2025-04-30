// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: 'server',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ['en','es'],
    routing: {
      // ✅ Every page (even English) is under /en/... or /es/...
      prefixDefaultLocale: true,
      // ✅ Redirect “/” → “/en/” automatically
      redirectToDefaultLocale: true,
    }
  },
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
});