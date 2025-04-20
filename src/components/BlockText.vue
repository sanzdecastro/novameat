<script>


// Import Swiper styles
export default {
  name: "BlockText",
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
  <div class="py-section">
    <h2 class="text-center text-p-small mb-title">( {{ section.title }} )</h2>
    <p class="max-w-max mx-auto text-center text-p mb-section leading-[120%]" :class="{ 'text-title': section.title_bigger === true }" v-html="section.subtitle"></p>
    <p class="max-w-max-sm ml-[50%] text-p-small leading-[110%]"> {{ section.text }}</p>
  </div>
 
</template>
