import { gsap, SplitText } from "./gsap";
import {
  curvedEdge,
  headingReveal,
  linesReveal,
  sectionTop,
  type Stage,
} from "./stage";

function heading(stage: Stage) {
  const title = stage.$(".contact-heading h2");
  const word = stage.$(".contact-heading .serif");
  if (!title || !word) return;
  headingReveal(title, ".serif, .contact-star");
  const scrollTrigger = { trigger: title, start: "top 75%", once: true };

  // The greeting tries on a few languages before it settles.
  const original = word.textContent ?? "";
  stage.onCleanup(() => {
    word.textContent = original;
  });
  const timeline = gsap.timeline({ scrollTrigger });
  ["hola.", "salut.", "ciao.", original].forEach((text, index) => {
    timeline.to(
      word,
      {
        duration: 0.55,
        ease: "none",
        scrambleText: { text, chars: "lowerCase", speed: 0.9 },
      },
      index ? "+=0.15" : 0.3,
    );
  });

  gsap.fromTo(
    ".contact-star",
    { scale: 0, rotation: -240 },
    {
      scale: 1,
      rotation: 0,
      duration: 1.4,
      ease: "back.out(2.2)",
      scrollTrigger,
    },
  );
}

function info(stage: Stage) {
  const lede = stage.$(".contact-info > p");
  if (lede) linesReveal(lede);

  const email = stage.$(".email-row > a");
  const address = stage.$(".email-text");
  if (email && address) {
    const { chars } = SplitText.create(address, { type: "chars" });
    gsap.from(chars, {
      yPercent: 60,
      autoAlpha: 0,
      stagger: 0.018,
      duration: 0.7,
      ease: "back.out(2)",
      scrollTrigger: { trigger: email, start: "top 90%", once: true },
    });
    const wave = () => {
      gsap.to(chars, {
        keyframes: { y: [0, -9, 0] },
        duration: 0.5,
        stagger: 0.014,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    };
    email.addEventListener("pointerenter", wave);
    stage.onCleanup(() => email.removeEventListener("pointerenter", wave));
  }

  gsap.from(".social-links a, .contact-note", {
    y: 26,
    autoAlpha: 0,
    stagger: 0.09,
    duration: 0.9,
    ease: "expo.out",
    scrollTrigger: { trigger: ".social-links", start: "top 92%", once: true },
  });
}

function form(stage: Stage) {
  const element = stage.$(".contact-form");
  if (!element) return;
  gsap
    .timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: { trigger: element, start: "top 82%", once: true },
    })
    .from(".contact-form label", {
      y: 24,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
    })
    .from(
      ".contact-form input, .contact-form textarea",
      {
        clipPath: "inset(0 100% 0 0)",
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.inOut",
        clearProps: "clipPath",
      },
      0.1,
    )
    .from(
      ".contact-form > .dark-button",
      {
        scaleX: 0,
        transformOrigin: "0% 50%",
        duration: 1,
        ease: "power4.inOut",
      },
      0.35,
    );
}

function footer(stage: Stage) {
  curvedEdge(stage, ".footer");
  const name = stage.$(".footer-text");
  if (!name) return;
  const { chars } = SplitText.create(name, { type: "chars", mask: "chars" });
  const scrollTrigger = {
    trigger: ".footer",
    start: "top 95%",
    end: "bottom bottom",
    scrub: 0.7,
  };
  gsap.from(chars, {
    yPercent: 105,
    rotation: 8,
    stagger: 0.06,
    ease: "none",
    scrollTrigger,
  });
  gsap.from(".footer-name > span:last-child", {
    rotation: -360,
    scale: 0.3,
    ease: "none",
    scrollTrigger,
  });
}

export function setupContact(stage: Stage) {
  curvedEdge(stage, "#contact");
  sectionTop(stage, "#contact");
  heading(stage);
  info(stage);
  form(stage);
  footer(stage);
}
