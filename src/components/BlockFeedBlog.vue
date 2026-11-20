<script>
import Divider from './Divider.vue';

// Posts y categorías llegan ya resueltos desde el servidor (getFeedBlogData en
// src/lib/api.js): el navegador no hace ninguna petición a WordPress.
// Solo vista de lista: el selector Grid/List se quitó a petición del cliente
// (los estilos .grid-view siguen en global.css por si se recupera).
export default {
  name: "BlockFeedBlog",
  components: { Divider },
  props: {
    section: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      default: 'en'
    },
    posts: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    blogPosts() {
      return this.posts;
    },
    blogCategories() {
      return this.categories;
    }
  },
  methods: {
    selectCategory(slug) {
      const categoryButtons = document.querySelectorAll(
        ".header-feed .categories .category-wrapper"
      );
      const posts = document.querySelectorAll(".feed .post");

      categoryButtons.forEach(button => {
        if (button.classList.contains(slug || 'all')) {
          button.classList.add("selected");
        } else {
          button.classList.remove("selected");
        }
      });

      posts.forEach(post => {
        // recogemos todos los slugs de categorías de este post
        const postCats = Array.from(
          post.querySelectorAll(".image-wrapper .categories .category")
        ).map(el => [...el.classList].find(c => c !== "category"));

        // si elegimos "all" o dicho post contiene el slug, lo mostramos
        if (slug === "all" || postCats.includes(slug)) {
          post.classList.remove("hidden");
          post.classList.add("visible");
        } else {
          post.classList.remove("visible");
          post.classList.add("hidden");
        }
      });
    }
  }
};
</script>

<template>
  <div class="blog-feed">
    <div class="header-feed">
      <h1 v-html="section.title"></h1>
      <div class="categories">
        <div class="category">
          <div class="category-wrapper all selected" @click="selectCategory('all')">( <div class="dot"></div> ) All</div>
        </div>
        
        <div
          class="category"
          v-for="(category, index) in blogCategories"
          :key="index"
        >
          <div class="category-wrapper" 
          :class="category.slug"
          @click="selectCategory(category.slug)">
            ( <div class="dot"></div> ) {{ category.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="feed list-view">
      <div class="post" v-for="(post, index) in blogPosts" :key="post.slug">
        <a :href="`/${lang}/journal/${post.slug}?log=${String(blogPosts.length - index).padStart(2,'0')}`">
          <div class="post-header">
          <div class="log">( Log. {{ String(blogPosts.length - index).padStart(2, '0') }} )</div>
            <div class="image-wrapper">
                <img :src="post.image" :alt="post.title" loading="lazy">
                <div class="categories">
                  <div class="category" v-for="category in post.categories" :key="category.slug" :class="category.slug">
                    {{ category.name }}
                  </div>
                </div>
            </div>
          </div>

          <div class="post-footer">
            <div>
                <h2 v-html="post.title"></h2>
                <div class="excerpt" v-html="post.excerpt"></div>
                <span>{{post.words}}</span>
            </div>
            <div class="categories">
                <div class="category" v-for="category in post.categories" :key="category.slug" :class="category.slug">
                  {{ category.name }}
                </div>
              </div>
             <p>{{post.date}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
