// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function orderButtonAnimation() {
  // Seleccionamos todos los wrappers
  const button = document.querySelector(".section-button-empty a");
  const trigger = document.querySelector(".section-button-empty .button-wrapper");
  if (!button ) return;

  gsap.set(button, {
    float: "right",
    position: "fixed",
    bottom: "10px",
    right: "10px",
    width: "calc((113/1550)*100vw)",
    height: "calc((113/1550)*100vw)",
  })



  gsap.to(button, {
    width: "calc(98%)",
    height: "100%",
    bottom: "unset",
     position: "absolute",
    scrollTrigger: {
      trigger: trigger,
      end: "bottom bottom",
      scrub: 1,
      // markers: true
    }
  })

  // Refrescar para que ScrollTrigger detecte todo
  ScrollTrigger.refresh();
}