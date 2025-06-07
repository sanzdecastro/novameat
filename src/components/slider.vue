
  <script>

  
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import logo from './logo.vue'
    import circlee from './circlee.vue';
    import circleSmall from './circleSmall.vue';
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
        circleSmall
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
    
    

    <div class="slider-container slider-main relative w-[100vw] h-[100dvh]">
        <div class="mt-header md:mt-0 absolute w-full h-full top-0 left-0 flex flex-col-reverse justify-center items-center">
          <div class="z-10 mt-xxl md:mt-0 over-text md:absolute top-0 left-0 w-full h-full flex justify-center items-start md:items-center  gap-2">
              <div class="flex-col md:flex-row flex gap-2 items-center">
                  <logo class="h-[11px]" color="white" />
                  <p class="text-white leading-0 text-claim text-nowrap">{{ text }}</p>
              </div>
          </div>
          <div class="z-10 pointer-events-none md:absolute top-0 left-0 w-full h-full flex justify-center items-end md:items-center">
              <circlee class="hidden md:block w-1/3 md:w-8/12 aspect-square" color="white" />
              <circleSmall class="md:hidden" color="white"></circleSmall>
          </div>
        </div>
        <swiper
            class="w-full h-full"
            :slides-per-view="1"
            :space-between="0"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            >
                <swiper-slide v-for="(slide, index) in slides" :key="index" class="w-full h-full">
                  <div v-if="slide.video != false" class="video-wrapper w-full h-full relative  flex justify-center items-center overflow-hidden">
                      <video class="absolute object-cover w-full h-full" playsinline autoplay muted :src="slide?.video?.url"></video>
                    </div>
                    
                  <img v-else :src="slide.image.url" :alt="slide.image.alt" class="w-full h-full object-cover" />
                </swiper-slide>
        </swiper>
    </div>
    
  </template>