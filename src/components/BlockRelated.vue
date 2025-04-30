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
  <div class="relateds py-xxl flex flex-col md:flex-row justify-center items-center px-md">
    <div class="w-full md:w-1/3 text-center flex flex-col justify-between md:aspect-[396/472] pb-xxl-2 md:pb-0" v-for="(related, index) in section">
      <div class="flex flex-col gap-lg ">
          <p class="text-p-small">({{related.pretitle}})</p>
          <p class="text-title pb-xxl" v-html="related?.title"></p>
      </div>
      <div>
          <div class="image-wrapper pb-xxl md:pb-lg-2 w-full md:w-[calc((224/1515)*100vw)] mx-auto flex justify-center items-center aspect-[224-279]">
              <img class="flex w-1/2 md:w-full object-cover mx-auto" :src="related?.image?.url" alt={item?.image?.alt}>
          </div>
          <p class="text-p-small md:max-w-max-sm mx-auto">{{related.excerpt}}</p>
      </div>
    </div>
  </div>
</template>
