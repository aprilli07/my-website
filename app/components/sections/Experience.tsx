"use client";

import { Github } from "lucide-react";

export default function Experience() {
    const experiences = [
        {
            title: "Software Developer",
            company: "UW Electrium Mobility - Request Platform Website",
            duration: "Oct 2025 - Present",
            description: ["Developed and optimized reusable UI components in Next.js and TypeScript, improving frontend maintainability and reduced duplicate code across the platform.", 
                        "Improved UI performance by refactoring component structure and state management, reducing unnecessary re-renders and improving responsiveness.",
                        "Collaborated with other developers to debug, refine, and streamline core UI workflows, contributing to feature planning discussions and improving overall user experience."],
            skills: ["Next.js", "TypeScript", "CSS", "SupaBase", "Next Auth"],
            github:"https://github.com/Electrium-Mobility/Request-Platform",
        },
        {
            title: "Coach & Lifeguard",
            company: "Richmond Hill Lifesaving Club",
            duration: "Apr 2023 - Aug 2025",
            description: ["Coached 100+ youth swimmers in lifesaving sport, contributing to strong competitive results and multiple podium finishes.",
                        "Led practices and competitions, developing strong leadership, communication, and time-management skills."],
        },
    ]

    return (
       <section id="experience" className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight mb-12">Experience</h2>

            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="pb-8 border-b border-border last:border-b-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                                <div className="flex items-center gap-2">
                                  <p className="text-accent">{exp.company}</p>
                                  {exp.github && (
                                    <a 
                                        href={exp.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:opacity-80 transition-colors"
                                        aria-label="GitHub repository"
                                    >
                                      <Github size={16} />
                                    </a>
                                  )}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-nowrap">{exp.duration}</p>
                        </div>
                            {Array.isArray(exp.description) ? (
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                                {exp.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground mb-4">{exp.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {exp.skills && exp.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-block px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </section>
    )
}