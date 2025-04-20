<script>


// Import Swiper styles
export default {
  name: "BlockInvestors",
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
  <div class="py-section px-md">
    <div class="block-dots grid grid-cols-8 gap-sm mb-xxl-2">
      <h3 class="text-p col-span-2" v-html="section.investors_name"></h3>
      <div class="people col-span-6 flex flex-col">
        <div class="hover:text-pink transition-all" v-for="(investor, index) in section.investors">
            <p class="text-p max-w-max-xs">{{ investor.name }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>
