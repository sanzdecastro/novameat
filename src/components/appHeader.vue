<script>
import { gsap } from "gsap";
import Logo from './logo.vue';

export default {
  name: "appHeader",
  components: {
    Logo,
  },
  data() {
    return {
      lastScrollY: 0,
      colorLogo: "#eee9e3"
    };
  },
  mounted() {
    this.headerScroll()
  },
  methods : {
    headerScroll() {
      const header = document.querySelector("header");
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
    <header class="z-10 fixed top-0 left-0 w-full border-b border-white py-sm px-md flex justify-between text-menu text-white">
        <a href="/" class="flex items-center">
          <Logo class="w-logo" :color="colorLogo" />
        </a>

        <ul class="flex gap-items-menu">
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/find-us">Find us</a></li>
            <li><a href="/journal">Journal</a></li>
        </ul>

        <a a href="/contact">Contact</a>
	</header>
</template>