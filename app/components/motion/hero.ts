import { gsap, SplitText } from "./gsap";
import { scramble, type Stage } from "./stage";

const STAR_SIZE = 240;
const SEEN_KEY = "al-intro";

/**
 * First visit: a blue curtain, a star counting to 100, then the curtain lifts
 * and that same star flies into its place at the centre of the orbital art.
 */
function curtain(stage: Stage, timeline: gsap.core.Timeline) {
  const preloader = stage.$(".preloader");
  const star = stage.$<SVGSVGElement>(".preloader-star");
  const count = stage.$(".preloader-count");
  const art = stage.$(".orbital-art");
  const seen = document.documentElement.classList.contains("intro-seen");
  if (!preloader || !star || !count || !art || seen) return false;

  // Measured here, before any of the hero's tweens transform the art.
  const target = art.getBoundingClientRect();
  const dx = target.left + target.width / 2 - innerWidth / 2;
  const dy = target.top + target.height / 2 - innerHeight / 2;
  const progress = { value: 0 };

  gsap.set(".asterisk-rotor", { autoAlpha: 0 });
  timeline
    .from(".preloader-star rect", {
      scaleY: 0,
      svgOrigin: "260 260",
      stagger: 0.14,
      duration: 0.9,
      ease: "back.out(2)",
    })
    .to(star, { rotation: 180, duration: 1.5, ease: "power2.inOut" }, 0)
    .to(
      progress,
      {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          count.textContent = String(Math.round(progress.value)).padStart(
            3,
            "0",
          );
        },
      },
      0,
    )
    .addLabel("lift", "+=0.05")
    .to(".preloader-meta", { autoAlpha: 0, duration: 0.3 }, "lift")
    .to(
      ".preloader-columns > span",
      {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "center" },
      },
      "lift",
    )
    .to(
      star,
      {
        x: dx,
        y: dy,
        scale: target.width / STAR_SIZE,
        rotation: 540,
        fill: "#82b7ff",
        duration: 1.15,
        ease: "power4.inOut",
      },
      "lift",
    )
    .call(
      () => {
        gsap.set(".asterisk-rotor", { autoAlpha: 1 });
        gsap.set(preloader, { display: "none" });
        document.documentElement.classList.add("intro-seen");
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // Private windows may refuse storage; the curtain just replays.
        }
      },
      undefined,
      "lift+=1.15",
    );
  return true;
}

function intro(stage: Stage, replay: boolean) {
  const timeline = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: () => {
      gsap.set(".hero-word", { overflow: "visible" });
    },
  });
  const curtained = !replay && curtain(stage, timeline);
  const at = (offset: number) =>
    curtained ? `lift+=${0.3 + offset}` : 0.1 + offset;

  timeline
    .from(
      ".hero-letter > span",
      {
        yPercent: 135,
        rotationX: -110,
        rotationZ: -14,
        scale: 0.6,
        transformPerspective: 900,
        stagger: 0.08,
        duration: 1.5,
      },
      at(0),
    )
    .from(
      SplitText.create(".hero-intro", { type: "words", mask: "words" }).words,
      { yPercent: 110, stagger: 0.04, duration: 0.9 },
      at(0.2),
    );

  if (!curtained) {
    timeline
      .from(
        ".orbital-art",
        { scale: 0.2, rotation: -160, duration: 1.8, ease: "expo.out" },
        0.1,
      )
      .from(
        ".asterisk-rotor rect",
        {
          scaleY: 0,
          svgOrigin: "260 260",
          stagger: 0.12,
          duration: 1.2,
          ease: "back.out(1.8)",
        },
        0.3,
      );
  }

  stage
    .$$(
      ".hero-kicker .scramble, .hero-location, .hero-role > span:not(.small-star), .orbit-label, .hero-baseline span",
    )
    .forEach((label, index) => {
      timeline.add(scramble(stage, label), at(0.25 + index * 0.05));
    });

  timeline
    .from(
      ".small-star",
      { scale: 0, rotation: -270, duration: 1, ease: "back.out(2)" },
      at(0.5),
    )
    .from(
      ".hero-bottom > *",
      { y: 40, autoAlpha: 0, rotationX: -25, stagger: 0.1, duration: 1 },
      at(0.6),
    );

  stage.$$<SVGGeometryElement>(".orbit-path").forEach((path, index) => {
    timeline.fromTo(
      path,
      { drawSVG: "50% 50%" },
      { drawSVG: "0% 100%", duration: 1.5, ease: "power2.inOut" },
      at(0.05 + index * 0.08),
    );
  });

  if (replay) timeline.progress(1);
}

