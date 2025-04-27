<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/effect-fade';

// Import Swiper styles
export default {
  name: "PlaySlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    section: {
      type: Object,
    },
  },
  data() {
    return {
      
    }
  },
  setup(props) {
    return {
        pagination: {
          clickable: true,
          renderBullet: function (index, className ) {
            const slide = props.section.slider[index];
            const itemMenu = slide ? slide.item_menu : '';
            const paragraphMenu = slide ? slide.paragraph_item : '';
            return `<span class=" ${className}">( ${index + 1} ) ${itemMenu} ${paragraphMenu}</span>`;
          },
        },
        modules: [Autoplay, EffectFade, Pagination],
      };
  },
};
</script>

<template>
  <div :id="section.id_anchor" class="play-slider slider-container relative w-[100vw] h-[100dvh] text-black mb-20" :class="{ 'with_items_paragraphs': section.with_items_paragraphs === true }">

    <swiper
      class="w-full h-full relative"
      :slides-per-view="1"
      :effect="'fade'"
      :pagination="pagination"
      :modules="modules"
      :space-between="0"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide
        v-for="(slide, index) in section.slider"
        :key="index"
        class="w-full h-full"
      >
        
        
        <img
          :src="slide.image.url"
          alt="Slide image"
          class="w-full h-full object-cover"
        />
        <div class="w-[100vw] h-[100vh] z-10 absolute top-0 left-0 text-white">
          
          <div class="  w-full h-full flex justify-center items-center p-sm">
            <div class="flex-col text-center">
              <span class="">( {{ slide.pretitle }} )</span>
              <h3 class="font-sm text-title" v-html="slide.title"></h3>
              <p>{{ slide.item_menu }}</p>
              <p class="absolute text-center md:text-left p-lg-2 md:p-sm bottom-xxl-2 md:bottom-sm left-sm  md:max-w-max-xs  text-small leading-[114%]">{{ slide.text }}</p>
            </div>
            
          </div>
        
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

