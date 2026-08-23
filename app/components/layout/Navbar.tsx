"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
            <nav className="nav-shell mx-auto max-w-6xl rounded-2xl border border-foreground/10 bg-background/85 px-4 py-3 shadow-[0_12px_40px_rgba(25,32,42,0.08)] backdrop-blur-xl sm:px-5">
                <div className="flex items-center justify-between gap-6">
                    <Link href="#hero" className="group flex items-center gap-3 no-underline" aria-label="April Li, back to top">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-xs font-bold tracking-[0.08em] text-background transition-transform group-hover:-rotate-3">AL</span>
                        <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">April Li</span>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-foreground transition-colors hover:bg-foreground/5 md:hidden"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <Link 
                            key={item.href}
                            href={item.href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href="/April_Li_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                        >
                            Résumé <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isOpen && (
                  <div className="mt-3 space-y-1 border-t border-foreground/10 pt-3 md:hidden">
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
                            {item.name}
                        </Link>
                    ))}
                    <a href="/April_Li_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-accent">
                        View résumé <ArrowUpRight size={14} />
                    </a>
                  </div>  
                )}
            </nav>
        </header>
    )
} 
