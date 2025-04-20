<script>


// Import Swiper styles
export default {
  name: "BlockTeam",
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
    <div class="block-dots grid grid-cols-8 gap-sm mb-xxl-2" v-for="(team, index) in section.team_department">
      <h3 class="text-p col-span-2" v-html="team.name_department"></h3>
      <div class="people col-span-6 grid grid-cols-3 gap-lg-2">
        <div class="person relative col-span-1 flex justify-between items-center hover:text-pink transition-all" v-for="(person, index) in team.person">
          <div>
            <span class="text-small text-stone font-haffe">{{ person.role }}</span>
            <p class="text-p-small">{{ person.name }}</p>
          </div>
          <img class="absolute right-0 h-0 transition-all duration-700" :src="person.image.link" :alt="person.image.alt">
        </div>
      </div>
    </div>
  </div>
 
</template>
