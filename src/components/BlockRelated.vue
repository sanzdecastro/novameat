<script>


// Import Swiper styles
export default {
  name: "BlockRelated",
  components: {
   
  },
  props: {
    section: {
      type: Array,
    },
  },
  mounted() {
    console.log('related', this.section);
  },
 
};
</script>

<template>
  <div :id="section?.id_anchor" class="relateds pt-xxl mb-xxl-2 flex flex-col md:flex-row justify-center items-center px-md ">
    
    <div v-for="(related, index) in section?.related" class="w-full md:w-1/3 text-center flex flex-col justify-between md:aspect-[396/350] pb-[120px] md:pb-0" >
      <div class="flex flex-col gap-lg ">
          <p class="text-p-small">({{related.pretitle}})</p>
          <p class="text-title pb-md" v-html="related?.title"></p>
      </div>
      <div>
        <a :href="related?.url">
          <div class="image-wrapper pb-xxl md:pb-lg-2 w-full md:w-[calc((224/1515)*100vw)] mx-auto flex justify-center items-center aspect-[224-279]">
              <img class="flex w-2/3 md:w-full object-cover mx-auto" :src="related?.image?.url" alt={item?.image?.alt}>
          </div>
          <p class="text-big md:text-p md:max-w-max-sm mx-auto">{{related.excerpt}}</p>
        </a>
        </div>
    </div>
  </div>
</template>
