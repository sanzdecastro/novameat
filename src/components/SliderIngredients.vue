<script>

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import CardIngredient from "./CardIngredient.vue";

// Import Swiper styles
export default {
  name: "SliderIngredients",
  components: {
    Swiper,
    SwiperSlide,
    CardIngredient,
  },
  props: {
    ingredients: {
      type: Array,
    },
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>

<template>
 
 <div class="pr-md">
    <swiper class="!overflow-visible "
     
      :slides-per-view="6.3"
      :space-between="10"

    >
      <swiper-slide class="!overflow-visible w-full aspect-[235/300] "
        v-for="(ingredient, index) in ingredients?.ingredients"
      >
        <CardIngredient :ingredient="ingredient"></CardIngredient>
      </swiper-slide>
    </swiper>
  </div>
  
   
  
</template>

