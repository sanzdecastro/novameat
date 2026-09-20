import type { APIRoute } from 'astro';
import { routes } from '../lib/routes.js';

export const prerender = false;

// Idiomas activos que sí sirven páginas en producción. `fr` queda fuera
// porque hoy no está en el switcher y sus rutas legales devuelven 404
// (ver ficha del proyecto en el vault). Añadirlo cuando se cierre.
const LOCALES = ['en', 'es', 'it', 'de'] as const;
const DEFAULT_LOCALE = 'en';
const SITE = 'https://www.novameat.com';

type Entry = { path: string; slugs: Partial<Record<typeof LOCALES[number], string>> };

// Home por idioma
const homeEntry: Entry = {
  path: '',
  slugs: Object.fromEntries(LOCALES.map((l) => [l, ''])),
};

// Rutas fijas de la navegación: reutilizamos src/lib/routes.js como fuente
// única de slugs traducidos. Contenido dinámico (journal posts, products,
// ingredients) queda fuera de esta primera vuelta: Google lo descubre por
// enlaces internos. Si hace falta enumerarlo, ampliar consultando WP REST.
const routeEntries: Entry[] = routes.map((r) => ({
  path: '',
  slugs: Object.fromEntries(LOCALES.map((l) => [l, r.slug[l]])) as Entry['slugs'],
}));

const ENTRIES: Entry[] = [homeEntry, ...routeEntries];

function absUrl(locale: string, slug: string): string {
  const suffix = slug ? `/${slug}` : '';
  return `${SITE}/${locale}${suffix}/`;
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const now = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  for (const entry of ENTRIES) {
    for (const locale of LOCALES) {
      const slug = entry.slugs[locale];
      if (slug === undefined) continue;

      const loc = absUrl(locale, slug);
      const alternates = LOCALES.filter((l) => entry.slugs[l] !== undefined)
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(
              absUrl(l, entry.slugs[l]!),
            )}" />`,
        )
        .join('\n');

      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
        absUrl(DEFAULT_LOCALE, entry.slugs[DEFAULT_LOCALE] ?? ''),
      )}" />`;

      urls.push(
        `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${now}</lastmod>\n${alternates}\n${xDefault}\n  </url>`,
      );
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  });
};
