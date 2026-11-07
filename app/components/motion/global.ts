import { gsap, ScrollSmoother, ScrollTrigger } from "./gsap";
import { onVelocity, type Stage } from "./stage";

/** Inertial scrolling for mouse and trackpad; touch keeps native scrolling. */
export function setupSmooth(stage: Stage, fine: boolean) {
  const smoother = fine
    ? ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
      })
    : null;

  const jump = (event: MouseEvent) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const target = link && document.querySelector<HTMLElement>(link.hash);
    if (!target) return;
    event.preventDefault();
    if (smoother) smoother.scrollTo(target, true, "top top");
    else {
      gsap.to(window, {
        scrollTo: { y: target, autoKill: true },
        duration: 1.3,
        ease: "power3.inOut",
      });
    }
    if (link.classList.contains("skip-link")) {
      target.focus({ preventScroll: true });
    }
  };
  document.addEventListener("click", jump);
  stage.onCleanup(() => document.removeEventListener("click", jump));
}

export function setupChrome() {
  gsap.to(".scroll-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: true },
  });

  const seen = document.documentElement.classList.contains("intro-seen");
  gsap.from(".wordmark, .nav-caption, .desktop-nav a, .nav-actions > *", {
    y: -26,
    autoAlpha: 0,
    stagger: 0.04,
    duration: 0.8,
    delay: seen ? 0.1 : 1.9,
    ease: "expo.out",
    clearProps: "transform",
  });

  // The logo's star idles, and spins up with every push of the scroll.
  const spin = gsap.to(".wordmark-star", {
    rotation: 360,
    duration: 9,
    repeat: -1,
    ease: "none",
  });
  spin.totalTime(spin.duration() * 50);
  onVelocity((velocity) => {
    gsap.killTweensOf(spin);
    spin.timeScale(gsap.utils.clamp(-7, 7, 1 + velocity / 500));
    gsap.to(spin, { timeScale: velocity < 0 ? -1 : 1, duration: 1.2 });
  });
}

export function setupTicker() {
  const loop = gsap.to(".ticker-track", {
    xPercent: -50,
    duration: 22,
    repeat: -1,
    ease: "none",
  });
  // Starts far along so the marquee can run backwards when scrolling up.
  loop.totalTime(loop.duration() * 50);
  onVelocity((velocity) => {
    const direction = velocity < 0 ? -1 : 1;
    gsap.killTweensOf(loop);
    gsap.to(loop, {
      timeScale: direction * (1 + Math.min(Math.abs(velocity) / 350, 6)),
      duration: 0.15,
    });
    gsap.to(loop, { timeScale: direction, duration: 1.4, delay: 0.2 });
  });
  gsap.to(".ticker-group i", {
    rotation: 720,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 1 },
  });
}

/** A ✳ marks the section you're in, sliding between the nav links. */
export function setupNav(stage: Stage) {
  const marker = stage.$(".nav-marker");
  const links = stage.$$<HTMLAnchorElement>(".desktop-nav a");
  if (!marker || !links.length) return;
  gsap.set(marker, { autoAlpha: 1, scale: 0, xPercent: -50 });
  const moveTo = gsap.quickTo(marker, "x", { duration: 0.7, ease: "expo.out" });
  let active: HTMLElement | null = null;
  const show = (link: HTMLElement | null) => {
    active = link;
    links.forEach((item) => item.classList.toggle("is-active", item === link));
    gsap.to(marker, {
      scale: link ? 1 : 0,
      rotation: "+=180",
      duration: 0.6,
      ease: "back.out(2)",
      overwrite: "auto",
    });
    if (link) moveTo(link.offsetLeft + link.offsetWidth / 2);
  };
  links.forEach((link) => {
    const section = document.querySelector<HTMLElement>(link.hash);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section.closest(".pin-spacer") ?? section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) show(link);
        else if (active === link) show(null);
      },
    });
  });
}

