// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// astro.config.mjs no carga .env por sí solo; en Vercel la variable llega por
// process.env (dashboard), en local por .env
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
    // ISR: cachea el HTML renderizado en el edge de Vercel. La primera visita
    // renderiza (SSR + WordPress); las siguientes se sirven desde caché sin
    // tocar el servidor ni la API de WP hasta que expira (o se revalida bajo
    // demanda con el bypassToken — ver docs/cache-isr.md).
    isr: {
      expiration: 60 * 5,
      bypassToken: env.VERCEL_ISR_BYPASS_TOKEN,
      exclude: [
        '/api/[...path]',           // endpoints (send-mail) — nunca cachear
        '/[lang]/preview/[slug]',   // previews de WordPress — siempre frescos
      ],
    },
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