import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="footer">
      <svg
        className="edge"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H100V0Q50 0 0 0Z" />
      </svg>
      <a className="footer-name" href="#hero">
        <span className="footer-text">APRIL LI</span>
        <span>✳</span>
      </a>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} APRIL LI</span>
        <span>BUILT WITH INTENTION. AND A LITTLE MOTION.</span>
        <a href="#hero">
          BACK TO TOP <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}