export function setupPointer(stage: Stage) {
  const listeners: [EventTarget, string, EventListener][] = [];
  const on = <E extends Event>(
    target: EventTarget,
    type: string,
    listener: (event: E) => void,
  ) => {
    target.addEventListener(type, listener as EventListener);
    listeners.push([target, type, listener as EventListener]);
  };
  stage.onCleanup(() => {
    listeners.forEach(([target, type, listener]) => {
      target.removeEventListener(type, listener);
    });
  });

  // A ring trails the pointer, swelling over links and reading "VIEW" on work.
  const cursor = stage.$(".cursor");
  if (cursor) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    on<PointerEvent>(window, "pointermove", (event) => {
      x(event.clientX);
      y(event.clientY);
      gsap.set(cursor, { autoAlpha: 1 });
      const target = event.target as Element;
      if (target.closest(".project-visual-link")) cursor.dataset.state = "view";
      else if (target.closest("input, textarea")) cursor.dataset.state = "text";
      else if (target.closest("a, button")) cursor.dataset.state = "link";
      else cursor.dataset.state = "";
    });
    on(document.documentElement, "pointerleave", () => {
      gsap.set(cursor, { autoAlpha: 0 });
    });
  }

  stage.$$("[data-magnetic]").forEach((element) => {
    const x = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3" });
    on<PointerEvent>(element, "pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      x((event.clientX - rect.left - rect.width / 2) * 0.28);
      y((event.clientY - rect.top - rect.height / 2) * 0.28);
    });
    on(element, "pointerleave", () => {
      x(0);
      y(0);
    });
  });

  stage.$$(".desktop-nav .nav-label").forEach((label) => {
    const text = label.textContent ?? "";
    on(label.parentElement as HTMLElement, "pointerenter", () => {
      gsap.to(label, {
        duration: 0.5,
        ease: "none",
        overwrite: true,
        scrambleText: { text, chars: "lowerCase", speed: 0.9 },
      });
    });
  });

  stage.$$(".project-visual-link").forEach((cover) => {
    const quick = { duration: 0.6, ease: "power3" };
    const rotateY = gsap.quickTo(cover, "rotationY", quick);
    const rotateX = gsap.quickTo(cover, "rotationX", quick);
    const lightX = gsap.quickTo(cover, "--light-x", { duration: 0.5 });
    const lightY = gsap.quickTo(cover, "--light-y", { duration: 0.5 });
    gsap.set(cover, {
      transformPerspective: 1100,
      "--light-x": "50%",
      "--light-y": "50%",
    });
    on<PointerEvent>(cover, "pointermove", (event) => {
      const rect = cover.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      rotateY((px - 0.5) * 14);
      rotateX((py - 0.5) * -14);
      lightX(px * 100);
      lightY(py * 100);
    });
    on(cover, "pointerleave", () => {
      rotateY(0);
      rotateX(0);
      lightX(50);
      lightY(50);
    });
  });

  // In the hero, the art leans toward the pointer and letters flinch from it.
  const hero = stage.$("#hero");
  const art = stage.$(".orbital-art");
  if (hero && art) {
    const rotateY = gsap.quickTo(art, "rotationY", { duration: 1 });
    const rotateX = gsap.quickTo(art, "rotationX", { duration: 1 });
    const letters = stage.$$(".hero-letter > span").map((letter) => ({
      letter,
      y: gsap.quickTo(letter, "y", { duration: 0.5, ease: "power3" }),
      skew: gsap.quickTo(letter, "skewX", { duration: 0.5, ease: "power3" }),
    }));
    on<PointerEvent>(hero, "pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 36);
      rotateX(((event.clientY - rect.top) / rect.height - 0.5) * -36);
      letters.forEach(({ letter, y, skew }) => {
        const box = letter.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 340);
        y(-pull * pull * 22);
        skew((dx < 0 ? 1 : -1) * pull * pull * 9);
      });
    });
    on(hero, "pointerleave", () => {
      rotateY(0);
      rotateX(0);
      letters.forEach(({ y, skew }) => {
        y(0);
        skew(0);
      });
    });
  }
}
