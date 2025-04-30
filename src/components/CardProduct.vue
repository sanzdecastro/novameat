<script>
import { getProduct, apiUrl } from "../lib/api";
import circleSmall from "./circleSmall.vue";
import { cardEffect } from "../scripts/cardEffect";

// Import Swiper styles
export default {
  name: "CardProduct",
  components: {
    circleSmall,
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
  <a  :href="`/${lang}/products/${productInfo.slug}`">
    <div class="cardCont !w-full"  :class="{
    'pointer-events-none':
      productInfo._embedded?.['wp:term']?.[1]?.[0]?.name === 'Coming soon'
  }">
      <div
        class="cardBack relative flex flex-col justify-between items-center text-black p-xxl"
      >
        <img class="absolute top-0 h-full object-cover" :src="productInfo?.acf?.main_image?.link" :alt="productInfo?.acf?.main_image?.alt">
        <div class="text-white underline z-10 border border-white rounded-full flex items-center justify-center w-full aspect-square font-haffe">Learn more</div>
      </div>
      <div class="cardFront flex flex-col justify-between items-center " >
        <div
          class="relative p-card text-center text-white bg-black flex justify-between flex-col w-full h-full items-center rounded-[15px] overflow-hidden"
        >
        <div
            v-if="productInfo._embedded?.['wp:term']?.[1]?.[0]"
            class="tag absolute top-sm right-sm py-[calc((6/1515)*100vw)] px-[calc((16/1515)*100vw)] rounded-full text-white bg-ash font-haffe text-small"
            :class="{ 'bg-pink !text-black': productInfo._embedded['wp:term']?.[1]?.[0]?.name == 'New' }"
          >
            {{ productInfo._embedded['wp:term'][1][0]?.name }}
          </div>
          <div
            v-if="productInfo._embedded?.['wp:featuredmedia']"
            class="aspect-square w-full mb-lg-2 flex justify-center items-center"
          >
            <img
              :src="productInfo._embedded['wp:featuredmedia'][0].source_url"
              alt="Imagen destacada"
            />
          </div>
          <div v-else class="circle-symbol flex justify-center items-center h-full">
            <div class="aligner"></div>
            <circleSmall class="w-[calc((122/320)*100vw)] md:w-[calc((150/1515)*100vw)] aspect-square" color="white" />
          </div>

          <h2 class="text-title-sm pb-lg">{{ productInfo.title?.rendered }}</h2>
          <p class="text-p-small" v-html="productInfo.excerpt?.rendered"></p>
        </div>
      </div>
    </div>
  </a>
</template>
