// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initProductAnimations() {
  const dish = document.querySelector(".back-image-container .image-wrapper");
  const info = document.querySelector(".info-column");
  const gallery = document.querySelector(".gallery");
  if (!dish || !info || !gallery) return;


  if (window.innerWidth > 768) {
    // animación del plato
    gsap.to(dish, {
      scale: 0.8,
      duration: 3,
      xPercent: -65,
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: dish,
        start: "top top",
        endTrigger: info,
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
    });

    // pin de info
    gsap.to(info, {
      scrollTrigger: {
        trigger: info,
        start: "top top",
        endTrigger: gallery,
        end: "bottom bottom",
        pin: true,
        scrub: 1,
        // markers: true,
      },
    });
    ScrollTrigger.refresh();
  }
  

}
