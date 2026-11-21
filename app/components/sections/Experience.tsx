import { ArrowUpRight } from "lucide-react";
const experiences = [
  {
    company: "AuxioAI",
    title: "AI Applications Developer",
    duration: "OCT 2026 — PRESENT",
    description: [
      "Developing smarter scheduling for Alice, an AI voice agent for plumbers, with technician matching, job duration estimates, and returning-caller recognition.",
      "Shipped an LLM pipeline turning job transcripts into structured job recaps, CSVs, and invoice emails, achieving 100% accuracy across 150 evaluated fields."
    ],
    skills: ["Python", "FastAPI", "Pydantic", "Pandas", "OpenRouter"],
    kind: "INTELLIGENT SYSTEMS",
  },
  {
    company: "Ontario Power Generation",
    title: "Full Stack Developer",
    duration: "MAY 2026 — PRESENT",
    description: [
      "Shipped ConstHub, an oversight reporting platform, reducing manual processing 5x and saving $6M/year.",
      "Built an AI agent with 94% task completion across automated form filling and natural-language dashboard queries.",
      "Engineered a schema-driven form engine, digitizing 100+ workflows with versioned JSON/HTML templates and automated PDF report generation.",
      "Migrated 10K+ legacy forms and aggregated 250K+ records into interactive safety analytics.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Angular",
      "C#",
      "ASP.NET Core",
      "SQL",
      "Azure DevOps",
      "SSMS",
      "Docker",
      "Kubernetes",
      "LiteLLM",
      "OpenAI SDK"
    ],
    kind: "ENTERPRISE & PROJECT OFFICE APPLICATIONS",
  },
  {
    company: "Accelerate Alberta",
    title: "Software Developer",
    duration: "JAN 2026 — MAR 2026",
    description: [
      "Built and launched a production lead-capture and onboarding website, increasing online submissions by ~35%.",
      "Achieved a 95+ Lighthouse score and cut page load times from ~3s to ~1.2s through rendering and asset optimizations.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Resend",
      "Vercel",
    ],
    kind: "WEB DEVELOPMENT",
    link: "https://acceleratealberta.ca",
  },
];
// Figures like 500+, 5x, ~35%, ~1.2s, $6M/year and "150 evaluated" get
// highlighted and count up on reveal.
const METRIC =
  /(~?\$?\d+[KM]?(?:[+×%]|x\b|\/year)|~\d+(?:\.\d+)?s\b|\d+(?= evaluated))/;
function withMetrics(line: string) {
  return line.split(METRIC).map((part, i) =>
    i % 2 ? (
      <span className="metric" key={i}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
export default function Experience() {
  return (
    <section id="experience" className="experience light-section">
      <div className="section-top" data-reveal>
        <span className="eyebrow">01 / THE JOURNEY</span>
        <span className="eyebrow">REAL TEAMS. REAL IMPACT.</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Good code.
          <br />
          <span className="serif">Real-world impact.</span>
        </h2>
        <p>
          From energy infrastructure to AI automation,
          <br />I build software that makes people’s
          <br />
          everyday work a little better.
        </p>
      </div>
      <div className="experience-list">
        <div className="experience-line" />
        <span className="line-star" aria-hidden="true">
          ✳
        </span>
        {experiences.map((exp, i) => (
          <article className="experience-row" key={exp.company} data-reveal>
            <div className="experience-date">
              <span className="timeline-dot" />
              <span>{exp.duration}</span>
              <span className="experience-number">0{i + 1}</span>
            </div>
            <div className="experience-content">
              <p className="eyebrow experience-kind">{exp.kind}</p>
              <h3>
                <span className="company">{exp.company}</span>
                {exp.link && (
                  <a
                    href={exp.link}
                    aria-label="Visit Accelerate Alberta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight size={24} />
                  </a>
                )}
              </h3>
              <p className="experience-role">{exp.title}</p>
              <ul>
                {exp.description.map((line) => (
                  <li key={line}>{withMetrics(line)}</li>
                ))}
              </ul>
              <div className="tags">
                {exp.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="resume-strip" id="resume" data-reveal>
        <div>
          <span className="eyebrow">THE FULL STORY, ON PAPER.</span>
          <h3>Like what you’re seeing?</h3>
        </div>
        <div className="resume-paper" aria-hidden="true">
          <b>AL✳</b>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <a
          className="dark-button"
          href="/April_Li_Resume.pdf"
          download
          data-magnetic
        >
          Download my résumé <ArrowDownIcon />
        </a>
      </div>
    </section>
  );
}
function ArrowDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </svg>
  );
}
