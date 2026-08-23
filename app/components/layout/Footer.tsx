"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {

    return (
        <footer className="bg-background">
            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                    <div>
                        <p className="text-sm font-semibold text-foreground">April Li</p>
                        <p className="mt-1 text-xs text-muted-foreground">© {new Date().getFullYear()} · Designed &amp; built with care.</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <a href="https://github.com/aprilli07" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                            GitHub ↗
                        </a>
                        <a href="https://www.linkedin.com/in/07aprilli" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                            LinkedIn ↗
                        </a>
                        <a href="#hero" aria-label="Back to top" className="ml-2 flex size-9 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-colors hover:bg-foreground hover:text-background"><ArrowUp size={15} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
