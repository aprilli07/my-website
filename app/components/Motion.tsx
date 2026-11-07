"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "./motion/gsap";
import { createStage } from "./motion/stage";
import { setupHero } from "./motion/hero";
import { setupExperience } from "./motion/experience";
import { setupProjects } from "./motion/projects";
import { setupContact } from "./motion/contact";
import {
  setupChrome,
  setupNav,
  setupPointer,
  setupSmooth,
  setupTicker,
} from "./motion/global";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

export default function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const introPlayed = useRef(false);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const mm = gsap.matchMedia(element);
    if (!paused) {
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 900px) and (min-height: 620px)",
          fine: "(pointer: fine)",
        },
        (media) => {
          const { motion, wide, fine } = media.conditions ?? {};
          if (!motion) return;
          const stage = createStage(element, !!wide);
          // Pins are declared in page order so later offsets add up.
          setupSmooth(stage, !!fine);
          setupChrome();
          setupHero(stage, introPlayed.current);
          setupTicker();
          setupExperience(stage);
          setupProjects(stage);
          setupContact(stage);
          setupNav(stage);
          if (fine) setupPointer(stage);
          // Breakpoint changes and un-pausing shouldn't replay the entrance.
          gsap.delayedCall(3, () => {
            introPlayed.current = true;
          });
          return () => stage.cleanup();
        },
      );
    }
    document.documentElement.classList.remove("intro-pending");
    return () => mm.revert();
  }, [paused]);

  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div
        ref={root}
        className={paused ? "site-shell motion-paused" : "site-shell"}
      >
        <div className="preloader" aria-hidden="true">
          <div className="preloader-columns">
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <svg className="preloader-star" viewBox="0 0 520 520">
            {[0, 45, 90, 135].map((angle) => (
              <rect
                key={angle}
                x="246"
                y="166"
                width="28"
                height="188"
                rx="2"
                transform={`rotate(${angle} 260 260)`}
              />
            ))}
          </svg>
          <div className="preloader-meta">
            <span>APRIL LI / PORTFOLIO</span>
            <span className="preloader-count">000</span>
          </div>
        </div>
        <div className="cursor" aria-hidden="true">
          <span>VIEW</span>
        </div>
        {children}
      </div>
    </MotionContext.Provider>
  );
}
