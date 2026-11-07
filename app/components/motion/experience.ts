import { gsap } from "./gsap";
import {
  headingReveal,
  linesReveal,
  scramble,
  sectionTop,
  splitChars,
  type Stage,
} from "./stage";

/** Rolls a metric such as "~35%" or "10K+" up from zero to its printed value. */
function countUp(metric: HTMLElement) {
  const text = metric.textContent ?? "";
  const [, prefix, digits, suffix] = text.match(/^(\D*)(\d+)(.*)$/) ?? [];
  if (!digits) return gsap.timeline();
  gsap.set(metric, { minWidth: metric.offsetWidth });
  const value = { current: 0 };
  return gsap.to(value, {
    current: Number(digits),
    duration: 1.2,
    ease: "power3.out",
    onUpdate: () => {
      metric.textContent = `${prefix}${Math.round(value.current)}${suffix}`;
    },
  });
}

function row(stage: Stage, element: HTMLElement) {
  const within = (selector: string) =>
    element.querySelector<HTMLElement>(selector);
  const date = within(".experience-date > span:nth-of-type(2)");
  const kind = within(".experience-kind");
  const company = within(".company");
  const dot = within(".timeline-dot");

  const timeline = gsap.timeline({
    defaults: { ease: "expo.out" },
    scrollTrigger: { trigger: element, start: "top 70%", once: true },
  });
  timeline
    .from(dot, { scale: 0, duration: 0.6, ease: "back.out(5)" }, 0)
    .to(dot, { backgroundColor: "#3979ed", duration: 0.3 }, 0.1)
    .from(
      within(".experience-number"),
      {
        yPercent: 90,
        rotationX: -90,
        transformPerspective: 500,
        autoAlpha: 0,
        duration: 1,
      },
      0.05,
    );
  if (date) timeline.add(scramble(stage, date), 0.1);
  if (kind) timeline.add(scramble(stage, kind), 0.15);
  if (company) {
    timeline.from(
      splitChars(company).chars,
      { yPercent: 120, rotationZ: 10, stagger: 0.016, duration: 0.9 },
      0.15,
    );
  }
  timeline
    .from(
      within(".experience-role"),
      { clipPath: "inset(0 100% 0 0)", x: -14, duration: 0.8 },
      0.35,
    )
    .from(
      element.querySelectorAll("li"),
      {
        clipPath: "inset(0 100% 0 0)",
        x: -30,
        stagger: 0.1,
        duration: 1.1,
        ease: "power3.out",
      },
      0.45,
    )
    .from(
      element.querySelectorAll(".tags span"),
      {
        scale: 0,
        rotation: () => gsap.utils.random(-25, 25),
        stagger: { each: 0.035, from: "random" },
        duration: 0.6,
        ease: "back.out(2.4)",
      },
      0.65,
    );

  element.querySelectorAll<HTMLElement>(".metric").forEach((metric, index) => {
    const at = 0.7 + index * 0.12;
    timeline
      .fromTo(
        metric,
        { "--mark": "0%" },
        { "--mark": "100%", duration: 0.8, ease: "power2.inOut" },
        at,
      )
      .add(countUp(metric), at);
  });
}

/** The line draws down the page, carried by a spinning star. */
function journey(stage: Stage) {
  const list = stage.$(".experience-list");
  const star = stage.$(".line-star");
  if (!list || !star) return;
  const scrollTrigger = {
    trigger: list,
    start: "top 70%",
    end: "bottom 70%",
    scrub: 0.6,
    invalidateOnRefresh: true,
  };
  gsap.from(".experience-line", { scaleY: 0, ease: "none", scrollTrigger });
  gsap.set(star, { autoAlpha: 1, xPercent: -50, yPercent: -50 });
  gsap.to(star, {
    y: () => list.offsetHeight,
    rotation: 1080,
    ease: "none",
    scrollTrigger,
  });
}

function resume(stage: Stage) {
  const strip = stage.$(".resume-strip");
  if (!strip) return;
  const scrollTrigger = { trigger: strip, start: "top 88%", once: true };
  const eyebrow = strip.querySelector<HTMLElement>(".eyebrow");
  if (eyebrow) scramble(stage, eyebrow, { scrollTrigger });

  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger })
    .from(strip.querySelector("h3"), {
      clipPath: "inset(0 100% 0 0)",
      x: -30,
      duration: 1,
    })
    .from(
      ".resume-paper",
      { y: 130, rotation: -26, duration: 1.3, ease: "back.out(1.5)" },
      0.1,
    )
    .from(
      ".resume-paper i",
      {
        scaleX: 0,
        transformOrigin: "0% 50%",
        stagger: 0.07,
        duration: 0.7,
      },
      0.5,
    )
    .from(
      ".resume-strip .dark-button",
      {
        x: -40,
        rotation: -6,
        autoAlpha: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
      },
      0.3,
    );
}

export function setupExperience(stage: Stage) {
  sectionTop(stage, "#experience");
  const heading = stage.$("#experience .section-heading h2");
  const lede = stage.$("#experience .section-heading > p");
  if (heading) headingReveal(heading);
  if (lede) linesReveal(lede);
  journey(stage);
  stage.$$(".experience-row").forEach((element) => row(stage, element));
  resume(stage);
}
