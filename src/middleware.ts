import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // deja pasar: ya con locale, assets, endpoints internos
  if (
    pathname === "/favicon.ico" ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/es/") ||
    pathname.startsWith("/_astro/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return next();
  }

  // caso especial: "/en" o "/es" sin slash final (por si acaso)
  if (pathname === "/en") return Response.redirect(new URL("/en/", context.url), 308);
  if (pathname === "/es") return Response.redirect(new URL("/es/", context.url), 308);

  // redirige todo lo demás a default locale
  return Response.redirect(new URL(`/en${pathname}`, context.url), 302);
});