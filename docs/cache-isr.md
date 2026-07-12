# Caché ISR y revalidación desde WordPress

## Qué hace

El adaptador de Vercel está configurado con **ISR** (`astro.config.mjs`):

- La primera visita a una URL renderiza la página (SSR + llamadas a la API de WordPress) y el HTML queda cacheado en el edge de Vercel.
- Las visitas siguientes se sirven desde caché (~50 ms, sin tocar WordPress).
- La caché expira a los **5 minutos** (`expiration: 300`); la siguiente visita re-renderiza.
- Excluidos de caché: `/api/*` (formulario de contacto) y `/{lang}/preview/*` (previews de WP).

## Configuración necesaria en Vercel

En **Vercel → Project → Settings → Environment Variables**, añadir:

```
VERCEL_ISR_BYPASS_TOKEN = <el valor de .env local>
```

(El token está en el `.env` local, clave `VERCEL_ISR_BYPASS_TOKEN`. Sin esta
variable en Vercel, el ISR funciona igual pero sin revalidación bajo demanda.)

## Revalidación inmediata al guardar en WordPress (opcional)

Sin esto, los cambios en WP tardan como máximo 5 minutos en verse. Para que
sean inmediatos, añadir en el tema de WordPress (`functions.php`) — o en un
plugin tipo Code Snippets:

```php
add_action('save_post', function ($post_id, $post) {
    if (wp_is_post_revision($post_id) || $post->post_status !== 'publish') return;

    $token = 'EL_TOKEN_DE_VERCEL_ISR_BYPASS_TOKEN';
    $langs = ['en', 'es', 'it', 'de'];
    $slug  = $post->post_name;

    // URLs a refrescar: la página en cada idioma + las homes
    $paths = ['/en/', '/es/', '/it/', '/de/'];
    foreach ($langs as $lang) {
        $paths[] = "/$lang/$slug";
        $paths[] = "/$lang/legal/$slug"; // por si es una página legal
    }

    foreach ($paths as $path) {
        wp_remote_get("https://www.novameat.com$path", [
            'headers'  => ['x-prerender-revalidate' => $token],
            'blocking' => false,
            'timeout'  => 5,
        ]);
    }
}, 10, 2);
```

Una petición con la cabecera `x-prerender-revalidate: <token>` fuerza el
re-render de esa URL y actualiza la copia cacheada para el resto de visitantes.

## Verificar que funciona

```bash
curl -sI https://www.novameat.com/en/ | grep -i x-vercel-cache
```

- Primera visita: `MISS` · siguientes (hasta 5 min): `HIT` — antes era `MISS` siempre.
- `STALE` = sirvió caché caducada y está regenerando en segundo plano.

## Nota sobre la caché en memoria (`src/lib/api.js`)

La caché de 5 min de `cachedFetch()` sigue existiendo y ayuda *durante* un
render (evita repetir la misma llamada), pero en Vercel cada lambda arranca
fría, así que la caché real entre visitantes es esta de ISR.
