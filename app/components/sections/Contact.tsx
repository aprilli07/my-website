"use client";
import React from 'react';
import { useState } from 'react';
import { ArrowUpRight, Check, FileText, Github, Linkedin, LoaderCircle, Mail, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        setErrorMessage("");

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
            setErrorMessage("Something went wrong. Please try again or email me directly.");
        } finally {
            setIsSending(false);
        }
    };


    return (
        <section id="contact" className="scroll-mt-24 px-4 py-8 sm:px-6 sm:py-12">
            <div className="contact-panel mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-foreground text-background">
                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="relative p-7 sm:p-10 lg:p-14">
                        <div className="contact-orb absolute -left-32 -top-32 size-80 rounded-full" />
                        <div className="relative">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/55">03 / Contact</p>
                            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">Have an idea? Let&apos;s make it <span className="font-serif font-normal italic text-[#a9c3ff]">real.</span></h2>
                            <p className="mt-6 max-w-md leading-7 text-background/65">I&apos;m always interested in hearing about new opportunities or projects. Feel free to reach out!</p>

                            <div className="mt-10 space-y-2">
                                <ContactLink href="mailto:07april.li@gmail.com" icon={<Mail size={18} />} label="Email" value="07april.li@gmail.com" />
                                <ContactLink href="https://github.com/aprilli07" icon={<Github size={18} />} label="GitHub" value="github.com/aprilli07" external />
                                <ContactLink href="https://linkedin.com/in/07aprilli" icon={<Linkedin size={18} />} label="LinkedIn" value="linkedin.com/in/07aprilli" external />
                                <ContactLink href="/April_Li_Resume.pdf" icon={<FileText size={18} />} label="Résumé" value="Download PDF" download />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f7f5ef] p-7 text-foreground sm:p-10 lg:p-14">
                        <p className="mb-8 text-sm font-semibold">Send me a message</p>
                    {/* contact form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="contact-input"
                                placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="contact-input"
                                placeholder="you@email.com"
                            />
                          </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={7}
                                className="contact-input resize-none"
                                placeholder="Tell me a little about what you're working on..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSending}
                            className="primary-button inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSending ? <><LoaderCircle size={16} className="animate-spin" /> Sending...</> : <>Send message <Send size={15} /></>}
                        </button>
                        {submitted && (
                            <div role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-700"><Check size={16} /> Message sent! I&apos;ll get back to you soon.</div>
                        )}
                        {errorMessage && <div role="alert" className="text-sm font-medium text-red-700">{errorMessage}</div>}
                    </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ContactLink({ href, icon, label, value, external, download }: { href: string; icon: React.ReactNode; label: string; value: string; external?: boolean; download?: boolean }) {
    return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} download={download} className="contact-link group flex items-center gap-3 rounded-xl px-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/10 text-[#a9c3ff]">{icon}</span>
            <span className="min-w-0 flex-1"><span className="block text-[10px] uppercase tracking-[0.15em] text-background/45">{label}</span><span className="block truncate text-sm font-medium text-background/85">{value}</span></span>
            <ArrowUpRight size={15} className="text-background/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
    );
}
