"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Pause, Play } from "lucide-react";
import { useMotion } from "../Motion";
import { gsap } from "../motion/gsap";

const links = [
  { href: "#experience", name: "Experience" },
  { href: "#projects", name: "Projects" },
  { href: "#contact", name: "Contact" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { paused, toggle } = useMotion();
  const mobileNav = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (!open || paused || !mobileNav.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeline = gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(mobileNav.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        clearProps: "clipPath",
      })
      .from(
        mobileNav.current.children,
        { x: -44, autoAlpha: 0, stagger: 0.07, duration: 0.7 },
        0.1,
      );
    return () => {
      timeline.revert();
    };
  }, [open, paused]);
  return (
    <header className="site-header">
      <div className="scroll-progress" />
      <nav className="nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#hero" aria-label="April Li, home">
          A<span className="wordmark-star">✳</span>L
          <span className="wordmark-dot">.</span>
        </a>
        <span className="nav-caption">DEVELOPER &amp; CURIOUS HUMAN</span>
        <div className="desktop-nav">
          <span className="nav-marker" aria-hidden="true">
            ✳
          </span>
          {links.map((link, i) => (
            <a href={link.href} key={link.href}>
              <sup>0{i + 1}</sup>
              <span className="nav-label">{link.name}</span>
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="motion-toggle"
            onClick={toggle}
            aria-label={paused ? "Enable animations" : "Pause animations"}
            aria-pressed={paused}
            title={paused ? "Enable animations" : "Pause animations"}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <a
            href="/April_Li_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
            data-magnetic
          >
            Résumé <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div id="mobile-nav" className="mobile-nav" ref={mobileNav}>
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span>0{i + 1}</span>
                {link.name}
                <ArrowUpRight />
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
