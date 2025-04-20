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
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
});