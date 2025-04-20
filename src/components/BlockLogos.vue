<script>


// Import Swiper styles
export default {
  name: "BlockLogos",
  components: {
   
  },
  props: {
    section: {
      type: Array,
    },
  },
 
};
</script>

<template>
  <div class="px-md pb-xxl-2">
    <div class="block-logos grid grid-cols-4 overflow-hidden" >
      <div class="logo aspect-video flex justify-center items-center col-span-1 border-b border-stone border-r" v-for="(logo, index) in section.logos">
        <img :src="logo.logo.link" :alt="logo.logo.alt">
      </div>
    </div>
  </div>
</template>
