import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function headerProductSelector() {
  // 1) Todos los enlaces que queremos marcar como active
  const items = document.querySelectorAll(
    ".sub-header ul li a, header ul li a, .button-contact, .mobile-menu .menu-items li a"
  );
  if (!items.length) return;

  // 2) Mapear id de sección → enlace correspondiente
  //    Creamos un objeto para acceder rápido por id
  const linkById = {};
  items.forEach((el) => {
    const href = el.getAttribute("href");
    if (href && href.startsWith("#")) {
      const id = href.slice(1);
      linkById[id] = el;
    }
  });

  // 3) CLICK: al clicar, limpia y activa sólo el enlace clicado
  items.forEach((el) => {
    el.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("active"));
      el.classList.add("active");
    });
  });

  // 4) SCROLL: usa ScrollTrigger para cada sección observada
  document.querySelectorAll("section[id], div[id]").forEach((section) => {
    const id = section.id;
    // Si no hay enlace para esta sección, lo ignoramos
    console.log(id)
    if (!linkById[id]) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top center",      // cuando la parte superior de la sección
                                 // cruza el centro del viewport
      end: "bottom center",     // hasta que la parte inferior cruza el centro
      onEnter: () => setActive(id),
      onEnterBack: () => setActive(id),
      // opcional: limpiar active al salir abajo
      onLeave: () => linkById[id].classList.remove("active"),
    });
  });

  // Función auxiliar para activar un enlace dado su id
  function setActive(id) {
    // limpia todas
    Object.values(linkById).forEach((el) => el.classList.remove("active"));
    // activa la que corresponde
    linkById[id].classList.add("active");
  }
}