function idle() {
  gsap.to(".orbit-rotor", {
    rotation: 360,
    duration: 32,
    repeat: -1,
    ease: "none",
    svgOrigin: "260 260",
  });
  gsap.to(".asterisk-rotor", {
    rotation: -360,
    duration: 20,
    repeat: -1,
    ease: "none",
    svgOrigin: "260 260",
  });
  gsap.fromTo(
    ".orbit-pulse",
    { scale: 0.55, opacity: 0.65 },
    {
      scale: 1.14,
      opacity: 0,
      duration: 3.2,
      repeat: -1,
      ease: "power1.out",
      svgOrigin: "260 260",
    },
  );
}

/** Scrolling tears the name apart and dives through the star. */
function dive(stage: Stage) {
  const hero = stage.$(".hero-stage");
  const heroMain = stage.$(".hero-main");
  const art = stage.$(".orbital-art");
  if (!hero || !heroMain || !art) return;

  const centre = () => {
    const bounds = hero.getBoundingClientRect();
    const main = heroMain.getBoundingClientRect();
    return {
      x: main.left - bounds.left + art.offsetLeft + art.offsetWidth / 2,
      y: main.top - bounds.top + art.offsetTop + art.offsetHeight / 2,
    };
  };

  const place = () => {
    const { x, y } = centre();
    gsap.set(".iris-star", { left: x, top: y });
  };
  place();
  gsap.set(".iris-star", {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    force3D: false,
  });

  const statement = SplitText.create(".iris-statement", {
    type: "words",
    mask: "words",
    wordsClass: "split-word",
  });

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: hero,
        start: "clamp(bottom bottom)",
        end: "+=190%",
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onRefresh: place,
      },
    })
    .to(
      ".hero-letter",
      {
        yPercent: gsap.utils.wrap([-90, 70, -130, 110, -60, 140]),
        xPercent: gsap.utils.wrap([-50, 30, -20, 40, -30, 60]),
        rotation: gsap.utils.wrap([-24, 18, -40, 32, -14, 60]),
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.7,
        ease: "power2.in",
      },
      0,
    )
    .to(
      ".hero-intro, .hero-role, .hero-kicker, .hero-bottom > *, .hero-baseline",
      { y: -50, autoAlpha: 0, stagger: 0.03, duration: 0.5, ease: "power2.in" },
      0,
    )
    .to(
      ".orbital-art > svg",
      { rotation: 150, scale: 1.3, duration: 1.1, ease: "power1.in" },
      0,
    )
    .to(".orbit-label, .orbit-coordinate", { autoAlpha: 0, duration: 0.3 }, 0)
    .set(".iris", { autoAlpha: 1 }, 0.3)
    .to(
      ".iris-star",
      {
        scale: () => (Math.hypot(innerWidth, innerHeight) / 40) * 1.25,
        rotation: 200,
        duration: 1.2,
        ease: "power3.in",
      },
      0.3,
    )
    .from(
      statement.words,
      { yPercent: 115, stagger: 0.08, duration: 0.5, ease: "power2.out" },
      1.45,
    )
    .to({}, { duration: 0.5 });
}

/** Phones keep native flow, so the hero drifts apart without a pin. */
function drift() {
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    })
    .to(
      ".hero-letter",
      {
        yPercent: gsap.utils.wrap([-30, 15, -45, 25, -20, 35]),
        rotation: gsap.utils.wrap([-8, 6, -12, 10, -5, 14]),
      },
      0,
    )
    .to(".orbital-art > svg", { rotation: 110, scale: 1.12, yPercent: -12 }, 0)
    .to(".hero-role", { x: 20 }, 0);
}

export function setupHero(stage: Stage, replay: boolean) {
  intro(stage, replay);
  idle();
  if (stage.wide) dive(stage);
  else drift();
}
