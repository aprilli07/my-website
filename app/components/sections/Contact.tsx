"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  LoaderCircle,
  Copy,
} from "lucide-react";
import { useMotion } from "../Motion";
import { starBurst } from "../motion/burst";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [copied, setCopied] = useState(false);
  const { paused } = useMotion();
  const sendButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (status !== "sent" || paused || !sendButton.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    starBurst(sendButton.current);
  }, [status, paused]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Send failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("07april.li@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <section id="contact" className="contact light-section">
      <svg
        className="edge"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H100V0Q50 0 0 0Z" />
      </svg>
      <div className="section-top" data-reveal>
        <span className="eyebrow">03 / WHAT’S NEXT?</span>
        <span className="eyebrow">
          <span className="status-dot" /> LET’S MAKE SOMETHING GOOD.
        </span>
      </div>
      <div className="contact-heading" data-reveal>
        <h2>
          Great things start
          <br />
          with a <span className="serif">hello.</span>
          <span className="contact-star" aria-hidden="true">
            ✳
          </span>
        </h2>
      </div>
      <div className="contact-grid">
        <div className="contact-info" data-reveal>
          <p>
            Have an interesting problem, a new opportunity,
            <br />
            or just a good story? I’d love to hear it.
          </p>
          <div className="email-row">
            <a href="mailto:07april.li@gmail.com">
              <span className="email-text">07april.li@gmail.com</span>
              <ArrowUpRight size={24} />
            </a>
            <button
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <span className="copy-status" role="status">
            {copied ? "Email copied to clipboard." : ""}
          </span>
          <div className="social-links">
            <a
              href="https://github.com/aprilli07"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              GitHub <ArrowUpRight size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/07aprilli"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              LinkedIn <ArrowUpRight size={17} />
            </a>
            <a
              href="/April_Li_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              Résumé <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-note">
            <span>
              BASED IN CANADA.
              <br />
              THINKING BEYOND BORDERS.
            </span>
            <span>↗</span>
          </div>
        </div>
        <form onSubmit={submit} className="contact-form" data-reveal>
          <div className="form-pair">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="Ada Lovelace"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              Your email
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ada@example.com"
                required
                maxLength={254}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>
          <label>
            What’s on your mind?
            <textarea
              name="message"
              placeholder="Tell me a little about it…"
              required
              rows={4}
              maxLength={5000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button
            ref={sendButton}
            className="dark-button"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                Sending <LoaderCircle className="sending-icon" size={18} />
              </>
            ) : (
              <>
                Send a little hello <ArrowRight size={18} />
              </>
            )}
          </button>
          <div aria-live="polite" className="form-status">
            {status === "sent" && (
              <span className="success-message">
                Message sent. Thanks for saying hello!
              </span>
            )}
            {status === "error" && (
              <span className="error-message">
                Couldn’t send your message. Please try again or{" "}
                <a href="mailto:07april.li@gmail.com">email me directly</a>.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
