<script>


// Import Swiper styles
export default {
  name: "BlockCentralMessage",
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
  <div class="section-central-message py-section h-[70vh] flex justify-center items-center text-center">
    <h1 class="text-title leading-[120%]" v-html="section.message"></h1>
  </div>
 
</template>
