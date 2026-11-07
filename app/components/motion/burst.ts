import { gsap } from "./gsap";

/** A shower of ✳ thrown up from an element, for the moment a message lands. */
export function starBurst(origin: HTMLElement) {
  const { left, top, width } = origin.getBoundingClientRect();
  for (let index = 0; index < 34; index++) {
    const star = document.createElement("span");
    star.textContent = "✳";
    star.className = "burst-star";
    star.style.left = `${left + gsap.utils.random(0, width)}px`;
    star.style.top = `${top}px`;
    document.body.append(star);
    gsap.to(star, {
      physics2D: {
        velocity: gsap.utils.random(320, 860),
        angle: gsap.utils.random(215, 325),
        gravity: 1100,
      },
      rotation: gsap.utils.random(-540, 540),
      scale: gsap.utils.random(0.5, 1.8),
      opacity: 0,
      duration: gsap.utils.random(1.2, 2),
      ease: "power1.in",
      onComplete: () => star.remove(),
    });
  }
}
