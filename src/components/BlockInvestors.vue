<script>
import Divider from './Divider.vue';

// Import Swiper styles
export default {
  name: "BlockInvestors",
  components: {
   Divider,
  },
  props: {
    section: {
      type: Object,
    },
  },
 
};
</script>

<template>
  <Divider></Divider>
  <div :id="section.id_anchor" class="py-section px-md">
    <div class="block-dots grid grid-cols-6 md:grid-cols-8 gap-sm mb-xxl-2">
      <h3 class="text-p mb-lg col-span-6 md:col-span-2" v-html="section.investors_name"></h3>
      <div class="people col-span-4 col-start-2 md:col-span-6 flex flex-col">
        <div class="hover:text-pink transition-all" v-for="(investor, index) in section.investors">
            <p class="text-p md:max-w-max-xs">{{ investor.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
