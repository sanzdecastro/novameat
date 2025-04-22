<script>
import { gsap } from "gsap";


export default {
  name: "subHeader",
  props: {
    section: {
      type: Array,
    },
  },
  data() {
    
  },
  mounted() {
    this.setMarginTop();
    this.headerScroll();
  },
  methods : {
    setMarginTop() {
      const subHeader = document.querySelector(".sub-header");
      const header = document.querySelector("header");
      let heightHeader = header.offsetHeight;
      console.log(heightHeader);

      subHeader.style.marginTop = `${heightHeader}px`;
    },
    headerScroll() {
      const header = document.querySelector(".sub-header");
      window.addEventListener("scroll" , () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.lastScrollY) {
          // 🔽 Scroll hacia abajo → ocultar hacia arriba
          gsap.to(header, {
            yPercent: -100,
            duration: .8,
            ease: "power2.out",
          });
         
        } else {
          // 🔼 Scroll hacia arriba → mostrar hacia abajo
          gsap.to(header, {
            yPercent: 0,
            duration: 0.5,
            ease: "power2.out",
          });
          
        }
        this.lastScrollY = currentScrollY;
      })
    }
  }
};
</script>
<template>
    <div class="sub-header">
        <ul class="flex justify-between md:justify-center items-center w-full gap-items-menu">
            <li v-for="(item, index) in section.items_sub_header">
              <a :href="item.id">{{item.item}}</a>
            </li>
        </ul>
    </div>
</template>