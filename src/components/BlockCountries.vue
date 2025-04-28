<script>
import Divider from "./Divider.vue";

// Import Swiper styles
export default {
  name: "BlockCountries",
  components: {
   Divider
  },
  props: {
    section: {
      type: Array,
    },
  },
 
};
</script>

<template>
  
  <div class="py-section ">
    
    <div class="block-dots grid grid-cols-1 md:grid-cols-8 gap-sm mb-xxl-2" v-for="(country, index) in section.countries">
      <Divider class="col-span-1 md:col-span-8 hidden md:block"></Divider>
      <h3 class="text-p col-span-2 mx-md pb-lg-2" v-html="country.country_name"></h3>
      <div class="col-span-6 grid grid-cols-6 md:grid-cols-3 gap-lg-2 px-md">
        <div class="relative col-start-2 col-span-5 md:col-span-1 md:grid-cols-1 flex justify-between items-center hover:text-pink transition-all" v-for="(address, index) in country.address">
          <div>
            <p class="text-p-small">{{ address.shop }}</p>
            <p class="text-p-small">{{ address.street }}</p>
            <p class="text-p-small">{{ address.city }}</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
 
</template>
