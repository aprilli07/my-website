import { gsap, ScrollTrigger, SplitText } from "./gsap";
import {
  curvedEdge,
  headingReveal,
  onVelocity,
  sectionTop,
  type Stage,
} from "./stage";

type Scene = { enter: gsap.core.Timeline; loop: gsap.core.Timeline };

const $ = (scope: Element, selector: string) =>
  Array.from(scope.querySelectorAll<HTMLElement>(selector));
const paused = (vars: gsap.TimelineVars = {}) =>
  gsap.timeline({ paused: true, ...vars });

/** Blocks pop up, roads and the river draw in, pins drop onto the map. */
function city(visual: HTMLElement): Scene {
  const enter = paused({ defaults: { ease: "power3.out" } });
  enter
    .from($(visual, ".city-buildings rect"), {
      scale: 0,
      transformOrigin: "50% 50%",
      stagger: { each: 0.025, from: "random" },
      duration: 0.5,
      ease: "back.out(2)",
    })
    .fromTo(
      $(visual, ".city-river"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1.3, ease: "power2.inOut" },
      0,
    )
    .fromTo(
      $(visual, ".city-roads path"),
      { drawSVG: "0%" },
      { drawSVG: "100%", stagger: 0.08, duration: 1.1, ease: "power2.inOut" },
      0.1,
    )
    .from(
      $(visual, ".map-marker"),
      { y: -130, autoAlpha: 0, stagger: 0.18, duration: 1, ease: "bounce.out" },
      0.7,
    )
    .from(
      $(visual, ".city-label"),
      {
        x: -70,
        rotation: -14,
        autoAlpha: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
      },
      0.9,
    );
  const loop = paused({ repeat: -1, repeatDelay: 1 });
  loop.fromTo(
    $(visual, ".map-marker"),
    { boxShadow: "0 0 0 0px #27392c55" },
    { boxShadow: "0 0 0 26px #27392c00", stagger: 0.35, duration: 1.5 },
  );
  return { enter, loop };
}

/** The phone swings in and a live scan beam sweeps over the fruit. */
function nutrition(visual: HTMLElement): Scene {
  const beam = $(visual, ".scan-beam");
  gsap.set(beam, { autoAlpha: 1 });
  const enter = paused({ defaults: { ease: "expo.out" } });
  enter
    .from($(visual, ".nutrition-phone"), {
      y: 300,
      rotation: 34,
      duration: 1.4,
      ease: "back.out(1.2)",
    })
    .from(
      SplitText.create($(visual, ".nutrition-word"), { type: "chars" }).chars,
      {
        yPercent: 90,
        autoAlpha: 0,
        rotation: -20,
        stagger: 0.04,
        duration: 0.8,
      },
      0.2,
    )
    .from(
      $(visual, ".orange-fruit"),
      { scale: 0, rotation: -90, duration: 1, ease: "back.out(2.2)" },
      0.6,
    )
    .from(
      $(visual, ".phone-lines i"),
      { scaleX: 0, transformOrigin: "0 50%", stagger: 0.1, duration: 0.6 },
      0.9,
    );
  const loop = paused({ repeat: -1, yoyo: true, repeatDelay: 0.25 });
  loop.fromTo(
    beam,
    { top: "8%" },
    { top: "90%", duration: 1.5, ease: "sine.inOut" },
  );
  return { enter, loop };
}

