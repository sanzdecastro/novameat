<script>
import { gsap } from "gsap";
import Logo from "./logo.vue";

export default {
  name: "appHeader",
  components: {
    Logo,
  },
  props: {
    lang: {
      type: String,
    },
    routes: {
      type: Array,
    },
    switchUrls: {
      type: Array,
    },
    colorText: {
      type: String,
    },
    bgHeader: {
      type: String,
    },
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
  computed: {
    // Encuentra el objeto contact dentro de routes
    contactRoute() {
      return this.routes.find((r) => r.key === "contact");
    },
  },
  methods: {
    headerScroll() {
      const header = document.querySelector("header");
      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.lastScrollY) {
          // 🔽 Scroll hacia abajo → ocultar hacia arriba
          gsap.to(header, {
            yPercent: -100,
            duration: 0.8,
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
      });
    },
    to(route) {
      // ej: route.slug[this.lang] -> 'productos' si lang==='es'
      return `/${this.lang}/${route.slug[this.lang]}`;
    },
    homeUrl() {
      return `/${this.lang}/`;
    },
    setMenuMobile() {
      const menuMobile = document.querySelector(".mobile-menu");
      gsap.set(menuMobile, {
        yPercent: -100,
        autoAlpha: 0,
      });
    },
    toggleMenu() {
      const menuMobile = document.querySelector(".mobile-menu");
      const items = menuMobile.querySelectorAll(".menu-items li a");
      const tl = gsap.timeline({});

      gsap.set(items, {
        autoAlpha: 0,
      });

      if (this.menuMobile === false) {
        tl.to(menuMobile, {
          autoAlpha: 1,
          duration: 0.1,
          ease: "power2.out",
        }).to(menuMobile, {
          yPercent: 0,
        }).to(items, {
          stagger: 0.06,
          ease: "power2.out",
          autoAlpha: 1
        });
        this.menuMobile = true;
      } else if (this.menuMobile === true) {
        tl.to(menuMobile, {
          autoAlpha: 1,
          duration: 0.1,
        }).to(menuMobile, {
          yPercent: -100,
          ease: "power2.out",
        }).to(items, {
          stagger: 0.1,
          autoAlpha: 0
        });;
        this.menuMobile = false;
      }
    },
  },
};
</script>
<template>
  <header
    :class="[
      colorText,
      colorText === 'text-black' ? 'border-black' : 'border-white',
      menuMobile ? '!bg-pink !border-black' : bgHeader,
    ]"
    class="z-15 fixed top-0 left-0 w-full border-b py-[12px] px-[10px] md:py-sm md:px-md flex justify-between text-menu text-white"
  >
    <a :href="homeUrl()" class="flex items-center">
      <Logo class="h-logo" :color="menuMobile ? '#000' : colorText" />
    </a>

    <a :class="menuMobile ? '!text-black' : colorText" class="md:hidden open-mobile-menu" @click="toggleMenu"
      >Menu (<span v-if="menuMobile === false">+</span><span v-else>-</span>)</a
    >

    <ul class="hidden md:flex gap-items-menu">
      <li
        v-for="route in routes.filter((r) => r.key !== 'contact' && r.key !== 'legal')"
        :key="route.key"
      >
        <a :class="colorText" :href="to(route)">
          <span class="dot"
            :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"
          ></span>
          {{ route.label[lang] }}
        </a>
      </li>
    </ul>

    <ul>
      <li v-if="contactRoute">
        <a :href="to(contactRoute)" :class="[menuMobile ? '!text-black' : colorText, 'button-contact']">
          <span class="dot"
            :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"
          ></span>
          {{ contactRoute.label[lang] }}
        </a>
      </li>
    </ul>
  </header>
  <div class="mobile-menu opacity-0 md:hidden">
    <ul class="menu-items mt-[20vh] flex flex-col gap-1">
      <li
        v-for="route in routes.filter((r) => r.key !== 'legal')"
        :key="route.key"
      >
        <a @click="toggleMenu" :class="colorText" :href="to(route)">
          {{ route.label[lang] }}
          <span
            :class="colorText === 'text-black' ? 'bg-black' : 'bg-white'"
          ></span>
          
        </a>
      </li>
    </ul>
    <div class="legal-lang-social flex text-small">
      <div class="w-full legal-lang md:w-max-ssm flex flex-col">
        <ul class="w-full pb-md">
          <li><a href="">Legal Notice</a></li>
          <li><a href="">Cookie Information</a></li>
          <li><a href="">Privacy Statement</a></li>
        </ul>
        <ul class="lang gap-2 flex language-switcher">
            <li v-for="item in switchUrls" :key="item.code">
                <a
                 @click="toggleMenu"
                :href="item.url"
                :class="{ active: item.code === lang }"
                >
                {{ item.code.toUpperCase() }}
                </a>
            </li>
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
