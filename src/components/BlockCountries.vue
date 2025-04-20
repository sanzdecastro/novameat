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
    
    <div class="block-dots grid grid-cols-8 gap-sm mb-xxl-2" v-for="(country, index) in section.countries">
      <Divider class="col-span-8"></Divider>
      <h3 class="text-p col-span-2 mx-md" v-html="country.country_name"></h3>
      <div class="people col-span-6 grid grid-cols-3 gap-lg-2 px-md">
        <div class="person relative col-span-1 flex justify-between items-center hover:text-pink transition-all" v-for="(address, index) in country.address">
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
