<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

// Import Swiper styles
export default {
  name: "PointsSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    section: {
      type: Array,
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
    };
  },
};
</script>

<template>
  <div class="slider-container points-slider relative w-[100vw] h-[100vh] text-black">

    <swiper
      class="w-full h-full relative"
      :slides-per-view="1"
      :space-between="0"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(slide, index) in section.slide"
        :key="index"
        class="w-full h-full"
      >
        <div v-if="slide.video != false" class="video-wrapper w-full h-full relative  flex justify-center items-center overflow-hidden">
          <video class="absolute object-cover w-full h-full" playsinline autoplay muted :src="slide?.video?.url"></video>
        </div>
        <img v-else
          :src="slide.image.url"
          alt="Slide image"
          class="w-full h-full object-cover"
        />
        <div class="w-[100vw] h-[100dvh] z-10 absolute top-0 left-0 text-white pointer-events-none">
          <h2 class="px-xxl-2 text-center text-wrap text-title font-sm w-full h-full flex justify-center items-center" v-html="slide.title"></h2>
          <p class="absolute top-[20vh] left-[20vw] font-haffe text-small flex items-center gap-2"><span class="bg-white block rounded-full w-[6px] h-[6px]"></span>{{ slide.phrase_1 }}</p>
          <p class="absolute top-[90vh] left-[45vw] font-haffe text-small flex items-center gap-2"><span class="bg-white block rounded-full w-[6px] h-[6px]"></span>{{ slide.phrase_2 }}</p>
          <p class="absolute top-[30vh] left-[80vw] font-haffe text-small flex items-center gap-2"><span class="bg-white block rounded-full w-[6px] h-[6px]"></span>{{ slide.phrase_3 }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
