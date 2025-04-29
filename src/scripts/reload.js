export function reload() {
    let resizeTimeout;
    const isLargeScreen = window.innerWidth > 768;

    if (isLargeScreen) {
        window.addEventListener('resize', () => {
            // Si hay un timeout pendiente, lo limpiamos
            clearTimeout(resizeTimeout);
          
            // Programamos recarga dentro de 500 ms tras el último resize
            resizeTimeout = setTimeout(() => {
              location.reload();
            }, 500);
          });
    }

}