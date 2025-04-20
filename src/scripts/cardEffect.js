// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function cardEffect() {
  const cards = document.querySelectorAll(".cardCont");


  if (!cards ) return;
  
gsap.utils.toArray(cards).forEach(function(card) {
  const front = card.querySelector(".cardFront");
  const back  = card.querySelector(".cardBack");

  // Estado inicial 3D
  gsap.set(card, {
    transformStyle: "preserve-3d",
    transformPerspective: 1000,
    transformOrigin: "center center",
  });
  gsap.set(back, { rotationY: -180 });

  function flipIn() {
    // Paramos lo que quede corriendo
    gsap.killTweensOf([front, back]);
    // Giramos a adelante
    gsap.to(front, { rotationY:  180, duration: 0.3, ease: "power1.out" });
    gsap.to(back,  { rotationY:    0, duration: 0.3, ease: "power1.out" });
  }

  function flipOut() {
    // Paramos lo que quede corriendo
    gsap.killTweensOf([front, back]);
    // Volvemos al estado inicial
    gsap.to(front, { rotationY:  0,   duration: 0.3, ease: "power1.in"  });
    gsap.to(back,  { rotationY: -180, duration: 0.3, ease: "power1.in"  });
  }

  card.addEventListener("mouseenter", flipIn);
  card.addEventListener("mouseleave", flipOut);
});

  ScrollTrigger.refresh();
}
