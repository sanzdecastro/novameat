
  <script>

  
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import logo from './logo.vue'
    import circlee from './circlee.vue';
    import novameatLogo from '../assets/logo.svg';
import Circlee from './circlee.vue';

    // Import Swiper styles
    export default {
        name: "slider",
      components: {
        Swiper,
        SwiperSlide,
        logo,
        circlee,
      },
      props: {
        slides: {
          type: Array,
        },
        text : {
          type: String,
        },
      },
      setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
          novameatLogo,
        };
      },
    };
  </script>

<template>
    
    

    <div class="slider-container  relative w-[100vw] h-[100dvh]">
        <div class="z-10  over-text absolute top-0 left-0 w-full h-full flex justify-center items-center  gap-2">
            <div class="flex gap-2 items-center">
                <logo class="h-[calc((10/360)*100vw)] md:h-[calc((15/1515)*100vw)] md:max-h-[16px]" color="white" />
                <p class="text-white text-p text-nowrap">{{ text }}</p>
            </div>
        </div>
        <div class="z-10 pointer-events-none absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <circlee class="w-1/3 md:w-8/12 aspect-square" color="white" />
        </div>
        <swiper
            class="w-full h-full"
            :slides-per-view="1"
            :space-between="0"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            >
                <swiper-slide v-for="(slide, index) in slides" :key="index" class="w-full h-full">
                    <img :src="slide.image" alt="Slide image" class="w-full h-full object-cover" />
 
                </swiper-slide>
        </swiper>
    </div>
    
  </template>