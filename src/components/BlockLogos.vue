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
  <div class="mx-md mb-xxl-2 overflow-hidden">
    <div class="block-logos grid-cols-1 md:grid grid-cols-4 overflow-hidden mr-[-1px] mb-[-1px]" >
      <div class="logo aspect-video flex justify-center items-center col-span-1 border-b border-stone-300 border-r" v-for="(logo, index) in section.logos">
        <a :href="logo.link" target="_blank">
          <img :src="logo.logo.link" :alt="logo.logo.alt">
        </a>
      </div>
    </div>
  </div>
</template>
