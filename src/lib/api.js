const domain = import.meta.env.PUBLIC_WP_DOMAIN;
export const apiUrl = `${domain}/wp-json/wp/v2`;
export const apiUrlv3 = `${domain}/wp-json/acf/v3`;

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
export async function getPages(lang) {
  return cachedFetch(`${apiUrl}/pages?lang=${lang}`);
}

// Get Options
export async function getOptions() {
  return cachedFetch(`${apiUrlv3}/options/options`);
}

// Get Products
export async function getProducts(lang) {
  return cachedFetch(`${apiUrl}/product?lang=${lang}`);
}

// Get Product Categories
export async function getProductCategories(categoriesApiUrl, idCategory, lang) {
  return cachedFetch(`${categoriesApiUrl}/categories/${idCategory}?lang=${lang}`);
}

// Get Posts
export async function getPosts(lang) {
  return cachedFetch(`${apiUrl}/posts?lang=${lang}`);
}

// Get Singular Page
// Primero busca en el cache de la colección completa (si ya fue cargada por warmCache)
export async function getPage(slug, lang) {
  const collectionUrl = `${apiUrl}/pages?lang=${lang}`;
  const collectionCached = cache.get(collectionUrl);
  if (collectionCached && Date.now() - collectionCached.timestamp < CACHE_TTL) {
    const page = collectionCached.data.find((p) => p.slug === slug);
    if (page) return { ...page };
  }
  const pages = await cachedFetch(`${apiUrl}/pages?slug=${slug}&lang=${lang}`);
  if (!pages.length) return null;
  return { ...pages[0] };
}

// Obtiene una página concreta por ID
export async function getPageById(id) {
  return cachedFetch(`${apiUrl}/pages/${id}`);
}

// Get Singular Product
// Primero busca en el cache de la colección completa (si ya fue cargada por warmCache)
export async function getProduct(slug, lang) {
  const collectionUrl = `${apiUrl}/product?lang=${lang}&_embed`;
  const collectionCached = cache.get(collectionUrl);
  if (collectionCached && Date.now() - collectionCached.timestamp < CACHE_TTL) {
    const product = collectionCached.data.find((p) => p.slug === slug);
    if (product) return { ...product, translations: {} };
  }
  const projects = await cachedFetch(`${apiUrl}/product?slug=${slug}&lang=${lang}&_embed`);
  if (!projects.length) return null;
  return { ...projects[0], translations: {} };
}

/** OBTENER SLUG traducido de producto por ID */
export async function getProductById(id) {
  return cachedFetch(`${apiUrl}/product/${id}`);
}

// Get Singular Ingredient
export async function getIngredient(slug, lang) {
  const ingredients = await cachedFetch(`${apiUrl}/ingredients?slug=${slug}&lang=${lang}&_embed`);
  if (!ingredients.length) return null;
  return { ...ingredients[0], translations: {} };
}

// Get Singular Post
export async function getPost(slug, lang) {
  const posts = await cachedFetch(`${apiUrl}/posts?slug=${slug}&lang=${lang}&_embed`);
  return posts.length ? posts[0] : null;
}

// Warm Cache — llama en segundo plano desde Layout.astro para pre-cargar todo
let cacheWarmed = false;

export function warmCache() {
  if (cacheWarmed) return;
  cacheWarmed = true;

  const langs = ['en', 'es', 'it', 'de'];

  // Todo en paralelo, sin bloquear el render actual
  Promise.all([
    getOptions(),
    ...langs.flatMap((lang) => [
      getPages(lang),
      // Productos con _embed para que getProduct() pueda usarlos directamente
      cachedFetch(`${apiUrl}/product?lang=${lang}&_embed`),
      getPosts(lang),
    ]),
  ]).catch(() => {}); // silencioso — no rompe nada si falla
}
