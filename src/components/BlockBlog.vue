<script>
import Divider from './Divider.vue';

// Import Swiper styles
export default {
  name: "BlockBlog",
  components: {
   Divider,
  },
  props: {
    section: {
      type: Object,
    },
  },
  computed: {
    // Los artículos llegan de WP con los títulos de sección maquetados de 3
    // formas: <h2>, <h3> o un párrafo entero en negrita (texto pegado desde
    // Word/Docs). Convertimos ese último caso en <h3> para que todos los
    // títulos compartan estilo (ver .block-blog h2, h3 en global.css), sin
    // tocar el contenido en WordPress.
    blockText() {
      const html = this.section?.block_text || '';
      if (!html || typeof DOMParser === 'undefined') return html;

      const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
      const root = doc.body.firstElementChild;

      // Títulos vacíos que deja el editor (<h2><strong></strong></h2>): solo
      // añadían un hueco con el margen de título
      root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
        if (!h.textContent.replace(/ /g, ' ').trim()) h.remove();
      });

      root.querySelectorAll('p').forEach((p) => {
        const text = p.textContent.replace(/ /g, ' ').trim();
        if (!text) return;

        const bold = Array.from(p.querySelectorAll('b, strong'))
          .filter((el) => !el.parentElement.closest('b, strong'))
          .map((el) => el.textContent)
          .join('')
          .replace(/ /g, ' ')
          .trim();
        if (bold !== text) return;

        const h3 = doc.createElement('h3');
        h3.innerHTML = p.innerHTML;
        h3.querySelectorAll('b, strong').forEach((el) => el.replaceWith(...el.childNodes));
        p.replaceWith(h3);
      });

      return root.innerHTML;
    },
  },
  mounted() {
    this.hoverNotes();
  },
  methods: {
    hoverNotes() {
        const blocks = document.querySelectorAll(".block-blog")

        if(window.innerWidth > 750) {
            blocks.forEach((block)=> {
                const notes = block.querySelectorAll(".block-blog p em");
                // console.log(notes)
                notes.forEach((note, index)=> {
                    note.addEventListener("mouseover" , function() {
                        const block = note.closest(".block");
                        const innerNotes = block.querySelectorAll(".notes .note");
                    
                        if (innerNotes[index]) {
                            innerNotes[index].classList.add("active");
                        }
                    })

                    note.addEventListener("mouseleave", ()=> {
                        const block = note.closest(".block");
                        const innerNotes = block.querySelectorAll(".notes .note");
                    
                        if (innerNotes[index]) {
                            innerNotes[index].classList.remove("active");
                        }
                    })
                })
            })
        } else {
             blocks.forEach((block)=> {
                const notes = block.querySelectorAll(".block-blog p em");
                // console.log(notes)
                notes.forEach((note, index)=> {
                    note.addEventListener("click" , function() {
                        const block = note.closest(".block");
                        const innerNotesContainer = block.querySelector(".notes");
                        const innerNotes = innerNotesContainer.querySelectorAll(".notes .note");
                        const blog = document.querySelector(".wrapper-blog");


                        note.classList.add("z-10", "relative")
                        block.classList.add("active-note")
                        blog.classList.add("active-note")
                    
                        if (innerNotes[index]) {
                            innerNotes[index].classList.add("active");
                        }
                        innerNotesContainer.addEventListener("click", () => {
                            block.classList.remove("active-note");
                            note.classList.remove("z-10", "relative")
                            blog.classList.remove("active-note")
                            innerNotes.forEach(n => n.classList.remove("active"));
                        });

                    })

                    
                })
            })
        }
        
        
    }
  }
 
};
</script>

<template >
    <div class="block-blog">
        <div class="block mb-md">
            <div class="text-block" v-if="section.add_text === true" v-html="blockText"></div>
            <div v-if="section.add_quote === true" class="quote">
                <p class="quote-text">{{ section.quote.quote }}</p>
                <p class="quote-author">{{ section.quote.author }}</p>
            </div>
            <div class="notes" v-if="section.add_notes === true">
                <div v-for="(note, index) in section.notes" class="note" :key="index">
                    <p>{{ note.note }}</p>
                    <img :src="note.image.url" :alt="note.image.alt" class="w-full h-auto"></img>
                </div>
            </div>
            <div class="interview" v-if="section.add_interview === true">
                <div v-for="(item, index) in section.interview" class="block-interview" :key="index">
                    <p class="question">{{ item.question }}</p>
                    <p class="answer" v-html="item.answer"></p>
                </div>
            </div>
            <div class="block-image" v-if="section.add_image === true">
                <img :src="section.image?.image?.url" :alt="section?.image?.image?.alt" class="w-full h-auto"></img>
                <div class="notes">
                    <div class="note">
                        <p>{{ section?.image?.image_caption }}</p>
                    </div>

                </div>
            </div>
            <div class="video-blog" v-if="section.add_video === true">
                <div class="video-section aspect-video overflow-hidden">
                    <div class="video-wrapper relative  aspect-video  flex justify-center items-center overflow-hidden">
                        <video class="absolute object-cover w-full h-full" controls :poster="section.video?.poster?.url" :src="section.video?.video?.url"></video>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
  
</template>
