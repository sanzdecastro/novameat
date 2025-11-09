<script>
import Divider from "./Divider.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {Mousewheel } from 'swiper/modules';
import "swiper/css";

// Import Swiper styles
export default {
  name: "BlockPress",
  components: {
    Divider,
    Swiper,
    SwiperSlide,
  },
  props: {
    section: {
      type: Object,
    },
  },
  setup() {
     return {
      modules: [Mousewheel],
    };
  }
};
</script>

<template>
  <Divider></Divider>
  <div :id="section.id_anchor" class="py-section text-center">
    <h3 class="text-p-small col-span-2 pb-xxl-2" v-html="'(' + section.press_title + ')'"></h3>
    <div class="w-full">
      <swiper
        :modules="modules"
        :mousewheel="{
            sensitivity: 50,
          }"
        :slides-per-view="1.1"
        :space-between="10"
        :slides-offset-before="20"
        :slides-offset-after="20"
        :breakpoints="{
          600: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.1 },
        }"
      >
        <swiper-slide
          v-for="(media, index) in section.medias"
          class="aspect-[481/582]"
        >
          <a target="_blank" :href="media.link">
            <div>
              <div
                class="card p-xxl text-center aspect-[481/582]  bg-beige flex flex-col justify-center items-center rounded-[15px]"
              >
                <div class="text-center">
                  <h3 class="block pb-xxl text-p">{{ media.headline }}</h3>
                
                  <img class="mx-auto":src="media.image?.link" />
                </div>
              </div>
            </div>
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
