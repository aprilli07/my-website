"use client";

import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
    const projects = [
        {
            title: "CityWatch",
            description: "AI-powered city infrastructure monitoring and prediction mobile app.",
            tech: ["Python", "TensorFlow", "Keras", "scikit-learn", "OpenCV", "FastAPI", "PostgreSQL", "GeoPandas", "PostGIS"],
            github:"https://github.com/LegendaryArk/CityWatch"
        },
        {
            title: "NutriLens",
            description: "TechNova 2025 Hackathon. A mobile app that scans food items and provides nutritional information.",
            tech: ["React Native", "TypeScript", "Expo", "Node.js", "MySQL", "Gemini API"],
            github:"https://github.com/xzshinena/NutriLens"
        },
        {
            title: "MailGest",
            description: "A web app that summarizes and categories emails using AI.",
            tech: ["React", "Node.js", "Express", "MongoDB", "Redis", "GCP", "Gemini API", "OAuth"],
            link:"https://mail-gest.vercel.app/",
            github:"https://github.com/aprilli07/MailGest"
        },
        {
            title: "Guess Who",
            description: "A classic version of the Guess Who board game.",
            tech: ["Java", "Swing", "AWT"],
            github:"https://github.com/aprilli07/GuessWho"
        },
    ]

    return (
        <section id="projects" className="scroll-mt-24">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="section-index">02 / Selected work</p>
                        <h2 className="section-title mt-4 max-w-xl">Projects built to solve, learn, and explore.</h2>
                    </div>
                    <a href="https://github.com/aprilli07" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline">More on GitHub <ArrowUpRightIcon /></a>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <article key={index} className={`project-card group flex min-h-[290px] flex-col rounded-2xl border border-foreground/10 p-6 sm:p-7 ${index === 0 ? "md:col-span-2 md:min-h-[330px]" : ""}`}>
                            <div className="mb-12 flex items-start justify-between">
                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project 0{index + 1}</span>
                                <span className="flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/60 text-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRightIcon /></span>
                            </div>
                            <div className="mt-auto">
                            <h3 className={`${index === 0 ? "text-4xl sm:text-5xl" : "text-3xl"} font-semibold tracking-[-0.04em] text-foreground transition-colors group-hover:text-accent`}>{project.title}</h3>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{project.description}</p>

                            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-medium text-muted-foreground before:mr-1.5 before:text-accent before:content-['•']"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-5 border-t border-foreground/10 pt-5">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                                    >
                                        Live <ExternalLink size={14} />
                                    </a>
                            )}
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                                >
                                    Code <Github size={14} />
                                </a>
                            </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ArrowUpRightIcon() {
    return <ExternalLink size={15} aria-hidden="true" />;
}
