// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initTabsAnimation() {
  // Selecciona headers, indicador y contenidos
  const tabHeaders = document.querySelectorAll(".tab-header .tab");
  const tabIndicator = document.querySelector(".tab-header .tab-indicator");
  const tabContents = document.querySelectorAll(".tab-inside .tab-inside");
  if (!tabHeaders.length || !tabIndicator || !tabContents.length) return;

  // Función para activar una pestaña
  function activateTab(header) {
    // Mueve y ajusta ancho del indicador
    const { offsetLeft: x, clientWidth: width } = header;
    gsap.to(tabIndicator, { x, width, duration: 0.4, ease: "power2.out" });

    // Muestra el contenido asociado
    const id = header.dataset.id;
    tabContents.forEach(content => {
      if (content.dataset.id === id) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });
  }

  // Activa la primera pestaña por defecto
  activateTab(tabHeaders[0]);

  // Asigna evento click a cada header
  tabHeaders.forEach(header => {
    header.addEventListener("click", () => activateTab(header));
  });
}
