<script>


// Import Swiper styles
export default {
  name: "BlockText",
  components: {
   
  },
  props: {
    section: {
      type: Object,
    },
  },
 
};
</script>

<template>
  <div :id="section.id_anchor" class="py-section" :class="{ 'mt-header': section.add_margin_top === true }">
    <h2 class="text-center text-p-small mb-title">( {{ section.title }} )</h2>
    <p class="px-sm  md:max-w-max mx-auto text-center text-p mb-section leading-[120%]" :class="{ 'text-title': section.title_bigger === true }" v-html="section.subtitle"></p>
    <p class="px-xxl-2 md:px-[0px] md:max-w-max-sm md:ml-[50%] text-p-small leading-[110%]"> {{ section.text }}</p>
  </div>
</template>
