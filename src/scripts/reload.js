import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function reload() {
    let resizeTimeout;
    const isLargeScreen = window.innerWidth > 768;

    if (isLargeScreen) {
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
              ScrollTrigger.refresh(true);
            }, 500);
          });
    }

}