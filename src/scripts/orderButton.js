// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function orderButtonAnimation() {
  // Seleccionamos todos los wrappers
  const button = document.querySelector(".section-button-empty a");
  const trigger = document.querySelector(".section-button-empty .button-wrapper-resize");
  if (!button ) return;

  const isLargeScreen = window.innerWidth > 768;
  const sizeButton = isLargeScreen ? "calc((113/1550)*100vw)" : "96px";
  const widthButton = isLargeScreen ? "calc(98%)" : "calc(95%)";
  const colorText = isLargeScreen ? "white" : "black";
  const colorBackground = isLargeScreen ? "black" : "white";

  gsap.set(button, {
    float: "right",
    position: "fixed",
    bottom: "10px",
    right: "10px",
    backgroundColor: "transparent",
    color: "white",
    aspectRatio: "1/1",
    width: sizeButton,
    height: sizeButton,
  })



  gsap.to(button, {
    width: widthButton,
    height: "100%",
    bottom: "unset",
    position: "absolute",
    backgroundColor: colorBackground,
    color: colorText,
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