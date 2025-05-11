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
    default: "/mapStyles.json",
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
            // .setPopup(
            //   new maplibregl.Popup({ offset: 25 }).setHTML(`
            //       <p class='font-haffe'>${a.shop}</p><br>
            //       <p class='font-haffe'>${a.street}, ${a.city}</p>
            //     `)
            // )
          .addTo(mapInstance);
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
  width: 8px;
  height: 8px;
  background-image: url("/marker.svg"); /* pon aquí tu icono */
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
