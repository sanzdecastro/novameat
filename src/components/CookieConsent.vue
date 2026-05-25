
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
    } else {
      this.applyConsent(storedPrefs);
    }

    this.prefs.analytics = storedPrefs.analytics || false;
    this.prefs.marketing = storedPrefs.marketing || false;

    this._clickHandler = (e) => {
      const btn = e.target.closest("[data-open-cookie-settings]");
      if (btn) {
        e.preventDefault();
        this.showModal = true;
      }
    };
    document.addEventListener("click", this._clickHandler);
  },
  unmounted() {
    document.removeEventListener("click", this._clickHandler);
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
    applyConsent(prefs) {
      if (prefs.analytics && !window.__ga_loaded) {
        window.__ga_loaded = true;
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-H5KKM5STLL";
        script.async = true;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-H5KKM5STLL");
      }
      if (prefs.marketing && !window.__hs_loaded) {
        window.__hs_loaded = true;
        const script = document.createElement("script");
        script.src = "//js-eu1.hs-scripts.com/145277321.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    },
    acceptAll() {
      const prefs = { accepted: true, analytics: true, marketing: true };
      this.savePrefs(prefs);
      this.showBanner = false;
      this.showModal = false;
    },
    declineAll() {
      const prefs = { accepted: false, analytics: false, marketing: false };
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
      this.applyConsent(prefs);
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
        <a @click="declineAll" class="secondary">{{ messages.cookies.banner.reject }}</a>
        <a @click="openSettings" class="secondary">{{ messages.cookies.banner.configure }}</a>
        <a @click="acceptAll" class="primary">{{ messages.cookies.banner.accept_all }}</a>
      </div>
    </div>
  
    <div v-if="showModal" id="cookie-settings-modal" class="cookie-modal">
      <div class="modal-content">
        <h2>{{ messages.cookies.modal.title }}</h2>
        <p>{{ messages.cookies.modal.intro }}</p>
        <form @submit.prevent="savePreferences">
          <label>
            (
            <input type="checkbox" name="necessary" disabled checked />

            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>{{ messages.cookies.modal.essential_title }}</span>
              <p>{{ messages.cookies.modal.essential_desc }}</p>
            </div>

          </label>
          <label>
            (
            <input type="checkbox" v-model="prefs.analytics" />

            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>{{ messages.cookies.modal.analytics_title }}</span>
              <p>{{ messages.cookies.modal.analytics_desc }}</p>
            </div>

          </label>
          <label>
            (
            <input type="checkbox" v-model="prefs.marketing" />

            <div class="dot-check"></div>
            )
            <div class="pl-lg">
              <span>{{ messages.cookies.modal.marketing_title }}</span>
              <p>{{ messages.cookies.modal.marketing_desc }}</p>
            </div>

          </label>
          <div>
            <div class="buttons">
              <a class="secondary" @click="declineAll">{{ messages.cookies.modal.reject_all }}</a>
              <button class="secondary" type="submit">{{ messages.cookies.modal.save }}</button>
              <a class="primary" @click="closeSettings">{{ messages.cookies.modal.close }}</a>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>
  