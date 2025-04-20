<script>


// Import Swiper styles
export default {
  name: "Divider",
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
  <div class="divider w-full flex justify-center items-center p-md">
      <span class="h-[6px] w-[6px] rounded-full bg-stone"></span>
      <div class="w-full bg-stone h-[1px]"></div>
      <span class="h-[6px] w-[6px] rounded-full bg-stone"></span>
  </div>
 
</template>
