<script>
import { getProductCategories, getProduct, apiUrl } from "../lib/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import CardProduct from "./CardProduct.vue";
import Divider from "./Divider.vue";
import { initScrollAnimation } from "../scripts/scrollAnimation.js";

// Import Swiper styles
export default {
  name: "BlockCategoryProduct",
  components: {
    CardProduct,
    Divider
  },
  props: {
    section: {
      type: Array,
    },
  },

  data() {
    return {
      category: this.section.category,
      productCategory: {},
    };
  },
  methods: {
    async fetchProductCategory() {
      console.log(apiUrl);
      try {
        const products = await getProductCategories(
          apiUrl,
          this.category,
          "en"
        );
        this.productCategory = products;
        console.log("Fetched products:", products);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },
  },
  mounted() {
    
    this.fetchProductCategory();
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.$nextTick(() => {
      initScrollAnimation();
   
    });

  },
};
</script>

<template>
  <Divider></Divider>
  <div class="px-sm text-center mb-xxl-2">
    <h2 class="text-title md:mb-lg">{{ this.productCategory.name }}</h2>
    <span class="mb-xxl block">( {{ this.productCategory.count }} )</span>
    <div class="scroll-container w-full"  :class="{ 'flex justify-center w-full': section.products.length < 3 }">
      <div class="scroll-wrapper  w-full flex flex-col md:flex-row  md:items-center gap-xs" :class="{ 'flex justify-center w-full': section.products.length < 3 }">
        <div
           class="card w-card-product aspect-[308/431] md:aspect-[481/607] flex-shrink-0 max-w-[480px]"
          v-for="(product, index) in section.products"
        >
          <CardProduct :product="product"></CardProduct>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style></style>
