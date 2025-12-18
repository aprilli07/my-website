"use client";

export default function Experience() {
    const experiences = [
        {
            title: "Software Engineer",
            company: "Tech Corp",
            duration: "Jan 2020 - Present",
            description: "Developed and maintained web applications using React and Node.js.",
            skills: ["React", "Node.js", "TypeScript"]
        },
        {
            title: "Software Engineer",
            company: "Tech Corp",
            duration: "Jan 2020 - Present",
            description: "Developed and maintained web applications using React and Node.js.",
            skills: ["React", "Node.js", "TypeScript"]
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
                                <p className="text-accent">{exp.company}</p>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-nowrap">{exp.duration}</p>
                        </div>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
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