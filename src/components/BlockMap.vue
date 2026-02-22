<script setup>
import "maplibre-gl/dist/maplibre-gl.css";
import { ref, onMounted, onBeforeUnmount } from "vue";
import maplibregl from "maplibre-gl";


// Recibe la sección con countries → address con lat/lng
const props = defineProps({
  countries: {
    type: Array,
    required: true,
  },
  styleUrl: {
    type: String,
    default: "/mapStyles2.json",
  },
  defaultZoom: {
    type: Number,
    default: 3.5,
  },
});

const mapContainer = ref(null);
let mapInstance = null;

// Este es el método que expondremos para centrar/zoom
function zoomTo([lng, lat], zoomLevel = 18) {
  if (!mapInstance) return;
  mapInstance.flyTo({ center: [lng, lat], zoom: zoomLevel });
}


// Hacemos visible zoomTo al padre
defineExpose({ zoomTo});

onMounted(() => {
  // 1) Creamos el mapa
  mapInstance = new maplibregl.Map({
    container: mapContainer.value,
    style: props.styleUrl,
    center: [5, 48.0],
    zoom: props.defaultZoom,
  });

  // 2) Añadimos controles de navegación
  mapInstance.addControl(new maplibregl.NavigationControl(), "bottom-left");

  mapInstance.scrollZoom.disable();

  mapContainer.value.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      mapInstance.scrollZoom.enable();
    } else {
      mapInstance.scrollZoom.disable();
    }
  });

  mapInstance.on("load", () => {
    const coords = [];
    if (!Array.isArray(props.countries) || !props.countries.length) {
      return; // no hay marcadores que dibujar
    }

    props.countries.forEach((country) => {
      (country.address || []).forEach((a) => {
        // Extraemos y limpiamos
        const lat = parseFloat((a.lat || "").replace(",", ".").trim());
        const lng = parseFloat((a.lng || "").replace(",", ".").trim());
        if (isNaN(lat) || isNaN(lng)) return;

        const position = [lng, lat];
        coords.push(position);

        // Creamos el elemento custom
        const el = document.createElement("div");
        el.className = "custom-marker";

        // Construimos el marker con el elemento
        new maplibregl.Marker({ element: el })
          .setLngLat(position)
            .setPopup(
              new maplibregl.Popup({ offset: 10 }).setHTML(`
                  <p class='font-haffe'><a target="_blank" href="${a.google_maps}">${a.shop} </br><span style="display:inline-block; text-decoration:underline;">↳ Web</span></a></p>
                `)
            )
          .addTo(mapInstance);

          const NAME_TO_ISO2 = {
  // Albania
  "albania": "AL",

  // Alemania
  "germany": "DE",
  "alemania": "DE",

  // Andorra
  "andorra": "AD",

  // Armenia
  "armenia": "AM",

  // Austria
  "austria": "AT",

  // Azerbaiyán
  "azerbaijan": "AZ",
  "azerbaiyán": "AZ",

  // Bélgica
  "belgium": "BE",
  "bélgica": "BE",

  // Bielorrusia
  "belarus": "BY",
  "bielorrusia": "BY",

  // Bosnia y Herzegovina
  "bosnia and herzegovina": "BA",
  "bosnia y herzegovina": "BA",

  // Bulgaria
  "bulgaria": "BG",

  // Chipre
  "cyprus": "CY",
  "chipre": "CY",

  // Croacia
  "croatia": "HR",
  "croacia": "HR",

  // Dinamarca
  "denmark": "DK",
  "dinamarca": "DK",

  // Eslovaquia
  "slovakia": "SK",
  "eslovaquia": "SK",

  // Eslovenia
  "slovenia": "SI",
  "eslovenia": "SI",

  // España
  "spain": "ES",
  "españa": "ES",

  // Estonia
  "estonia": "EE",

  // Finlandia
  "finland": "FI",
  "finlandia": "FI",

  // Francia
  "france": "FR",
  "francia": "FR",

  // Georgia
  "georgia": "GE",
  "georgia (country)": "GE",

  // Grecia
  "greece": "GR",
  "grecia": "GR",

  // Hungría
  "hungary": "HU",
  "hungría": "HU",

  // Irlanda
  "ireland": "IE",
  "irlanda": "IE",

  // Islandia
  "iceland": "IS",
  "islandia": "IS",

  // Italia
  "italy": "IT",
  "italia": "IT",

  // Kosovo
  "kosovo": "XK",

  // Letonia
  "latvia": "LV",
  "letonia": "LV",

  // Liechtenstein
  "liechtenstein": "LI",

  // Lituania
  "lithuania": "LT",
  "lituania": "LT",

  // Luxemburgo
  "luxembourg": "LU",
  "luxemburgo": "LU",

  // Macedonia del Norte
  "north macedonia": "MK",
  "macedonia del norte": "MK",

  // Malta
  "malta": "MT",

  // Moldavia
  "moldova": "MD",
  "moldavia": "MD",

  // Mónaco
  "monaco": "MC",
  "mónaco": "MC",

  // Montenegro
  "montenegro": "ME",

  // Noruega
  "norway": "NO",
  "noruega": "NO",

  // Países Bajos
  "netherlands": "NL",
  "países bajos": "NL",
  "paises bajos": "NL",
  "holland": "NL",

  // Polonia
  "poland": "PL",
  "polonia": "PL",

  // Portugal
  "portugal": "PT",

  // Reino Unido
  "united kingdom": "GB",
  "reino unido": "GB",
  "uk": "GB",

  // República Checa
  "czech republic": "CZ",
  "czechia": "CZ",
  "república checa": "CZ",

  // Rumanía
  "romania": "RO",
  "rumanía": "RO",

  // Rusia
  "russia": "RU",
  "rusia": "RU",

  // San Marino
  "san marino": "SM",

  // Serbia
  "serbia": "RS",

  // Suecia
  "sweden": "SE",
  "suecia": "SE",

  // Suiza
  "switzerland": "CH",
  "suiza": "CH",

  // Turquía (parte europea)
  "turkey": "TR",
  "turquía": "TR",

  // Ucrania
  "ukraine": "UA",
  "ucrania": "UA",

  // Vaticano
  "vatican": "VA",
  "vatican city": "VA",
  "ciudad del vaticano": "VA"
};

          const iso2List = [
            ...new Set(
              (props.countries || [])
                .map(c => (c.country_name || "").toString().trim().toLowerCase())
                .map(name => NAME_TO_ISO2[name])
                .filter(Boolean)
            )
          ];

          if (mapInstance.getLayer("countries-highlight")) {
            mapInstance.setFilter(
              "countries-highlight",
              ["in", ["get", "ISO3166-1-Alpha-2"], ["literal", iso2List]]
            );
          }
      });
    });
    if (coords.length > 1) {
      //   // Si hay 2 o más, ajusta bounds como antes:
      //   const bounds = coords.reduce(
      //     (b, c) => b.extend(c),
      //     new maplibregl.LngLatBounds(coords[0], coords[0])
      //   );
      //   mapInstance.fitBounds(bounds, { padding: 20 });
    } else if (coords.length === 1) {
      // Si sólo hay 1, centrar manualmente con tu zoom por defecto:
      mapInstance.setCenter(coords[0]);
      mapInstance.setZoom(props.defaultZoom);
    }
  });
});

onBeforeUnmount(() => {
  if (mapInstance) mapInstance.remove();
});
</script>

<template>
  <div ref="mapContainer" class="mt-lg w-full h-[70vh]"></div>
</template>

<style>
.maplibregl-ctrl-bottom-right {
  display: none;
}
.custom-marker {
  width: 12px;
  height: 12px;
  background-image: url("/marker.svg"); /* pon aquí tu icono */
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
