import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // deja pasar: ya con locale, assets, endpoints internos
  if (
    pathname === "/favicon.ico" ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/es/") ||
     pathname.startsWith("/it/") ||
      pathname.startsWith("/fr/") ||
      pathname.startsWith("/de/") ||
    pathname.startsWith("/_astro/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return next();
  }

  // caso especial: "/en" o "/es" sin slash final (por si acaso)
  if (pathname === "/en") return Response.redirect(new URL("/en/", context.url), 308);
  if (pathname === "/es") return Response.redirect(new URL("/es/", context.url), 308);
    if (pathname === "/it") return Response.redirect(new URL("/it/", context.url), 308);
    if (pathname === "/fr") return Response.redirect(new URL("/fr/", context.url), 308);
    if (pathname === "/de") return Response.redirect(new URL("/de/", context.url), 308);


  // redirige todo lo demás a default locale
  return Response.redirect(new URL(`/en${pathname}`, context.url), 302);
});