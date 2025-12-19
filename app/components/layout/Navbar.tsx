"use client";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Hero", href: "#hero" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    {/* { name: "Experience", href: "#experience" }, */}

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="#hero" className="text-xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors no-underline">
                        April Li
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navItems.map((item) => (
                            <Link 
                            key={item.href}
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isOpen && (
                  <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-border pt-4">
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                            {item.name}
                        </Link>
                    ))}
                  </div>  
                )}
            </nav>
        </header>
    )
} 