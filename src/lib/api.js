const domain = import.meta.env.PUBLIC_WP_DOMAIN;
export const apiUrl = `${domain}/wp-json/wp/v2`;

// Get Pages
export async function getPages(lang) {
  const response = await fetch(`${apiUrl}/pages?lang=${lang}`);
  if (!response.ok) throw new Error("Error al obtener pages");
  return await response.json();
}



// Get Products
export async function getProducts(lang) {
  const response = await fetch(`${apiUrl}/product?lang=${lang}`);
  if (!response.ok) throw new Error("Error al obtener products");
  return await response.json();
}

// Get Product Categories
export async function getProductCategories(apiUrl, idCategory, lang) {
  const response = await fetch(`${apiUrl}/categories/${idCategory}?lang=${lang}`);
  if (!response.ok) throw new Error("Error al obtener categories");
  return await response.json();
}

// Get Posts
export async function getPosts(lang) {
  const response = await fetch(`${apiUrl}/posts?lang=${lang}`);
  if (!response.ok) throw new Error("Error al obtener posts");
  return await response.json();
}

// Get Singular Page
export async function getPage(slug, lang) {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}&lang=${lang}`);
  const pages = await response.json();

  if (!pages.length) return null;

  const page = pages[0]; 

  return { ...page };
}
// Obtiene una página concreta por ID
export async function getPageById(id) {
  const res = await fetch(`${apiUrl}/pages/${id}`);
  if (!res.ok) throw new Error('WP: fallo al cargar página por ID');
  return res.json();
}

// Get Singular Product
export async function getProduct(slug, lang) {

  const response = await fetch(
    `${apiUrl}/product?slug=${slug}&lang=${lang}&_embed`
  );
  const projects = await response.json();

  if (!projects.length) return null;

  const project = projects[0]; 

  return { ...project, translations: {} };
}

/** OBTENER SLUG traducido de producto por ID */
export async function getProductById(id) {
  const res = await fetch(`${apiUrl}/product/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto por ID");
  return res.json();
}

// Get Singular Ingredient
export async function getIngredient(slug, lang) {

  const response = await fetch(
    `${apiUrl}/ingredients?slug=${slug}&lang=${lang}&_embed`
  );
  const ingredients = await response.json();

  if (!ingredients.length) return null;

  const ingredient = ingredients[0]; 

  return { ...ingredient, translations: {} };
}

// Get Singular Post
export async function getPost(slug, lang) {
  const response = await fetch(`${apiUrl}/posts?slug=${slug}&lang=${lang}`);
  const posts = await response.json();
  return posts.length ? posts[0] : null;
}
