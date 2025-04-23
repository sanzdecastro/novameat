<script>
import { getProductCategories, getProduct, apiUrl } from "../lib/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import CardProduct from "./CardProduct.vue";
import Divider from "./Divider.vue";


// Import Swiper styles
export default {
  name: "BlockCategoryProduct",
  components: {
    Swiper,
    SwiperSlide,
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
   

  },
};
</script>

<template>
  <Divider></Divider>
  <div class="md:pl-md">
    <div class="text-center mb-xxl-2">
    <h2 class="text-title md:mb-lg">{{ this.productCategory.name }}</h2>
    <span class="mb-xxl block">( {{ this.productCategory.count }} )</span>
    <div class="w-full" v-if="(section.products.length > 3)" >
      <swiper  
      :slides-per-view="3.1" 
      :space-between="10" 
      :breakpoints="swiperOptions.breakpoints"
      class="!overflow-visible ">
        <swiper-slide
           class="card w-card-product aspect-[481/607] md:aspect-[481/607] flex-shrink-0 max-w-[480px]"
          v-for="(product, index) in section.products"
        >
          <CardProduct :product="product"></CardProduct>
        </swiper-slide>
      </swiper>
    </div>
    <div v-else class="flex flex-col md:flex-row justify-center w-full px-md">
      <div
           class="card w-full md:w-1/3 aspect-[481/607] md:aspect-[481/607] flex-shrink-0 max-w-[480px]"
          v-for="(product, index) in section.products"
        >
          <CardProduct :product="product"></CardProduct>
    </div>
    </div>
    
  </div>
  </div>
  
</template>
<style></style>
