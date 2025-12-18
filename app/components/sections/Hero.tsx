"use client";

export default function Hero() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="space-y-6 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                       Hi, I'm April, a <span className="text-accent">software engineer</span> 
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                        <a
                            href="#projects"
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