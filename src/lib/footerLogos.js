// src/lib/footerLogos.js
//
// Logos institucionales del footer (certificaciones, ayudas, premios).
// `titleKey` apunta a una clave de src/locales/*.json — si falta en algún
// idioma, el t() de appFooter.vue devuelve '' en silencio.
//
// `enabled: false` deja el logo preparado sin renderizarlo. Un grupo sin
// ningún logo activo no se pinta.
//
// `tall` renderiza a 70px en vez de 35px, para sellos circulares o lockups
// apilados cuyo texto no se lee a tamaño de tira. Va por logo o por grupo
// entero; el del logo manda sobre el del grupo.
export const footerLogoGroups = [
  {
    key: 'certifications',
    classes: '',
    titleKey: 'footer.certifications',
    logos: [
      // Sustituye a /food-safety.svg por petición de Mario (mail 18/08/2026).
      // Lockup apilado (BRCGS / START! / CERTIFICATED): a 35px no se lee, de ahí
      // el `tall`. Archivo oficial tal cual, con su degradado — es el único logo
      // del footer que no es negro plano.
      { src: '/brcgs-start.png', alt: 'BRCGS START! Certificated', tall: true },
      { src: '/food-safety.svg', alt: 'BRCGS Food Safety', enabled: false },
      // Lockup apilado (círculo V-Label + caja VEGAN): a 35px no se lee la caja.
      { src: '/v-label.png', alt: 'V-Label Vegan', tall: true },
      // Sello circular; mismo criterio que el resto de sellos circulares del footer.
      { src: '/gluten-free.png', alt: 'Gluten Free', tall: true },
    ],
  },
  {
    key: 'financial_support',
    classes: 'mr-12',
    titleKey: 'footer.financial_support',
    // Es el grupo con más logos: ocupa doble columna para no partirse en 3 filas.
    wide: true,
    logos: [
      { src: '/ministerio-economia.svg', alt: 'Ministerio de Economía, Comercio y Empresa' },
      // CVI. Logo compuesto: escudo de /ministerio-economia.svg + texto del archivo
      // oficial, sin el bloque "Gobierno de España", para que case con su hermano.
      { src: '/ministerio-industria-turismo.svg', alt: 'Ministerio de Industria y Turismo' },
      { src: '/cdti.svg', alt: 'CDTI — Centro para el Desarrollo Tecnológico y la Innovación' },
      { src: '/eu.svg', alt: 'Unión Europea', enabled: false },
      
      { src: '/next-generation-eu.png', alt: 'Financiado por la Unión Europea — NextGenerationEU' },
      { src: '/transformacion-resiliencia.png', alt: 'Financiado por la Unión Europea — NextGenerationEU' },
      // Exportaciones
      { src: '/generalitat-catalunya.png', alt: 'Generalitat de Catalunya' },
      // Lockup apilado: la línea "Catalonia Trade & Investment" se pierde a 35px.
      { src: '/accio-investment.png', alt: 'ACCIÓ — Catalonia Trade & Investment'},
      // Innomatch: Mario pidió NO publicarlo todavía (mail 16/07/2026).
      { src: '/innomatch.png', alt: 'InnoMatch', enabled: false },
    ],
  },
  {
    key: 'awards',
    classes: '',
    titleKey: 'footer.awards',
    // Sellos con texto integrado: a 35px no se lee, por eso el grupo va tall.
    tall: true,
    logos: [
      { src: '/catalonia-exponential-leaders.png', alt: 'Catalonia Exponential Leader — ACCIÓ, Generalitat de Catalunya' },
      // Marca sola: se le quitó el bloque del Ministerio de Ciencia e Innovación
      // que traía el archivo oficial (el footer ya muestra dos escudos de España).
      { src: '/pyme-innovadora.svg', alt: 'Innovative SME — Pyme Innovadora' },
    ],
  },
  {
    key: 'member_of',
    classes: '',
    titleKey: 'footer.member_of',
    logos: [
      { src: '/eit.svg', alt: 'EIT Food' },
    ],
  },
]

// Grupos con al menos un logo activo, ya filtrados.
export const activeFooterLogoGroups = footerLogoGroups
  .map((group) => ({ ...group, logos: group.logos.filter((logo) => logo.enabled !== false) }))
  .filter((group) => group.logos.length > 0)
