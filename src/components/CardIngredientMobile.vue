<script>
import { getIngredient, apiUrl } from "../lib/api";
import { gsap } from "gsap";
// Import Swiper styles
export default {
  name: "CardIngredient",
  props: {
    ingredient: {
      type: Object,
    },
  },
  mounted() {
    this.fetchIngredient();
  },
  data() {
    return {
      ingredient: this.ingredient,
      ingredientInfo: {},
      openIngredient: false,
    };
  },
  methods: {
    async fetchIngredient() {
      //console.log(apiUrl);
      try {
        //console.log("Fetched ingredient:", this.ingredient);
        const ingredient = await getIngredient(this.ingredient.post_name, "en");
        this.ingredientInfo = ingredient;
        //console.log("Fetched ingredient info:", this.ingredientInfo);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },

    toggleIngredient() {
      const content = this.$refs.content;
      const ingredient = this.$refs.ingredient;
      if (!this.openIngredient) {
        gsap.to(content, { height: "auto", duration: 0.5, ease: "power2.out" });
        ingredient.classList.add("text-pink");
        this.openIngredient = true;
      } else {
        gsap.to(content, { height: 0, duration: 0.5, ease: "power2.out" });
        ingredient.classList.remove("text-pink");
        this.openIngredient = false;
      }
    },
  },
};
</script>

<template>

  <!-- Solo mobile -->
  <div class=" ingredient bg-ash py-sm  md:hidden border-b  border-stone" @click="toggleIngredient">
    <div ref="ingredient" class="flex gap-md">
      <div class="aspect-square w-[78px]">
        <div
          v-if="ingredientInfo._embedded?.['wp:featuredmedia']"
          class="aspect-square rounded-full overflow-hidden "
        >
          <img
            class=""
              :src="ingredientInfo?._embedded['wp:featuredmedia']?.[0]?.source_url"
              alt="ingredient"
            />
        </div>
      </div>
      <div class="w-full text-left">
        <div class="flex justify-between"><h3 class="mb-md">{{ ingredient.post_title }}</h3><span v-if="openIngredient === false">+</span><span v-else>-</span></div>
        
        <p ref="content" class="ingredient-content h-0 overflow-hidden transition">{{ ingredient.post_excerpt }}</p>
      </div>
    </div>
  </div>
</template>
