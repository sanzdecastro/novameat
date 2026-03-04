import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  // solo en desarrollo
  if (import.meta.env.PROD) {
    return next();
  }

  const { pathname } = context.url;

  if (
    pathname.startsWith("/en") ||
    pathname.startsWith("/es") ||
    pathname.startsWith("/_astro") ||
    pathname.includes(".")
  ) {
    return next();
  }

  return Response.redirect(new URL(`/en${pathname}`, context.url), 302);
});