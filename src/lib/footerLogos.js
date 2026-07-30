// src/lib/footerLogos.js
//
// Logos institucionales del footer (certificaciones, ayudas, premios).
// `titleKey` apunta a una clave de src/locales/*.json — si falta en algún
// idioma, el t() de appFooter.vue devuelve '' en silencio.
//
// `enabled: false` deja el logo preparado sin renderizarlo. Un grupo sin
// ningún logo activo no se pinta.
export const footerLogoGroups = [
  {
    key: 'certifications',
    classes: '',
    titleKey: 'footer.certifications',
    logos: [
      { src: '/food-safety.svg', alt: 'Food Safety System Certification 22000' },
      // Marca sola: se le quitó el bloque del Ministerio de Ciencia e Innovación
      // que traía el archivo oficial (el footer ya muestra dos escudos de España).
      { src: '/pyme-innovadora.svg', alt: 'Innovative SME — Pyme Innovadora' },
      { src: '/v-label.svg', alt: 'V-Label', enabled: false },
      { src: '/gluten-free.svg', alt: 'Gluten Free', enabled: false },
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
      // Exportaciones
      { src: '/generalitat-catalunya.png', alt: 'Generalitat de Catalunya' },
      // Innomatch: Mario pidió NO publicarlo todavía (mail 16/07/2026).
      { src: '/innomatch.png', alt: 'InnoMatch', enabled: false },
    ],
  },
  {
    key: 'awards',
    classes: '',
    titleKey: 'footer.awards',
    // Es un sello circular, no un logotipo de tira: a 35px el texto no se lee.
    tall: true,
    logos: [
      { src: '/catalonia-exponential-leaders.png', alt: 'Catalonia Exponential Leader — ACCIÓ, Generalitat de Catalunya' },
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
