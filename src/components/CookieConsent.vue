
<script>
import gsap from "gsap";
import { nextTick } from "vue"; 

export default {
  props: {
    lang: {
      type: String,
    },
    messages : {
      type: Object,
    },
  },
  data() {
    return {
      showBanner: false,
      showModal: false,
      prefs: {
        analytics: false,
        marketing: false,
      },
    };
  },
  mounted() {
    const storedPrefs = JSON.parse(localStorage.getItem("cookie-preferences") || "{}");

    if (storedPrefs.accepted === undefined) {
      this.showBanner = true;
      nextTick(() => {
        this.animationCookies();
      });
    }

    this.prefs.analytics = storedPrefs.analytics || false;
    this.prefs.marketing = storedPrefs.marketing || false;
    
    
  },
  methods: {
    async animationCookies() {
      const cookieBanner = this.$refs.cookieBanner;
      gsap.set(cookieBanner, { y: 10, opacity: 0 });

      gsap.to(cookieBanner, {
        y: 0,
        delay: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    acceptAll() {
      const prefs = {
        accepted: true,
        analytics: true,
        marketing: true,
      };
      this.savePrefs(prefs);
      this.showBanner = false;
      this.showModal = false;
    },
    declineAll() {
      const prefs = {
        accepted: false,
        analytics: false,
        marketing: false,
      };
      this.savePrefs(prefs);
      this.showBanner = false;
      this.showModal = false;
    },
    openSettings() {
      this.showModal = true;
    },
    closeSettings() {
      this.showModal = false;
    },
    savePreferences() {
      const prefs = {
        accepted: true,
        analytics: this.prefs.analytics,
        marketing: this.prefs.marketing,
      };
      this.savePrefs(prefs);
      this.showBanner = false;
      this.showModal = false;
    },
    savePrefs(prefs) {
      localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
      // Aquí podrías inicializar scripts si es necesario
    },
  },
};
</script>


<template>
   <div>
    <div v-if="showBanner" id="cookie-banner" ref="cookieBanner" class="cookie-banner">
      <span>Cookies</span>
      <p>
        {{messages.cookies.text1}}
      </p>
      <p>
        {{messages.cookies.text2}}
      </p>
      <div class="buttons">
        
        <a @click="openSettings" class="secondary">Preferencias</a>
        <a @click="acceptAll" class="primary">Aceptar todo</a>
      </div>
    </div>
  
    <div v-if="showModal" id="cookie-settings-modal" class="cookie-modal">
      <div class="modal-content">
        <h2>COOKIES SETTINGS</h2>
        <p>Our cuts are not an alternative, they’re a choice. And we believe in informed choices. Below, you’ll find a breakdown of the cookies we use and why we use them for.</p>
        <form @submit.prevent="savePreferences">
          <label>
            (
            <input type="checkbox" name="necessary" disabled checked />
            
            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>ESSENTIAL COOKIES</span>
              <p>These are always active. They help us maintain site functionality and ensure secure browsing.</p>
            </div>
           
          </label>
          <label>
            (
            <input type="checkbox" v-model="prefs.analytics" />
            
            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>PERSONALISATION COOKIES</span>
              <p>They let us remember your preferences and tailor your experience.</p>
            </div>
            
          </label>
          <label>
            (
            <input type="checkbox" v-model="prefs.marketing" />
            
            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>BEHAVIOURAL ADVERTISING COOKIES</span>
              <p>These help us show you more relevant content and ads, based on how you interact with the site.</p>
            </div>
         
          </label>
          <div>
            <div class="buttons">
              <a class="secondary" @click="declineAll">Reject all</a>
              <a class="secondary" type="submit">Save Settings</a>
              <a class="primary" @click="closeSettings">Close</a>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>
  