<script>


// Import Swiper styles
export default {
  name: "BlockImage",
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
  <div class="py-section p-sm">
    <div v-if="section.images_type === 'Two images'" class="grid grid-cols-6 items-end gap-2.5">
      <div class="flex flex-col col-span-2 col-start-3">
        <img :src="section.two_images.image_1.url">
        <p class="text-p-small leading-[120%] mt-sm">{{ section.two_images.caption_1 }}</p>
      </div>
      <div class="flex flex-col">
        <img :src="section.two_images.image_2.url">
        <p class="text-p-small leading-[120%] mt-sm">{{ section.two_images.caption_2 }}</p>
      </div>
     
    
    </div>
    <div v-if="section.images_type === 'One image small'" class="grid grid-cols-6 items-end gap-2.5">
      <div class="flex flex-col col-span-1 col-start-1">
        <img :src="section.one_image_small.image_1.image.url" :alt="section.one_image_small.image_1.image.alt">
        <p class="text-p-small leading-[120%] mt-sm">{{ section.one_image_small.image_1.caption }}</p>
      </div>
    </div>
    <div v-if="section.images_type === 'One image big'" class="grid grid-cols-6 items-end gap-2.5">
      <div class="col-span-2 col-start-3 flex items-start justify-start h-full">
        <p class="text-p leading-[120%] mt-sm pr-md">{{ section.one_image_big.text }}</p>
      </div>
      <div class="flex flex-col col-span-2 col-start-5">
        <img :src="section.one_image_big.image_1.image.url" :alt="section.one_image_big.image_1.image.alt">
        <p class="text-p-small leading-[120%] mt-sm">{{ section.one_image_big.image_1.caption }}</p>
      </div>
    </div>
    
  </div>
 
</template>
