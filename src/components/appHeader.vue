<script>
import { gsap } from "gsap";
import Logo from './logo.vue';

export default {
  name: "appHeader",
  components: {
    Logo,
  },
  props: {
    colorText: {
      type: String,
    },
    bgHeader: {
      type: String
    }
  },
  data() {
    return {
      lastScrollY: 0,
      menuMobile: false,
    };
  },
  mounted() {
    this.headerScroll();
    this.setMenuMobile();
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
    },
    setMenuMobile() {
      const menuMobile = document.querySelector(".mobile-menu");
      gsap.set(menuMobile, {
        xPercent: -100,
        autoAlpha: 0,
      })
    },
    toggleMenu() {
      const menuMobile = document.querySelector(".mobile-menu");

      const tl = gsap.timeline({})

      if(this.menuMobile === false ){
        tl.to(menuMobile, {
          autoAlpha: 1,
          duration: .1,
        }).to(menuMobile, {
          xPercent: 0,
        })
        this.menuMobile = true;
      } else if (this.menuMobile === true) {
        tl.to(menuMobile, {
          autoAlpha: 1,
          duration: .1,
        }).to(menuMobile, {
          xPercent: -100,
        })
        this.menuMobile = false;
      }
      

    }
  }
};
</script>
<template>
    <header :class="[ bgHeader, colorText === 'text-black' ? 'border-black' : 'border-white' ]" class="z-15 fixed top-0 left-0 w-full border-b  py-[12px] px-[10px] md:py-sm md:px-md flex justify-between text-menu text-white">
        <a href="/" class="flex items-center">
          <Logo class="h-logo" :color="colorText" />
        </a>

        <a class="md:hidden open-mobile-menu " @click="toggleMenu">Menu (<span>+</span>)</a>

        <ul class="hidden md:flex gap-items-menu">
            <li><a :class=colorText href="/products"><span :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"></span>Products</a></li>
            <li><a :class=colorText href="/about"><span :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"></span>About</a></li>
            <li><a :class=colorText href="/find-us"><span :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"></span>Find us</a></li>
            <li><a :class=colorText href="/journal"><span :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"></span>Journal</a></li>
        </ul>

       

        <ul><li><a :class=colorText class="button-contact"  href="/contact"><span :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"></span>Contact</a></li></ul>
	</header>
  <div class="mobile-menu opacity-0 md:hidden">
      <ul class="menu-items mt-[20vh] flex flex-col gap-1">
          <li><a @click="toggleMenu" href="/products">Products<span></span></a></li>
          <li><a @click="toggleMenu" href="/about">About<span></span></a></li>
          <li><a @click="toggleMenu" href="/find-us">Find us<span></span></a></li>
          <li><a @click="toggleMenu" href="/journal">Journal<span></span></a></li>
          <li><a @click="toggleMenu" href="/contact">Contact<span></span></a></li>
      </ul>
      <div class="legal-lang-social flex text-small">
        <div class="w-full legal-lang md:w-max-ssm flex flex-col">
            <ul class="w-full pb-md">
                <li><a href="">Legal Notice</a></li>
                <li><a href="">Cookie Information</a></li>
                <li><a href="">Privacy Statement</a></li>
            </ul>
            <ul class="lang flex">
                <li><a href="">ES</a></li> / <li><a href="">EN</a></li>
            </ul>
        </div>
        <div class="w-full social md:w-max-ssm flex flex-col">
          <ul>
            <li><a href="">LinkedIn</a></li>
            <li><a href="">Instagram</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>