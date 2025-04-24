<script>


// Import Swiper styles
export default {
  name: "ButtonSection",
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
  <div class="button-wrapper style-2">
    <button :href="section.link.url">{{ section.link.title }}</button>
  </div>

 
 
</template>
