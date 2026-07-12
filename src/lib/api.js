const domain = import.meta.env.PUBLIC_WP_DOMAIN;
export const apiUrl = `${domain}/wp-json/wp/v2`;
export const apiUrlv3 = `${domain}/wp-json/acf/v3`;

// Campos que realmente consume el front (auditado en src/pages y src/components).
// `_fields` recorta el payload de WP: p. ej. una página por id pasa de ~7 KB a
// ~23 bytes, y una página por slug de 7,3 KB a 3 KB. Si un template nuevo
// necesita otro campo, añadirlo aquí.
const PAGE_FIELDS = 'id,slug,title,content,acf,yoast_head_json,translations';
// _embedded (featured media, términos) requiere _links para sobrevivir a _fields
const PRODUCT_FIELDS = 'id,slug,title,acf,yoast_head_json,translations,_links,_embedded';
const POST_FIELDS = 'id,slug,title,excerpt,acf,yoast_head_json,translations';
const POST_EMBED_FIELDS = `${POST_FIELDS},_links,_embedded`;
// Para resolver slugs traducidos en el switch de idioma no hace falta nada más
const REF_FIELDS = 'id,slug';

// Cache genérico con TTL de 5 minutos
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

async function cachedFetch(url) {
  const now = Date.now();
  const cached = cache.get(url);

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}: ${response.status}`);
  const data = await response.json();
  cache.set(url, { data, timestamp: now });
  return data;
}

function getWpAuthHeaders() {
  const user = import.meta.env.WP_USER;
  const pass = import.meta.env.WP_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("WP_USER o WP_APP_PASSWORD no definidos");
  }

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");

  return {
    Authorization: `Basic ${auth}`,
  };
}

// ✅ Preview por SLUG (para /preview/industry/)
export async function getPagePreview(slug, lang) {
  const headers = getWpAuthHeaders();

  const url = `${apiUrl}/pages?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(lang)}&status=any&context=edit&per_page=1`;

  const res = await fetch(url, { headers });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`WP ${res.status}: ${text}`);
  }

  const pages = JSON.parse(text);
  return pages?.length ? pages[0] : null;
}


// Get Pages
// per_page=100: el default de WP es 10 y dejaba páginas fuera de la colección
// (p. ej. 'home' era la nº 11), rompiendo la caché de getPage()
export async function getPages(lang) {
  return cachedFetch(`${apiUrl}/pages?lang=${lang}&per_page=100&_fields=${PAGE_FIELDS}`);
}

// Get Options
export async function getOptions() {
  return cachedFetch(`${apiUrlv3}/options/options`);
}

// Get Products
export async function getProducts(lang) {
  return cachedFetch(`${apiUrl}/product?lang=${lang}&per_page=100&_fields=${PRODUCT_FIELDS}`);
}

// Get Product Categories
export async function getProductCategories(categoriesApiUrl, idCategory, lang) {
  return cachedFetch(`${categoriesApiUrl}/categories/${idCategory}?lang=${lang}`);
}

// Get Posts
export async function getPosts(lang) {
  return cachedFetch(`${apiUrl}/posts?lang=${lang}&_fields=${POST_FIELDS}`);
}

// Get Singular Page
// Primero busca en el cache de la colección completa (si ya fue cargada por warmCache)
export async function getPage(slug, lang) {
  // OJO: esta URL debe coincidir exactamente con la de getPages() para que el
  // lookup en la caché de colección funcione
  const collectionUrl = `${apiUrl}/pages?lang=${lang}&per_page=100&_fields=${PAGE_FIELDS}`;
  const collectionCached = cache.get(collectionUrl);
  if (collectionCached && Date.now() - collectionCached.timestamp < CACHE_TTL) {
    const page = collectionCached.data.find((p) => p.slug === slug);
    if (page) return { ...page };
  }
  const pages = await cachedFetch(`${apiUrl}/pages?slug=${slug}&lang=${lang}&_fields=${PAGE_FIELDS}`);
  if (!pages.length) return null;
  return { ...pages[0] };
}

// Obtiene una página concreta por ID — solo se usa para resolver el slug
// traducido en el switch de idioma (Layout.astro): 23 bytes en vez de ~7 KB
export async function getPageById(id) {
  return cachedFetch(`${apiUrl}/pages/${id}?_fields=${REF_FIELDS}`);
}

// Resuelve TODOS los slugs traducidos de una página en una sola petición
// (?include=id1,id2...) en vez de una petición por idioma. Devuelve un mapa
// { en: 'about', es: 'nosotros', ... }. Solo aplica a páginas: productos y
// posts llegan al Layout con translations vacío y no generan petición.
export async function getTranslatedSlugs(translations) {
  const ids = Object.values(translations || {}).filter(Boolean).sort((a, b) => a - b);
  if (!ids.length) return {};
  const items = await cachedFetch(`${apiUrl}/pages?include=${ids.join(',')}&_fields=${REF_FIELDS}`);
  const slugById = new Map(items.map((item) => [item.id, item.slug]));
  const map = {};
  for (const [code, id] of Object.entries(translations)) {
    const slug = slugById.get(id);
    if (slug) map[code] = slug;
  }
  return map;
}

// Get Singular Product
// Primero busca en el cache de la colección completa (si ya fue cargada por warmCache)
export async function getProduct(slug, lang) {
  // OJO: debe coincidir con la URL de la colección que precarga warmCache()
  const collectionUrl = `${apiUrl}/product?lang=${lang}&_embed&per_page=100&_fields=${PRODUCT_FIELDS}`;
  const collectionCached = cache.get(collectionUrl);
  if (collectionCached && Date.now() - collectionCached.timestamp < CACHE_TTL) {
    const product = collectionCached.data.find((p) => p.slug === slug);
    if (product) return { ...product, translations: {} };
  }
  const projects = await cachedFetch(`${apiUrl}/product?slug=${slug}&lang=${lang}&_embed&_fields=${PRODUCT_FIELDS}`);
  if (!projects.length) return null;
  return { ...projects[0], translations: {} };
}

/** OBTENER SLUG traducido de producto por ID */
export async function getProductById(id) {
  return cachedFetch(`${apiUrl}/product/${id}?_fields=${REF_FIELDS}`);
}

// Get Singular Ingredient
// Las cards solo usan _embedded['wp:featuredmedia'] del fetch (10 KB → 3 KB)
export async function getIngredient(slug, lang) {
  const ingredients = await cachedFetch(`${apiUrl}/ingredients?slug=${slug}&lang=${lang}&_embed&_fields=id,slug,_links,_embedded`);
  if (!ingredients.length) return null;
  return { ...ingredients[0], translations: {} };
}

// Get Singular Post
export async function getPost(slug, lang) {
  const posts = await cachedFetch(`${apiUrl}/posts?slug=${slug}&lang=${lang}&_embed&_fields=${POST_EMBED_FIELDS}`);
  return posts.length ? posts[0] : null;
}

// Warm Cache — llama en segundo plano desde Layout.astro para pre-cargar el idioma
// de la petición actual. Antes precargaba los 4 idiomas en cada arranque del
// servidor (~13 peticiones a WP por visita, sin usarse la mayoría); ahora solo
// calienta el idioma que realmente se está visitando.
let optionsWarmed = false;
const warmedLangs = new Set();

export function warmCache(lang) {
  const tasks = [];

  if (!optionsWarmed) {
    optionsWarmed = true;
    tasks.push(getOptions());
  }

  if (lang && !warmedLangs.has(lang)) {
    warmedLangs.add(lang);
    tasks.push(
      getPages(lang),
      // Productos con _embed para que getProduct() pueda usarlos directamente
      // (misma URL que el lookup de getProduct)
      cachedFetch(`${apiUrl}/product?lang=${lang}&_embed&per_page=100&_fields=${PRODUCT_FIELDS}`)
      // getPosts eliminado: getPost() busca siempre por slug y nunca leía esta
      // colección — eran ~300 KB por idioma precargados para nada
    );
  }

  if (!tasks.length) return;

  // En paralelo, sin bloquear el render actual
  Promise.all(tasks).catch(() => {}); // silencioso — no rompe nada si falla
}
