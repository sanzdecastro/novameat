<script>
import { ref } from 'vue'
import Divider from "./Divider.vue";
import BlockMap from "./BlockMap.vue";
import BlockText from "./BlockText.vue";

// Import Swiper styles
export default {
  name: "BlockCountries",
  components: {
   Divider,
   BlockMap,
   BlockText
  },
  props: {
    section: {
      type: Array,
    },
  },
  setup(props) {
    const mapRef = ref(null)
       const mapElRef = ref(null); 

    function handleAddressClick(address) {
      
      const lat = parseFloat((address.lat || "").replace(",", ".").trim())
      const lng = parseFloat((address.lng || "").replace(",", ".").trim())
      
      if (isNaN(lat) || isNaN(lng) || !mapRef.value) return
      mapRef.value.zoomTo([lng, lat], 17)

      mapElRef.value?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return { mapRef, mapElRef, handleAddressClick }
  }
};
</script>

<template>
  
  <div >
    <div ref="mapElRef">
    <BlockMap v-if="section.visible === true" ref="mapRef" :countries="section.countries" class="border border-b border-black"></BlockMap>
    </div>
    <BlockText :section="section"></BlockText>
    <div class="block-dots grid grid-cols-1 md:grid-cols-8 gap-sm mb-xxl-2" 
    v-for="(country, index) in section.countries">
      <Divider class="col-span-1 md:col-span-8 hidden md:block"></Divider>
      <h3 class="text-p col-span-2 mx-md pb-lg-2" v-html="country.country_name"></h3>
      <div class="col-span-6 grid grid-cols-6 md:grid-cols-3 gap-lg-2 px-md">
        <div class="cursor-pointer relative col-start-2 col-span-5 md:col-span-1 md:grid-cols-1 flex justify-between items-center hover:text-pink transition-all" 
        v-for="(address, index) in country.address"
        @click="handleAddressClick(address)">
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
