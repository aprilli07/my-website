"use client";

export default function Footer() {

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">© 2024 April Li. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}