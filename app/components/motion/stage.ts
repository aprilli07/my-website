import { gsap, ScrollTrigger, SplitText } from "./gsap";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/✳";

/** Everything a section needs: scoped lookups, layout facts and teardown. */
export type Stage = {
  root: HTMLElement;
  /** Wide and tall enough for the pinned scenes. */
  wide: boolean;
  $: <T extends Element = HTMLElement>(selector: string) => T | null;
  $$: <T extends Element = HTMLElement>(selector: string) => T[];
  onCleanup: (cleanup: () => void) => void;
  cleanup: () => void;
};

export function createStage(root: HTMLElement, wide: boolean): Stage {
  const cleanups: (() => void)[] = [];
  return {
    root,
    wide,
    $: (selector) => root.querySelector(selector),
    $$: (selector) => Array.from(root.querySelectorAll(selector)),
    onCleanup: (cleanup) => cleanups.push(cleanup),
    cleanup: () => cleanups.splice(0).forEach((cleanup) => cleanup()),
  };
}

/** Decodes an element's own text. Elements holding markup are left alone. */
export function scramble(
  stage: Stage,
  element: HTMLElement,
  vars: gsap.TweenVars = {},
) {
  if (element.children.length) return gsap.timeline();
  const text = element.textContent ?? "";
  stage.onCleanup(() => {
    element.textContent = text;
  });
  gsap.set(element, { autoAlpha: 0 });
  return gsap.to(element, {
    duration: Math.min(1.5, 0.5 + text.length * 0.025),
    ease: "none",
    scrambleText: {
      text,
      chars: SCRAMBLE_CHARS,
      tweenLength: false,
      speed: 0.7,
    },
    onStart: () => {
      gsap.set(element, { autoAlpha: 1 });
    },
    ...vars,
  });
}

/** Splits into characters that tumble out of a mask, word by word. */
export function splitChars(target: HTMLElement, ignore?: string) {
  return SplitText.create(target, {
    type: "words,chars",
    mask: "words",
    wordsClass: "split-word",
    ignore: ignore ? gsap.utils.toArray(ignore, target) : undefined,
  });
}

export function headingReveal(heading: HTMLElement, ignore?: string) {
  const { chars } = splitChars(heading, ignore);
  return gsap.from(chars, {
    yPercent: 125,
    rotationZ: 14,
    rotationX: -70,
    transformOrigin: "0% 100%",
    stagger: 0.016,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: heading, start: "top 85%", once: true },
  });
}

/** Lines rise from behind their own baseline; re-splits when text rewraps. */
export function linesReveal(element: HTMLElement) {
  SplitText.create(element, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit: (split) =>
      gsap.from(split.lines, {
        yPercent: 110,
        stagger: 0.09,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      }),
  });
}

/** The section's top rule draws across while its labels decode. */
export function sectionTop(stage: Stage, section: string) {
  const top = stage.$(`${section} .section-top`);
  if (!top) return;
  const scrollTrigger = { trigger: top, start: "top 90%", once: true };
  gsap.fromTo(
    top,
    { "--rule": 0 },
    { "--rule": 1, duration: 1.3, ease: "power3.inOut", scrollTrigger },
  );
  Array.from(top.children).forEach((label, index) => {
    scramble(stage, label as HTMLElement, {
      delay: 0.15 + index * 0.2,
      scrollTrigger,
    });
  });
}

/** The incoming section's top edge bellies out, then pulls flat. */
export function curvedEdge(stage: Stage, section: string) {
  const edge = stage.$<SVGPathElement>(`${section} .edge path`);
  const owner = stage.$(section);
  if (!edge || !owner) return;
  gsap.fromTo(
    edge,
    { attr: { d: "M0 0H100V0Q50 10 0 0Z" } },
    {
      attr: { d: "M0 0H100V0Q50 0 0 0Z" },
      ease: "none",
      scrollTrigger: {
        trigger: owner,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    },
  );
}

export const onVelocity = (update: (velocity: number) => void) =>
  ScrollTrigger.create({ onUpdate: (self) => update(self.getVelocity()) });
