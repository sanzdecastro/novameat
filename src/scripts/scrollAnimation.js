// src/scripts/productAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimation() {
  const wrappers = document.querySelectorAll(".scroll-wrapper");
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const isLargeScreen = window.innerWidth > 768;
    const hasAlsoMobileClass = wrapper.classList.contains("also-mobile");

    if (isLargeScreen || hasAlsoMobileClass) {
      const cards = wrapper.querySelectorAll(".card");
      if (!cards.length) return;

      const totalWidth = Array.from(cards).reduce(
        (sum, card) => sum + card.offsetWidth,
        0
      );

      const amountToScroll = Math.max(0, totalWidth - window.innerWidth + 100);

      gsap.to(wrapper, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "center center",
          end: () => `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  });

  ScrollTrigger.refresh();

}