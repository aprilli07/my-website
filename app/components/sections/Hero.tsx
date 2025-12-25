"use client";

import { TypeAnimation } from "react-type-animation";

export default function Hero() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="space-y-6 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                        Hey! I&apos;m April,
                        <br />
                        a{" "}
                        <span className="text-accent inline-block min-h-[4.5em]">
                        <TypeAnimation
                            sequence={[
                            "computer science student",
                            1500,
                            "software developer",
                            1500,
                            ]}
                            speed={50}
                            repeat={Infinity}
                        />
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                          I'm a first year computer science student at the University of Waterloo, focused on learning and building practical software development skills. 
                          I'm always seeking internships and new opportunities to apply my knowledge in real-world settings. 
                          Outside of school, I enjoy hiking, photography, and swimming!
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                        <a
                            href="/April_Li_Resume.pdf"
                            target="__blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
                        >
                            Resume
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>

            </div>

        </section>
    )
}