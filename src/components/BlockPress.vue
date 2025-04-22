<script>


// Import Swiper styles
export default {
  name: "BlockPress",
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
  <div :id="section.id_anchor" class="py-section px-md">
    <div class="block-dots grid grid-cols-8 gap-sm mb-xxl-2">
      <h3 class="text-p col-span-2" v-html="section.press_title"></h3>
      <div class="people col-span-6 grid grid-cols-3 gap-lg-2">
        <div class="person relative col-span-1 flex justify-between items-center hover:text-pink transition-all" v-for="(media, index) in section.medias">
          <a target="_blank" :href="media.link">
            <span class="text-small text-stone">{{ media.media }}</span>
            <p class="text-p-small max-w-max-xs">{{ media.headline }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
