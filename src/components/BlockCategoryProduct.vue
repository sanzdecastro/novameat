<script>
import { getProductCategories, getProduct, apiUrl } from "../lib/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/vue";
import {Mousewheel } from 'swiper/modules';

import "swiper/css";
import CardProduct from "./CardProduct.vue";
import CardProductSlider from "./CardProductSlider.vue";
import Divider from "./Divider.vue";


// Import Swiper styles
export default {
  name: "BlockCategoryProduct",
  components: {
    Swiper,
    SwiperSlide,
    CardProduct,
    CardProductSlider,
    Divider
  },
  props: {
    section: {
      type: Object,
    },
    lang: {
      type: String,
    },
  },
  setup() {
    return {
        modules: [Mousewheel],
      };
  },
  data() {
    return {
      category: this.section.category,
      productCategory: {},
      isWide: false,
      isWider: false
    };
  },
  methods: {
    async fetchProductCategory() {
      //console.log(apiUrl);
      try {
        const products = await getProductCategories(
          apiUrl,
          this.category,
          this.lang
        );
        this.productCategory = products;
        //console.log("Fetched products:", products);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },
    onResize() {
      this.isWide = window.innerWidth >= 600 && window.innerWidth < 2000;
      this.isWider = window.innerWidth >= 2000;
    }
  },
  mounted() {
    //console.log(this.lang);
    this.fetchProductCategory();
    this.onResize();
    window.addEventListener("resize", this.onResize);

  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<template>
  <Divider></Divider>
  <div >
    <div class="text-center mb-xxl-2" >
      <h2 class="text-title mb-xs md:mb-lg">{{ this.productCategory.name }}</h2>
      <span class="mb-xxl block">( {{ this.productCategory.count }} )</span>
      <div class="w-full" v-if="isWide && section.products.length > 3" >
        <swiper  
   :modules="modules"
        :mousewheel="true"
        :slides-per-view="1.2" 
        :space-between="10" 
        :slides-offset-before="16"  
        :slides-offset-after="16"  
        :breakpoints="{ 600:{slidesPerView:2.2 }, 900:{ slidesPerView:3.1, } }"

        class="!overflow-visible cursor-grab touch-pan-x">
          <swiper-slide
            class="card w-card-product aspect-[481/607] min-height-[460px] md:aspect-[481/607] flex-shrink-0 max-w-[480px]"
            v-for="(product, index) in section.products"
          >
            <CardProduct :product="product" :lang="lang"></CardProduct>
          </swiper-slide>
        </swiper>
      </div>
       <div
        v-else-if="isWider && section.products.length > 3"
        class="max-w-[1800px] mx-auto grid grid-cols-3 gap-sm gap-y-sm md:flex-row justify-center w-full px-sm md:p-md"
      >
        <div
          v-for="(product, index) in section.products"
          :key="product.id || index"
          class="card w-full md:col-span-1  aspect-[481/607] flex-shrink-0"
        >
          
          <CardProduct      :product="product" :lang="lang" />
        </div>
      </div>
      <div v-else class="flex flex-col gap-sm md:flex-row justify-center w-full px-sm md:p-md">
        <div
            class="card w-full md:w-1/3 bg-black md:bg-transparent min-h-[550px] md:aspect-[481/607] flex-shrink-0 max-w-[480px] rounded-[15px]"
            v-for="(product, index) in section.products"
          >
            <CardProductSlider v-if="!isWide" :product="product" :lang="lang"></CardProductSlider>
            <CardProduct v-else :product="product" :lang="lang" ></CardProduct>
            
      </div>
    </div>
    
  </div>
  </div>
  
</template>
<style></style>
