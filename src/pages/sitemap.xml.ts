import type { APIRoute } from 'astro';
import { routes } from '../lib/routes.js';

export const prerender = false;

// Idiomas activos que sí sirven páginas en producción. `fr` queda fuera
// porque hoy no está en el switcher y sus rutas legales devuelven 404
// (ver ficha del proyecto en el vault). Añadirlo cuando se cierre.
const LOCALES = ['en', 'es', 'it', 'de'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';
const SITE = 'https://www.novameat.com';
const WP = 'https://admin.novameat.com/wp-json/wp/v2';

// Yoast en este site emite el canonical CON trailing slash para páginas
// (home, /en/journal/, etc.) y SIN trailing slash para posts individuales
// (/en/journal/en-journal-pitch-to-product-creation-lab). Reproducimos esa
// convención en el sitemap para que loc y canonical coincidan siempre.
type Entry = {
  paths: Partial<Record<Locale, string>>;
  lastmod?: string;
  trailingSlash: boolean;
};

const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

// Home por idioma
const homeEntry: Entry = {
  paths: Object.fromEntries(LOCALES.map((l) => [l, ''])) as Entry['paths'],
  trailingSlash: true,
};

// Rutas fijas de la navegación: reutilizamos src/lib/routes.js como fuente
// única de slugs traducidos.
const routeEntries: Entry[] = routes.map((r) => ({
  paths: Object.fromEntries(LOCALES.map((l) => [l, r.slug[l]])) as Entry['paths'],
  trailingSlash: true,
}));

function absUrl(locale: Locale, path: string, slash: boolean): string {
  const suffix = path ? `/${path}` : '';
  const tail = slash ? '/' : '';
  return `${SITE}/${locale}${suffix}${tail}`;
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Consulta a WP REST y agrupa items por su conjunto de traducciones
// (Polylang expone `translations: { [lang]: id }`). Devuelve una lista
// de "grupos": cada grupo representa una única pieza de contenido con
// sus variantes por idioma, listas para emitir con hreflang alternates.
async function fetchTranslatedGroups(
  restBase: string,
  pathBuilder: (locale: Locale, slug: string) => string,
): Promise<Entry[]> {
  const url = `${WP}/${restBase}?per_page=100&_fields=id,slug,modified,lang,translations`;

  let items: Array<{
    id: number;
    slug: string;
    modified?: string;
    lang?: string;
    translations?: Record<string, number>;
  }> = [];

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[sitemap] WP ${restBase} → ${res.status}`);
      return [];
    }
    items = await res.json();
  } catch (err) {
    console.error(`[sitemap] WP ${restBase} fetch failed:`, err);
    return [];
  }

  const byId = new Map<number, (typeof items)[number]>();
  for (const it of items) byId.set(it.id, it);

  const seen = new Set<number>();
  const groups: Entry[] = [];

  for (const it of items) {
    if (seen.has(it.id)) continue;

    const group: Entry = { paths: {}, trailingSlash: false, lastmod: undefined };
    const translations = it.translations ?? {};
    const entries = Object.entries(translations);

    if (entries.length > 0) {
      for (const [loc, id] of entries) {
        if (!isLocale(loc)) continue;
        const t = byId.get(id);
        if (!t) continue;
        group.paths[loc] = pathBuilder(loc, t.slug);
        seen.add(t.id);
        const mod = t.modified?.slice(0, 10);
        if (mod && (!group.lastmod || mod > group.lastmod)) group.lastmod = mod;
      }
    }

    if (Object.keys(group.paths).length === 0) {
      // Item sin traducciones: emitir solo la lang propia (si está en LOCALES).
      if (it.lang && isLocale(it.lang)) {
        group.paths[it.lang] = pathBuilder(it.lang, it.slug);
        group.lastmod = it.modified?.slice(0, 10);
      }
      seen.add(it.id);
    }

    if (Object.keys(group.paths).length > 0) groups.push(group);
  }

  return groups;
}

export const GET: APIRoute = async () => {
  const journalGroups = await fetchTranslatedGroups(
    'posts',
    (_locale, slug) => `journal/${slug}`,
  );

  // Products e ingredients quedan fuera: sus páginas no emiten canonical ni
  // título (Yoast no expone yoast_head_json para esos CPTs). Añadirlas al
  // sitemap sin resolver eso sería contraproducente. Ver ficha del proyecto.

  const allEntries: Entry[] = [homeEntry, ...routeEntries, ...journalGroups];
  const now = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  for (const entry of allEntries) {
    const availableLocales = LOCALES.filter((l) => entry.paths[l] !== undefined);
    if (availableLocales.length === 0) continue;

    for (const locale of availableLocales) {
      const path = entry.paths[locale]!;
      const loc = absUrl(locale, path, entry.trailingSlash);

      const alternates = availableLocales
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(
              absUrl(l, entry.paths[l]!, entry.trailingSlash),
            )}" />`,
        )
        .join('\n');

      // x-default apunta al inglés si existe, si no al primero disponible.
      const defaultLocale = availableLocales.includes(DEFAULT_LOCALE)
        ? DEFAULT_LOCALE
        : availableLocales[0];
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
        absUrl(defaultLocale, entry.paths[defaultLocale]!, entry.trailingSlash),
      )}" />`;

      urls.push(
        `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${entry.lastmod ?? now}</lastmod>\n${alternates}\n${xDefault}\n  </url>`,
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
