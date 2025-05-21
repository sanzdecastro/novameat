<script>
import { gsap } from "gsap";
export default {
  name: "cursor",
  props: {
    colorCursor: {
      type: String,
    },
  },
  mounted(){
     const cursor = this.$refs.cursor;
     const originalClass = this.colorCursor;
    // guardamos estado por defecto
    const defaultScale = 1;

     gsap.set(cursor, { xPercent: -50, yPercent: -50 });

     window.addEventListener("mousemove", e => {
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: "power3.out"
      });
    });

     const hoverables = document.querySelectorAll("a, button, img");
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { duration: 0.2, scale: 1.5 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { duration: 0.2, scale: defaultScale });
      });
    });

     // 3) Detectar todos los elementos que tengan bg-pink
    const sameColorEls = document.querySelectorAll(`.${originalClass}`);
    sameColorEls.forEach(el => {
      el.addEventListener("mouseenter", () => {
        // quitamos bg-pink y ponemos bg-black
        cursor.classList.replace(originalClass, "bg-black");
      });
      el.addEventListener("mouseleave", () => {
        // revertimos
        cursor.classList.replace("bg-black", originalClass);
      });
    });
  },
  
};
</script>
<template>

<div ref="cursor" :class="['cursor', colorCursor]" ></div>

</template>
