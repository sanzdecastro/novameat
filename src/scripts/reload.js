export function reload() {
    let resizeTimeout;

window.addEventListener('resize', () => {
  // Si hay un timeout pendiente, lo limpiamos
  clearTimeout(resizeTimeout);

  // Programamos recarga dentro de 500 ms tras el último resize
  resizeTimeout = setTimeout(() => {
    location.reload();
  }, 500);
});
}