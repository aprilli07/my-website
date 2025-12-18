"use client";

import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
    const projects = [
        {
            title: "Software Engineer",
            description: "Developed and maintained web applications using React and Node.js.",
            tech: ["React", "Node.js", "TypeScript"],
            link:"#",
            github:"#"
        },
        {
            title: "Software Engineer",
            description: "Developed and maintained web applications using React and Node.js.",
            tech: ["React", "Node.js", "TypeScript"],
            link:"#",
            github:"#"
        }
    ]

    return (
        <section id="projects" className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight mb-12">Projects</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <div key={index} className="group rounded-lg border border-border p-6 hover:bg-muted transition-colors">
                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 rounded bg-background border border-border text-muted-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-border">
                                <a
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent transition-colors"
                                >
                                    Live <ExternalLink size={14} />
                                </a>
                                <a
                                    href={project.github}
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent transition-colors"
                                >
                                    Code <Github size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}