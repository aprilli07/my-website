"use client";

import { ExternalLink, Github } from "lucide-react";

export default function Experience() {
    const experiences = [
        {
            title: "AI Applications Developer",
            company: "AuxioAI",
            duration: "Oct 2026 - Present",
            description: 
                [
                    "Developing LLM-powered automation workflows and optimizing lead-generation pipelines."
                ],
            skills: ["Python", "FastAPI", "Pydantic", "Pandas"]
        },
        {
            title: "Full Stack Developer",
            company: "Ontario Power Generation - Enterprise & Project Office Applications",
            duration: "May 2026 - Present",
            description: 
                [
                    "Shipped ConstHub for 500+ engineers, digitizing 100+ operational workflows with electronic forms and approvals.", 
                    "Reduced manual form processing by 5x with a schema-driven form engine using versioned JSON/HTML templates.", 
                    "Migrated 10K+ legacy forms and aggregated 250K+ records into interactive safety analytics covering criticality trends, deficiencies, and compliance metrics.", 
                    "Modernized Project Workbench from Angular to React/TypeScript and optimized .NET data access for 12K+ work orders, improving response times by 30%."
                ],
            skills: ["TypeScript", "Angular", "React", "C#", "ASP.NET Core", "SQL", "Azure DevOps", "SSMS", "Docker", "Kubernetes"],
        },
        {
            title: "Software Developer",
            company: "Accelerate Alberta",
            duration: "Jan 2026 - Mar 2026",
            description: 
                [
                    "Built and launched a production lead-capture and onboarding website, increasing online submissions by ∼35%.", 
                    "Achieved 95+ Lighthouse score and cut page load times from ∼3s to ∼1.2s through rendering and asset optimizations."
                ],
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Resend", "Vercel"],
            link: "https://acceleratealberta.ca"
        },
    ]

    return (
       <section id="experience" className="section-band scroll-mt-24 border-y border-foreground/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20 lg:px-8">
            <div>
                <p className="section-index">01 / Experience</p>
                <h2 className="section-title mt-4">Where I&apos;ve made an impact.</h2>
                <p className="mt-5 max-w-sm leading-7 text-muted-foreground">Building reliable products across energy, mobility, and technology teams.</p>
            </div>

            <div className="space-y-5">
                {experiences.map((exp, index) => (
                    <article key={index} className="experience-card group rounded-2xl border border-foreground/10 bg-card p-6 sm:p-8">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="mb-2 flex items-center gap-3"><span className="text-xs font-semibold text-accent">0{index + 1}</span><span className="h-px w-7 bg-accent/40" /></div>
                                <h3 className="text-xl font-semibold tracking-tight text-foreground">{exp.title}</h3>
                                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-medium text-accent">{exp.company}</p>
                                                                    
                                  {exp.link && (
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10"
                                    >
                                        Live <ExternalLink size={14} />
                                    </a>
                                  )}
                                </div>
                            </div>
                            <p className="rounded-full bg-foreground/5 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:whitespace-nowrap">{exp.duration}</p>
                        </div>
                            {Array.isArray(exp.description) ? (
                            <ul className="mb-6 space-y-3 text-sm leading-6 text-muted-foreground">
                                {exp.description.map((desc, i) => (
                                    <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.65rem] before:size-1.5 before:rounded-full before:bg-accent">{desc}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground mb-4">{exp.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1.5 border-t border-foreground/10 pt-5">
                            {exp.skills && exp.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-block rounded-md border border-foreground/8 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
       </section>
    )
}
