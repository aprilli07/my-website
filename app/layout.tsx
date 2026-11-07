import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "April Li — Software Developer",
  description: "April Li is a Computer Science student and software developer at the University of Waterloo, building thoughtful and practical digital products.",
  icons: {
    icon:"/icon.png",
  }
};

// Runs before first paint so returning visitors skip the curtain, and so the
// hero never flashes in its finished state before its intro takes over.
const introScript = `try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-pending");if(sessionStorage.getItem("al-intro"))d.classList.add("intro-seen")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.preloader{display:none}`}</style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
