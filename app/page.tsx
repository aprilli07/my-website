import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Motion from "@/components/Motion";

const skills = [
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "JAVA",
  "C# / .NET",
  "SQL",
  "CURIOUS BY DEFAULT",
];
export default function Home() {
  return (
    <Motion>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main" tabIndex={-1}>
            <Hero />
            <div
              className="skills-ticker"
              aria-label={`Working with ${skills.slice(0, -1).join(", ")}`}
            >
              <div className="ticker-track" aria-hidden="true">
                {[0, 1].map((copy) => (
                  <div className="ticker-group" key={copy}>
                    {skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                        <i>✳</i>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </Motion>
  );
}
