// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimation() {
  // Seleccionamos todos los wrappers
  const wrappers = document.querySelectorAll(".scroll-wrapper");
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    // Dentro de cada wrapper, buscamos sus cards
    const cards = wrapper.querySelectorAll(".card");
    if (!cards.length) return;

    // Sumamos los anchos de las cards
    const totalWidth = Array.from(cards)
      .reduce((sum, card) => sum + card.offsetWidth, 0);

    // Calculamos cuánto desplazar; ajusta el +500 si no lo necesitas
    const amountToScroll = Math.max(0, totalWidth - window.innerWidth + 500);

    // Creamos un ScrollTrigger para este wrapper
    gsap.to(wrapper, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "center center",
        end: () => `+=${amountToScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // recalcula amountToScroll al hacer refresh
      },
    });
  });

  // Refrescar para que ScrollTrigger detecte todo
  ScrollTrigger.refresh();
}