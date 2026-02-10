import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, request }) => {
  const rest = params.rest ?? "";
  const path = Array.isArray(rest) ? rest.join("/") : String(rest);

  // Idioma por defecto (cámbialo si quieres)
  const lang = "en";

  const url = new URL(request.url);
  url.pathname = `/${lang}/preview/${path}`;
  // si tu router necesita slash final, descomenta:
  // url.pathname = `/${lang}/preview/${path}/`;

  // Conserva querystring si viniera algo (opcional)
  // url.searchParams.set(...) si quieres inyectar secret aquí

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.pathname + url.search, // relativo (más seguro)
    },
  });
};
