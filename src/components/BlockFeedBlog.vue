<script>
import Divider from './Divider.vue';
import { getProductCategories, getPost, apiUrl } from "../lib/api";

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
    }
  },
  data() {
    return {
      blogCategories: [],
      blogPosts: []
    };
  },
  async created() {
    await this.fetchCategories();
    await this.fetchPosts();
  },
  async mounted() {
    this.showView();
  },
  methods: {
    async fetchCategories() {
      const ids = this.section.categories_visible || [];
      if (!ids.length) return;

      try {
        const categories = await Promise.all(
          ids.map(id =>
            getProductCategories(apiUrl, id, this.lang)
          )
        );
        this.blogCategories = categories;
        console.log("Fetched categories:", this.blogCategories);
      } catch (error) {
        console.error("Error al obtener categories", error);
      }
    },
    async fetchPosts() {
      const items = this.section.posts || [];
      if (!items.length) return;

      try {
        const posts = await Promise.all(
          items.map(item =>
            getPost(item.post_name ,this.lang)
          )
        );
        this.blogPosts = posts;
        console.log("Fetched posts:", this.blogPosts);
      } catch (error) {
        console.error("Error al obtener posts", error);
      }
    },
    async showView() {
      const gridButton = document.querySelector(".view-as .grid-view-button")
      const listButton = document.querySelector(".view-as .list-view-button")
      const wrapperFeed = document.querySelector(".feed")

      gridButton.addEventListener("click" , ()=> {
        gridButton.classList.add("active");
        listButton.classList.remove("active")
        wrapperFeed.classList.add("grid-view");
        wrapperFeed.classList.remove("list-view");
      })

      listButton.addEventListener("click", ()=> {
        gridButton.classList.remove("active")
        listButton.classList.add("active");
        wrapperFeed.classList.remove("grid-view");
        wrapperFeed.classList.add("list-view");
      })
    },
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
      <div class="view-as">
        <ul>
          <li class="grid-view-button active">Grid</li>
          <li class="list-view-button">List</li>
        </ul>
      </div>
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
    <div class="feed grid-view">
      <div class="post" v-for="(post, index) in blogPosts">
        <a :href="`/${lang}/journal/${post.slug}`">
          <div class="post-header">
          <div class="log">( Log. {{ String(index + 1).padStart(2, '0') }} )</div>
            <div class="image-wrapper">
                <img :src="post?._embedded?.['wp:featuredmedia']?.[0]?.source_url" :alt="post.title.rendered">
                <div class="categories">
                  <div class="category" v-for="(category, index) in post?._embedded?.['wp:term']?.[0]" :class=category.slug>
                    {{ category.name }}
                  </div>
                </div>
            </div>
          </div>
          
          <div class="post-footer">
            <div>
                <h2>{{post.title.rendered}}</h2>
                <div class="excerpt" v-html="post.excerpt.rendered"></div>
                <span>{{post.acf?.words}}</span>
            </div>
            <div class="categories">
                <div class="category" v-for="(category, index) in post?._embedded?.['wp:term']?.[0]" :class=category.slug>
                  {{ category.name }}
                </div>
              </div>
             <p>{{post.acf?.date}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
