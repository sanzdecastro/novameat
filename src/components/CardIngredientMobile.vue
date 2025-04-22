<script>
import { getIngredient, apiUrl } from "../lib/api";

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
    };
  },
  methods: {
    async fetchIngredient() {
      console.log(apiUrl);
      try {
        console.log("Fetched ingredient:", this.ingredient);
        const ingredient = await getIngredient(this.ingredient.post_name, "en");
        this.ingredientInfo = ingredient;
        console.log("Fetched ingredient info:", this.ingredientInfo);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },
  },
};
</script>

<template>

  <!-- Solo mobile -->
  <div class="bg-ash py-sm  md:hidden border-b border-stone">
    <div class="flex gap-md">
      <div class="aspect-square w-[78px]">
        <div
          v-if="ingredientInfo._embedded?.['wp:featuredmedia']"
          class="aspect-square rounded-full overflow-hidden "
        >
          <img
            class=""
              :src="ingredientInfo?._embedded['wp:featuredmedia']?.[0]?.source_url"
              alt="Imagen destacada"
            />
        </div>
      </div>
      <div class="w-full text-left">
        <div class="flex justify-between"><h3 class="mb-md">{{ ingredient.post_title }}</h3><span>+</span></div>
        
        <p class="h-0 overflow-hidden">{{ ingredient.post_excerpt }}</p>
      </div>
    </div>
  </div>
</template>
