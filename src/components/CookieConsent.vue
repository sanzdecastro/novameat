
<script>
export default {
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
    }

    this.prefs.analytics = storedPrefs.analytics || false;
    this.prefs.marketing = storedPrefs.marketing || false;
  },
  methods: {
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
    <div v-if="showBanner" id="cookie-banner" class="cookie-banner">
      <span>Cookies</span>
      <p>
        We approach cookies the same way we approach our cuts: with fewer ingredients and full transparency.
      </p>
      <p>
        We use our own and third-party cookies to improve your browsing experience, understand how the site is used and adapt content to your preferences. You can manage your settings or read more about them in our Cookies Policy.
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
            <input type="checkbox" name="necessary" disabled checked />
            <span>ESSENTIAL COOKIES</span>
            <p>These are always active. They help us maintain site functionality and ensure secure browsing.</p>
          </label>
          <label>
            <input type="checkbox" v-model="prefs.analytics" />
            <span>PERSONALISATION COOKIES</span>
            <p>They let us remember your preferences and tailor your experience.</p>
          </label>
          <label>
            <input type="checkbox" v-model="prefs.marketing" />
            <span>BEHAVIOURAL ADVERTISING COOKIES</span>
            <p>These help us show you more relevant content and ads, based on how you interact with the site.</p>
          </label>
          <div>
            <button type="submit">Save Settings</button>
            <a @click="declineAll">Reject all</a>
            <button type="button" @click="closeSettings">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </template>
  