<script>
import { getProduct, apiUrl } from "../lib/api";
import circleSmall from "./circleSmall.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/scrollbar';
// Import Swiper styles
export default {
  name: "CardProductSlider",
  components: {
    circleSmall,
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
    },
    lang: {
      type: String,
    },
  },
  mounted() {
    this.fetchProduct();
    
    this.$nextTick(() => {
      cardEffect();
   
    });
    
  },
  data() {
    return {
      product: this.product,
      productInfo: {},
    };
  },
  setup() {
    return {
      modules: [Scrollbar],
    }
  },
  methods: {
    
    async fetchProduct() {
      console.log(apiUrl);
      try {
        console.log("Fetched product:", this.product);
        const product = await getProduct(this.product.post_name, this.lang);
        this.productInfo = product;
        console.log("Fetched product info:", this.lang, this.productInfo);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },
  },
};
</script>

<template>
  <a  :href="`/${lang}/${lang === 'es' ? 'productos' : 'products'}/${productInfo.slug}`">
    <swiper  
    class="!w-full !h-full cursor-grab"
    :class="{
    'coming-soon pointer-events-none':
      productInfo._embedded?.['wp:term']?.[1]?.[0]?.name === 'Coming soon'
  }"
        :modules="modules"
        :scrollbar="{
          hide: false,
        }"
        :slides-per-view="1" 
        :space-between="0" >
          <swiper-slide class="flex flex-col justify-between items-center md:aspect-[300/431]">
            <div class="relative p-card text-center text-white bg-black flex justify-start flex-col w-full h-full items-center rounded-[15px] overflow-hidden">
              <!-- tag -->
              <div
                v-if="productInfo._embedded?.['wp:term']?.[1]?.[0]"
                class="tag absolute top-sm right-sm md:py-[calc((6/1515)*100vw)] px-[14px] py-[3px] md:px-[calc((16/1515)*100vw)] rounded-full text-white bg-ash font-haffe text-small"
                :class="{ 'bg-pink !text-black': productInfo._embedded['wp:term']?.[1]?.[0]?.name == 'New' }"
              >
                {{ productInfo._embedded['wp:term'][1][0]?.name }}
              </div>
              <!-- media -->
              <div
                  v-if="productInfo._embedded?.['wp:featuredmedia']"
                  class="aspect-square w-full mb-lg-2 flex justify-center items-center"
                >
                  <img
                  class="max-w-[210px]"
                    :src="productInfo._embedded['wp:featuredmedia'][0].source_url"
                    alt="Imagen destacada"
                  />
                </div>
                <!-- placeholder -->
                <div v-else class="circle-symbol flex justify-center items-center h-full">
                  <div class="aligner"></div>
                  <circleSmall class="w-[calc((122/320)*100vw)] md:w-[calc((150/1515)*100vw)] aspect-square" color="white" />
                </div>
                <!-- title -->
                <h2 class="text-title-sm pb-lg" v-html="productInfo?.acf?.title_for_preview"></h2>
                <p class="text-p-small pb-md" v-html="productInfo.excerpt?.rendered"></p>
            </div>
          </swiper-slide>
          <swiper-slide class="relative flex flex-col justify-between items-center text-black rounded-[15px] overflow-hidden aspect-[300/431]">
            <div class=" relative flex flex-col justify-between items-center text-black h-full p-xxl">
              <div
                  v-if="productInfo._embedded?.['wp:term']?.[1]?.[0]"
                  class="tag z-10 absolute top-sm right-sm md:py-[calc((6/1515)*100vw)] px-[14px] py-[3px] md:px-[calc((16/1515)*100vw)] rounded-full text-white bg-ash font-haffe text-small"
                  :class="{ 'bg-pink !text-black': productInfo._embedded['wp:term']?.[1]?.[0]?.name == 'New' }"
                >
                  {{ productInfo._embedded['wp:term'][1][0]?.name }}
                </div>
              <img class="absolute top-0 h-full object-cover" :src="productInfo?.acf?.main_image?.link" :alt="productInfo?.acf?.main_image?.alt">
              <div class="text-white underline z-10 border border-white rounded-full flex items-center justify-center w-full aspect-square font-haffe">Learn more</div>
              </div>
          </swiper-slide>
         
        </swiper>
  </a>
</template>
