"use client";
import React from 'react';
import { useState } from 'react';
import { Mail, FileText } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send");

            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <section id="contact" className="border-b border-border">
            <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                    I'm always interested in hearing about new opportunities or projects. Feel free to reach out!
                </p>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* contact form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
                                placeholder="Your Message..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                        {submitted && (
                            <div className="text-sm text-accent font-medium">Message Sent! I'll get back to you soon.</div>
                        )}
                    </form>

                    {/* contact links */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-6">Other ways to reach me</h3>
                            <div className="space-y-6">
                                <a
                                    href="mailto:07april.li@gmail.com"
                                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
                                >
                                    <Mail size={20} className="text-accent group-hover:scale-110 transition-transform"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="text-foreground font-medium">07april.li@gmail.com</p>
                                    </div>
                                </a>
                                <a
                                    href="https://github.com/aprilli07"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
                                >
                                    <svg
                                        className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>

                                    <div>
                                        <p className="text-sm text-muted-foreground">GitHub</p>
                                        <p className="text-foreground font-medium">github.com/aprilli07</p>
                                    </div>
                                </a>
                                <a
                                    href="https://linkedin.com/in/07aprilli"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
                                >
                                    <svg
                                        className="w-5 h-5 text-accent group-hover:scale-110 transition-transform"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z"/>
                                    </svg>

                                    <div>
                                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                                        <p className="text-foreground font-medium">linkedin.com/in/07aprilli</p>
                                    </div>
                                </a>
                                <a
                                href="/April_Li_Resume.pdf"
                                download
                                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors group"
                                >
                                    <FileText size={20} className="text-accent group-hover:scale-110 transition-transform"/>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Resume</p>
                                        <p className="text-foreground font-medium">Download PDF</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    )
}