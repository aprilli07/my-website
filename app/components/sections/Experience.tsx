"use client";

import { ExternalLink, Github } from "lucide-react";

export default function Experience() {
    const experiences = [
        {
            title: "Incoming Full Stack Developer",
            company: "Ontario Power Generation",
            duration: "May 2026 - Dec 2026",
            description: ["Incoming Spring 2026 & Fall 2026 "],
            skills: ["JavaScript", "Angular", "React", "C#", "Python", "Java", "C++", ".NET", "SQL"],
        },
        {
            title: "Incoming Full Stack Developer",
            company: "LeagueNav",
            duration: "Apr 2026 - Present",
            description: ["Redesigning and optimizing a Next.js and TypeScript website with improved layout, responsiveness, and component reusability to increase user engagement and experience."],
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Resend"],
        },
        {
            title: "Frontend Developer",
            company: "Accelerate Alberta",
            duration: "Jan 2026 - Mar 2026",
            description: ["Engineered a scalable lead generation pipeline with validated forms, API routes, and automated email delivery through Resend, achieving 100% submission reliability and improving conversion through optimized UX and CTAs",
                "Architected and launched an optimized marketing website using Next.js, React, and Tailwind CSS, designing reusable components and improving layout structure to reduce UI latency and improve interaction speed by 20%"
            ],
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Resend"],
            link: "https://acceleratealberta.ca",
            github: "https://github.com/aprilli07/AccelerateAlberta"
        },
        {
            title: "Software Developer",
            company: "UW Electrium Mobility - Request Platform Website",
            duration: "Oct 2025 - Dec 2025",
            description: ["Developed and optimized reusable UI components in Next.js and TypeScript, improving frontend maintainability and reducing unnecessary re-renders by 25% through refactored component structure and state management.", 
                        "Integrated Supabase (PostgreSQL) CRUD operations into the application’s data layer, improving backend–frontenddata synchronization and consistency by 20%."],
            skills: ["Next.js", "TypeScript", "CSS", "SupaBase", "Next Auth"],
            github:"https://github.com/Electrium-Mobility/Request-Platform",
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
                                  {exp.link && (
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-accent hover:opacity-80 transition-colors"
                                    >
                                        Live <ExternalLink size={14} />
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