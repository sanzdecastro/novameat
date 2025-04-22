// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function headerProductSelector() {
  const items = document.querySelectorAll(".sub-header ul li a, header ul li a, .button-contact, .mobile-menu .menu-items li a");


  if (items.length === 0) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // Antes de activar el clicado, limpiamos la clase de todos
      items.forEach((i) => i.classList.remove("active"));
      // Añadimos la clase sólo al elemento clicado
      item.classList.add("active");
    });
  });
}
