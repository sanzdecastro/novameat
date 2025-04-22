<script>


// Import Swiper styles
export default {
  name: "ButtonSection",
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
  <div class="button-wrapper p-sm w-full h-[25vh] md:h-[60vh] mb-xxl-2">
    <a class="w-full h-full flex justify-center items-center border border-black rounded-full hover:border-none hover:bg-pink hover:text-white" :href="section.link.url">{{ section.link.title }}</a>
  </div>

 
 
</template>