/** Mail slides in, gets labelled, and the inbox keeps quietly re-sorting. */
function mail(visual: HTMLElement): Scene {
  const rows = $(visual, ".fake-mail");
  const enter = paused({ defaults: { ease: "expo.out" } });
  enter
    .from($(visual, ".mail-decoration"), {
      rotation: -120,
      scale: 0.4,
      autoAlpha: 0,
      duration: 1.4,
    })
    .from(
      $(visual, ".mail-window"),
      { y: 190, rotation: 9, scale: 0.8, duration: 1.2, ease: "back.out(1.3)" },
      0.1,
    )
    .from(rows, { x: 170, autoAlpha: 0, stagger: 0.12, duration: 0.8 }, 0.55)
    .from(
      $(visual, ".mail-badge"),
      { scale: 0, stagger: 0.12, duration: 0.5, ease: "back.out(3)" },
      0.9,
    );
  const span = () => rows[2].offsetTop - rows[0].offsetTop;
  const swap = { duration: 0.7, ease: "power3.inOut" };
  const loop = paused({ repeat: -1, repeatDelay: 1.6 });
  loop
    .to(rows[2], { y: () => -span(), ...swap }, 0)
    .to(rows[0], { y: () => span(), ...swap }, 0)
    .to(
      $(visual, ".window-bar svg"),
      { rotation: 360, duration: 1.2, ease: "power2.inOut" },
      0,
    )
    .to(rows, { y: 0, ...swap }, 2.4);
  return { enter, loop };
}

/** Cards stand up on the board, then suspects fold down one question at a time. */
function game(visual: HTMLElement): Scene {
  const cards = $(visual, ".face-card");
  const enter = paused({ defaults: { ease: "expo.out" } });
  enter
    .from($(visual, ".guess-title"), {
      scale: 2.1,
      autoAlpha: 0,
      rotation: -28,
      duration: 0.9,
    })
    .from(
      cards,
      {
        rotationX: -105,
        transformOrigin: "50% 100%",
        transformPerspective: 500,
        stagger: { each: 0.08, from: "random" },
        duration: 0.9,
        ease: "back.out(2)",
      },
      0.2,
    );
  const loop = paused({ repeat: -1, repeatDelay: 1.4 });
  [5, 2, 7, 0].forEach((index, step) => {
    loop.to(
      cards[index],
      { rotationX: -88, duration: 0.45, ease: "power2.in" },
      step * 0.8,
    );
  });
  loop.to(
    cards,
    { rotationX: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.04 },
    "+=0.9",
  );
  return { enter, loop };
}

const scenes: Record<string, (visual: HTMLElement) => Scene> = {
  city,
  nutrition,
  mail,
  game,
};

function cardText(card: HTMLElement) {
  const heading = card.querySelector("h3");
  const description = card.querySelector(".project-description");
  const footer = card.querySelector(".project-footer");
  const timeline = paused({ defaults: { ease: "expo.out" } });
  if (heading) {
    timeline.from(
      SplitText.create(heading, { type: "chars", mask: "chars" }).chars,
      { yPercent: 115, stagger: 0.03, duration: 0.9 },
      0.1,
    );
  }
  if (description) {
    timeline.from(
      SplitText.create(description, {
        type: "words",
        mask: "words",
        wordsClass: "split-word",
      }).words,
      { yPercent: 115, stagger: 0.012, duration: 0.8 },
      0.25,
    );
  }
  timeline
    .from(
      card.querySelectorAll(".project-meta > *"),
      { y: 12, autoAlpha: 0, stagger: 0.1, duration: 0.6 },
      0.1,
    )
    .fromTo(footer, { "--rule": 0 }, { "--rule": 1, duration: 1 }, 0.3)
    .from(
      card.querySelectorAll(".project-tech span, .project-links a"),
      { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.6 },
      0.45,
    );
  return timeline;
}

function animateCard(card: HTMLElement, index: number, rail?: gsap.core.Tween) {
  const visual = card.querySelector<HTMLElement>("[data-scene]");
  const scene = visual ? scenes[visual.dataset.scene ?? ""]?.(visual) : null;
  const text = cardText(card);
  const cover = card.querySelector(".project-visual-link");

  gsap.set(cover, { clipPath: "inset(100% 0% 0% 0%)" });
  const play = () => {
    gsap.to(cover, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.1,
      ease: "power4.inOut",
      clearProps: "clipPath",
    });
    scene?.enter.play();
    text.play();
  };

  // The first card is already on screen when the rail pins, so it keys off
  // the section arriving rather than sideways travel.
  const trigger: ScrollTrigger.Vars =
    rail && index > 0
      ? { trigger: card, containerAnimation: rail, start: "left 82%" }
      : {
          trigger: rail ? "#projects" : card,
          start: rail ? "top 50%" : "top 80%",
        };
  ScrollTrigger.create({ ...trigger, once: true, onEnter: play });

  if (scene) {
    ScrollTrigger.create({
      ...(rail
        ? {
            trigger: card,
            containerAnimation: rail,
            start: "left right",
            end: "right left",
          }
        : { trigger: card, start: "top bottom", end: "bottom top" }),
      onToggle: (self) => {
        scene.loop.paused(!self.isActive);
      },
    });
  }
}

