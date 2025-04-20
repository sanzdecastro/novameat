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
  <div class="cardCont">
    <div class="cardBack flex flex-col justify-between items-center text-black p-sm">
      <p>{{ ingredient.post_excerpt }}</p>
      <h3>{{ ingredient.post_title }}</h3>
    </div>
    <div class="cardFront flex flex-col justify-between items-center p-sm">
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
      <h3>{{ ingredient.post_title }}</h3>
    </div>
  </div>
</template>
