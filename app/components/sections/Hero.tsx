import { ArrowDown, ArrowUpRight } from "lucide-react";

function OrbitalArt() {
  return (
    <div className="orbital-art" aria-hidden="true">
      <svg viewBox="0 0 520 520" fill="none">
        <defs>
          <radialGradient id="orb-glow">
            <stop stopColor="#82b7ff" stopOpacity=".16" />
            <stop offset="1" stopColor="#82b7ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="260" r="250" fill="url(#orb-glow)" />
        <circle
          className="orbit-pulse"
          cx="260"
          cy="260"
          r="217"
          strokeWidth="1"
        />
        <g stroke="#627799" strokeWidth=".7">
          <circle cx="260" cy="260" r="217" />
          <circle cx="260" cy="260" r="170" strokeDasharray="2 7" />
          <path d="M15 260h490M260 15v490" strokeDasharray="3 7" />
        </g>
        <g className="orbit-rotor" stroke="#82b7ff" strokeWidth="1.15">
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <ellipse
              key={angle}
              className="orbit-path"
              cx="260"
              cy="260"
              rx="216"
              ry="78"
              transform={`rotate(${angle} 260 260)`}
            />
          ))}
          <circle cx="260" cy="43" r="7" fill="#82b7ff" stroke="none" />
          <circle cx="260" cy="477" r="5" fill="#82b7ff" stroke="none" />
        </g>
        <g className="asterisk-rotor" fill="#82b7ff">
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
        </g>
        <circle cx="260" cy="260" r="22" fill="#141b2b" />
        <path d="m253 260 5 5 10-11" stroke="#82b7ff" strokeWidth="2" />
      </svg>
      <span className="orbit-label orbit-label-top">IDEAS IN ORBIT</span>
      <span className="orbit-label orbit-label-bottom">
        AL / ALWAYS EXPLORING
      </span>
      <span className="orbit-coordinate">
        43.4643° N<br />
        80.5204° W
      </span>
    </div>
  );
}

function HeroIris() {
  return (
    <div className="iris" aria-hidden="true">
      <svg className="iris-star" viewBox="-100 -100 200 200">
        <circle r="40" />
        {[0, 45, 90, 135].map((angle) => (
          <rect
            key={angle}
            x="-14"
            y="-94"
            width="28"
            height="188"
            rx="2"
            transform={`rotate(${angle})`}
          />
        ))}
      </svg>
      <p className="iris-statement">
        <span>A little curiosity.</span>
        <span className="serif">A lot of code.</span>
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="hero-stage">
      <section id="hero" className="hero">
        <div className="hero-kicker">
          <span className="eyebrow">
            <span className="status-dot" />{" "}
            <span className="scramble">OPEN TO NEW OPPORTUNITIES</span>
          </span>
          <span className="hero-location">BASED IN TORONTO / WATERLOO, CA</span>
        </div>
        <div className="hero-main">
          <div className="hero-heading">
            <p className="hero-intro">
              Hi, I’m April. I build things that matter.
            </p>
            <h1 className="hero-word" aria-label="April Li">
              {["A", "P", "R", "I", "L", "."].map((letter) => (
                <span
                  className={
                    letter === "." ? "hero-letter hero-period" : "hero-letter"
                  }
                  key={letter}
                >
                  <span>{letter}</span>
                </span>
              ))}
              <span className="sr-only"> Li</span>
            </h1>
            <div className="hero-role">
              <span>SOFTWARE DEVELOPER</span>
              <span className="small-star">✳</span>
              <span>CS @ WATERLOO</span>
            </div>
          </div>
          <OrbitalArt />
        </div>
        <div className="hero-bottom">
          <p>
            Turning complex problems into
            <br />
            thoughtful, useful digital experiences.
            <br />
            <span>A little curiosity. A lot of code.</span>
          </p>
          <a className="round-cta" href="#projects" data-magnetic>
            <ArrowUpRight size={30} />
            <span>
              EXPLORE
              <br />
              MY WORK
            </span>
          </a>
          <a href="#experience" className="scroll-cue">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={19} />
          </a>
        </div>
        <div className="hero-baseline">
          <span>PERSONAL PORTFOLIO</span>
          <span>DESIGNED TO KEEP EVOLVING ↗</span>
          <span>VOL. 2026</span>
        </div>
      </section>
      <HeroIris />
    </div>
  );
}
