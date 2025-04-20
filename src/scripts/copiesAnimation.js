// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function copiesAnimation() {
  const copiesContainer = document.querySelectorAll("footer .reel-footer p");

  if (!copiesContainer) return;


  const tl = gsap.timeline({repeat:-1})

  // animación del plato
  tl.to(copiesContainer, {
    yPercent: -100,
    delay: 5
  }).to(copiesContainer, {
    yPercent: 0,
    delay: 5
  });

  ScrollTrigger.refresh();

}
