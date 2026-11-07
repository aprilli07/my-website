import {
  ArrowUpRight,
  Github,
  ScanLine,
  Leaf,
  Mail,
  Sparkles,
  MapPin,
} from "lucide-react";
const projects = [
  {
    title: "CityWatch",
    category: "AI / URBAN INFRASTRUCTURE",
    description:
      "A smarter lens on the city. AI-powered infrastructure monitoring and prediction, built for the places we call home.",
    tech: ["Python", "TensorFlow", "FastAPI", "PostGIS"],
    github: "https://github.com/LegendaryArk/CityWatch",
    visual: "city",
  },
  {
    title: "NutriLens",
    category: "MOBILE / TECHNOVA 2025",
    description:
      "Know what’s on your plate. A mobile app that scans food and turns nutritional information into everyday understanding.",
    tech: ["React Native", "TypeScript", "Expo", "Gemini API"],
    github: "https://github.com/xzshinena/NutriLens",
    visual: "nutrition",
  },
  {
    title: "MailGest",
    category: "AI / PRODUCTIVITY",
    description:
      "Less inbox. More clarity. An AI-powered web app that summarizes and categorizes your emails.",
    tech: ["React", "Node.js", "MongoDB", "Gemini API"],
    github: "https://github.com/aprilli07/MailGest",
    link: "https://mail-gest.vercel.app/",
    visual: "mail",
  },
  {
    title: "Guess Who",
    category: "JAVA / A LITTLE NOSTALGIA",
    description:
      "A familiar game, built from scratch. Bringing the classic character-guessing board game to the desktop.",
    tech: ["Java", "Swing", "AWT"],
    github: "https://github.com/aprilli07/GuessWho",
    visual: "game",
  },
];
const ROADS = [
  "M-20 90 620 270",
  "M70-20 250 370",
  "M400-20 340 370",
  "M-20 290 620 30",
];
function ProjectVisual({ type }: { type: string }) {
  if (type === "city")
    return (
      <div
        className="project-visual city-visual"
        data-scene="city"
        aria-hidden="true"
      >
        <div className="city-map">
          <svg viewBox="0 0 600 350">
            {["#b3b7a8", "#f3f1e6"].map((stroke, layer) => (
              <g
                className="city-roads"
                fill="none"
                stroke={stroke}
                strokeWidth={layer ? 12 : 18}
                key={stroke}
              >
                {ROADS.map((road) => (
                  <path d={road} key={road} />
                ))}
              </g>
            ))}
            <path
              className="city-river"
              d="M0 160q140 110 300 15T600 230"
              fill="none"
              stroke="#94ad97"
              strokeWidth="38"
            />
            <g className="city-buildings" fill="#a9ae9c">
              {Array.from({ length: 16 }, (_, i) => (
                <rect
                  key={i}
                  x={35 + (i % 4) * 150}
                  y={25 + Math.floor(i / 4) * 85}
                  width="42"
                  height="25"
                  rx="3"
                  transform={`rotate(16 ${55 + (i % 4) * 150} ${40 + Math.floor(i / 4) * 85})`}
                />
              ))}
            </g>
          </svg>
          <span className="map-marker marker-one">
            <MapPin size={20} />
          </span>
          <span className="map-marker marker-two">
            <MapPin size={17} />
          </span>
          <span className="map-marker marker-three">
            <MapPin size={17} />
          </span>
        </div>
        <div className="visual-floating city-label">
          <span className="visual-logo">
            <span className="status-dot" /> CityWatch
          </span>
          <span>BETTER DATA. BETTER CITIES.</span>
        </div>
        <span className="visual-caption">CONCEPT VISUAL / 01</span>
      </div>
    );
  if (type === "nutrition")
    return (
      <div
        className="project-visual nutrition-visual"
        data-scene="nutrition"
        aria-hidden="true"
      >
        <span className="nutrition-word">
          good
          <br />
          <i>for you.</i>
        </span>
        <div className="nutrition-phone">
          <div className="phone-notch" />
          <div className="phone-logo">
            <Leaf size={15} /> NutriLens
          </div>
          <div className="scan-window">
            <div className="orange-fruit">
              <span />
            </div>
            <ScanLine className="scan-frame" size={114} strokeWidth={0.6} />
            <span className="scan-beam" />
          </div>
          <span className="phone-small">A FRESH PERSPECTIVE</span>
          <strong>Food, understood.</strong>
          <div className="phone-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="scan-button">
            Scan. Learn. Enjoy. <ArrowUpRight size={12} />
          </span>
        </div>
        <span className="visual-caption">CONCEPT VISUAL / 02</span>
      </div>
    );
  if (type === "mail")
    return (
      <div
        className="project-visual mail-visual"
        data-scene="mail"
        aria-hidden="true"
      >
        <div className="mail-decoration">@</div>
        <div className="mail-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <b>mailgest</b>
            <Sparkles size={13} />
          </div>
          <div className="mail-window-body">
            <p>
              Your inbox, <i>with perspective.</i>
            </p>
            {[
              "The important stuff",
              "A little inspiration",
              "Everything else",
            ].map((line, i) => (
              <div className="fake-mail" key={line}>
                <span>
                  <Mail size={14} />
                </span>
                <div>
                  <strong>{line}</strong>
                  <i />
                </div>
                <span className="mail-badge">
                  {["Focus", "Read", "Sorted"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="visual-caption">CONCEPT VISUAL / 03</span>
      </div>
    );
  return (
    <div
      className="project-visual game-visual"
      data-scene="game"
      aria-hidden="true"
    >
      <div className="guess-title">
        GUESS <i>WHO?</i>
        <span>ONE QUESTION AT A TIME.</span>
      </div>
      <div className="face-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div className={`face-card face-${i}`} key={i}>
            <div className="face-hair" />
            <div className="face-head">
              <span className="face-eyes">• •</span>
              <span className="face-mouth" />
            </div>
            <div className="face-shirt" />
            <span className="face-card-label">
              {["?", "?", "?", "?", "?", "?", "?", "?"][i]}
            </span>
          </div>
        ))}
      </div>
      <span className="visual-caption">CONCEPT VISUAL / 04</span>
    </div>
  );
}
export default function Projects() {
  return (
    <section id="projects" className="projects">
      <svg
        className="edge"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H100V0Q50 0 0 0Z" />
      </svg>
      <div className="section-top" data-reveal>
        <span className="eyebrow">02 / SELECTED WORK</span>
        <span className="eyebrow">CURIOSITY, PUT INTO PRACTICE.</span>
      </div>
      <div className="projects-rail">
        <div className="section-heading" data-reveal>
          <h2>
            Made to solve.
            <br />
            <span className="serif">Built to explore.</span>
          </h2>
          <a
            className="text-link"
            href="https://github.com/aprilli07"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article className="project-card" key={project.title} data-reveal>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-visual-link"
                aria-label={`Explore ${project.title} on GitHub`}
              >
                <ProjectVisual type={project.visual} />
                <span className="project-open">
                  <ArrowUpRight size={24} />
                </span>
              </a>
              <div className="project-meta">
                <span className="eyebrow">{project.category}</span>
                <span className="eyebrow">0{i + 1}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                  >
                    <Github size={17} />
                  </a>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="rail-hud" aria-hidden="true">
        <span className="rail-count">
          <b>01</b> / 04
        </span>
        <div className="rail-bar">
          <i />
        </div>
        <span>KEEP SCROLLING →</span>
      </div>
    </section>
  );
}
