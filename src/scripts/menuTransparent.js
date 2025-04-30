// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function menuTransparent() {
  // Seleccionamos todos los wrappers
  const header = document.querySelector("header");
  const dots = header.querySelectorAll("header a span");
  const headerItems = header.querySelectorAll("header a, header svg");
  const trigger = document.querySelector(".points-slider");

  ScrollTrigger.getAll()
  .filter(st => st.vars.id && st.vars.id.startsWith("menuTransparent"))
  .forEach(st => st.kill());
  
  header.style.removeProperty("background-color");
  header.style.removeProperty("border-bottom-color");
  dots.forEach(dot => dot.style.removeProperty("background-color"));
  headerItems.forEach(item => {
    item.style.removeProperty("color");
    item.style.removeProperty("fill");
  });

  if (!trigger) return;
  

  gsap.from(header, {
    backgroundColor: "transparent",
    borderBottomColor: "white",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "top -500px",
      scrub: 1,

    }
  })

  gsap.from(dots, {
    backgroundColor: "white",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "top -500px",
      scrub: 1,

    }
  })

  gsap.from(headerItems, {
    color: "white",
    fill: "white",
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      end: "top -500px",
      scrub: 1,

    }
  })


  ScrollTrigger.refresh();
}