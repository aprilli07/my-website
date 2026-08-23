"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";

const heroPhrases = [
    "Hey! I’m April, a computer science student.",
    "Building useful software with care.",
];

function TypingHeadline() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const phrase = heroPhrases[phraseIndex];
    const visibleText = phrase.slice(0, characterCount);
    const careIndex = visibleText.indexOf("care");

    useEffect(() => {
        const atEnd = characterCount === phrase.length;
        const atStart = characterCount === 0;
        const delay = atEnd && !isDeleting ? 1800 : isDeleting ? 35 : 58;

        const timeout = window.setTimeout(() => {
            if (atEnd && !isDeleting) {
                setIsDeleting(true);
                return;
            }

            if (atStart && isDeleting) {
                setIsDeleting(false);
                setPhraseIndex((current) => (current + 1) % heroPhrases.length);
                return;
            }

            setCharacterCount((current) => current + (isDeleting ? -1 : 1));
        }, delay);

        return () => window.clearTimeout(timeout);
    }, [characterCount, isDeleting, phrase.length]);

    return (
        <>
            <span className="sr-only">Hey! I’m April, a computer science student building useful software with care.</span>
            <span aria-hidden="true">
                {careIndex === -1 ? visibleText : (
                    <>
                        {visibleText.slice(0, careIndex)}
                        <span className="font-serif font-normal italic text-accent">{visibleText.slice(careIndex)}</span>
                    </>
                )}
                <span className="typing-cursor" aria-hidden="true" />
            </span>
        </>
    );
}

export default function Hero() {
    return (
        <section id="hero" className="relative overflow-hidden pt-28 sm:pt-36">
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32">
                <div className="grid items-end gap-14 lg:grid-cols-[1.5fr_0.7fr] lg:gap-20">
                    <div className="animate-fade-in">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-xs font-semibold tracking-wide text-accent">
                            <Sparkles size={13} /> Open to new opportunities
                        </div>
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Software developer · CS student</p>
                        <h1 className="min-h-[4.8em] max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-foreground sm:min-h-[2.9em] sm:text-7xl lg:min-h-[2em] lg:text-[5.75rem]">
                            <TypingHeadline />
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                            I&apos;m April, a second year Computer Science student at the University of Waterloo. I turn complex problems into practical, thoughtful digital products.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                        <a
                            href="/April_Li_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-button inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background"
                        >
                            View résumé <ArrowUpRight size={16} />
                        </a>
                        <a
                            href="#contact"
                            className="secondary-button inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-background/60 px-5 py-3 text-sm font-semibold text-foreground"
                        >
                            Let&apos;s talk <ArrowDown size={16} />
                        </a>
                    </div>
                    </div>

                    <aside className="relative animate-fade-in-delay lg:pb-2">
                        <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2rem] bg-accent/10" />
                        <div className="rounded-[1.75rem] border border-foreground/10 bg-card/90 p-6 shadow-[0_24px_80px_rgba(25,32,42,0.10)] backdrop-blur sm:p-7">
                            <div className="flex items-center justify-between border-b border-foreground/10 pb-5">
                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Currently</span>
                                <span className="flex items-center gap-2 text-xs font-medium text-foreground"><span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" /> Available</span>
                            </div>
                            <div className="space-y-6 py-6">
                                <div>
                                    <p className="text-xs text-muted-foreground">Working as</p>
                                    <p className="mt-1 font-semibold leading-snug">Full Stack Developer at Ontario Power Generation</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Studying at</p>
                                    <p className="mt-1 font-semibold">University of Waterloo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-t border-foreground/10 pt-5 text-sm text-muted-foreground">
                                <MapPin size={15} className="text-accent" /> Toronto / Waterloo, Canada
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-foreground/10 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:mt-20">
                    <span>React</span><span>TypeScript</span><span>Java</span><span>Python</span><span>SQL</span>
                </div>
            </div>
        </section>
    )
}