/** Desktop: the whole section pins and the work slides past sideways. */
function pinRail(stage: Stage) {
  const section = stage.$("#projects");
  const rail = stage.$(".projects-rail");
  const count = stage.$(".rail-count b");
  if (!section || !rail || !count) return undefined;

  section.classList.add("is-rail");
  stage.onCleanup(() => section.classList.remove("is-rail"));
  gsap.set(".rail-hud", { autoAlpha: 1 });

  const travel = () =>
    rail.scrollWidth + rail.offsetLeft * 2 - section.clientWidth;
  let current = 1;

  const tween = gsap.to(rail, {
    x: () => -travel(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${travel() * 1.15}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(".rail-bar i", { scaleX: self.progress });
        const next = Math.min(4, Math.floor(self.progress * 4) + 1);
        if (next === current) return;
        current = next;
        gsap.to(count, {
          duration: 0.4,
          scrambleText: { text: `0${next}`, chars: "0123456789", speed: 1 },
        });
      },
    },
  });

  // Tabbing to a card off to the right scrolls the rail it sits on.
  const reveal = (event: FocusEvent) => {
    const scroller = tween.scrollTrigger;
    const card = (event.target as Element).closest<HTMLElement>(
      ".project-card",
    );
    if (!scroller || !card) return;
    const bounds = card.getBoundingClientRect();
    if (bounds.left >= 0 && bounds.right <= innerWidth) return;
    const offset =
      bounds.left - rail.getBoundingClientRect().left - rail.offsetLeft;
    const progress = gsap.utils.clamp(0, 1, offset / travel());
    scroller.scroll(
      scroller.start + (scroller.end - scroller.start) * progress,
    );
  };
  rail.addEventListener("focusin", reveal);
  stage.onCleanup(() => rail.removeEventListener("focusin", reveal));

  return tween;
}

function railDepth(stage: Stage, rail: gsap.core.Tween) {
  stage.$$(".project-card").forEach((card) => {
    gsap.fromTo(
      card,
      {
        rotationY: -24,
        scale: 0.9,
        transformPerspective: 1400,
        transformOrigin: "0% 50%",
      },
      {
        rotationY: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation: rail,
          start: "left right",
          end: "left 45%",
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      card.querySelector(
        ".city-map, .nutrition-word, .mail-decoration, .guess-title",
      ),
      { xPercent: 9 },
      {
        xPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation: rail,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      },
    );
  });

  // Cards lean into fast scrolling and spring upright when it stops.
  const lean = gsap.quickTo(".projects-grid", "skewX", {
    duration: 0.6,
    ease: "power3",
  });
  onVelocity((velocity) => {
    lean(gsap.utils.clamp(-5, 5, velocity / -250));
  });
}

export function setupProjects(stage: Stage) {
  curvedEdge(stage, "#projects");
  sectionTop(stage, "#projects");
  const heading = stage.$("#projects .section-heading h2");
  if (heading) headingReveal(heading);
  gsap.from("#projects .text-link", {
    x: -30,
    autoAlpha: 0,
    duration: 0.9,
    ease: "expo.out",
    scrollTrigger: {
      trigger: "#projects .text-link",
      start: "top 90%",
      once: true,
    },
  });

  const rail = stage.wide ? pinRail(stage) : undefined;
  if (rail) railDepth(stage, rail);
  stage.$$(".project-card").forEach((card, index) => {
    animateCard(card, index, rail);
  });
}
