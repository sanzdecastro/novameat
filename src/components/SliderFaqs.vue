<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import {Mousewheel } from 'swiper/modules';
import "swiper/css";

// Import Swiper styles
export default {
  name: "SliderFaqs",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    cardsFaq: {
      type: Object,
    },
  },
  setup() {
    const onSwiper = (swiper) => {
      //console.log(swiper);
    };
    const onSlideChange = () => {
      //console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Mousewheel],
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <div class=" w-full">
    <swiper :slides-per-view="1.1" 
     :modules="modules"
     :mousewheel="{
        sensitivity: 50,
      }"
    :space-between="10" 
    :slides-offset-before="20"  
    :slides-offset-after="20"  
    :breakpoints="{ 600:{ slidesPerView:2.2 }, 900:{ slidesPerView:3.1, } }"
    class="cursor-grab"
    >
      <swiper-slide class="aspect-[481/582]">
        <div
          class="card   aspect-[481/582] p-lg-2 bg-stone flex flex-col justify-between rounded-[15px]"
        >
          <div>
            <span class="block pb-lg text-p-small">(FAQs)</span>
            <h3 class="block pb-lg text-title">{{ cardsFaq?.title }}</h3>
          </div>
          <p class="">{{ cardsFaq?.more_info }}</p>
        </div>
      </swiper-slide>
      <swiper-slide
        v-for="(card, index) in cardsFaq?.cards"
        class="aspect-[481/582]"
      >
        <div
          class="card   aspect-[481/582] p-lg-2 bg-ash flex flex-col justify-between rounded-[15px]"
        >
          <div>
            <h3 class="block pb-lg text-title">{{ card?.question }}</h3>
          </div>
          <p class="">{{ card?.answer }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
