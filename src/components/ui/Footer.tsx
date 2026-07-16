import { CONTACT_EMAIL } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/faymousaisida" },
  { label: "Dribbble", href: "https://dribbble.com/faymousaisida" },
  { label: "Email",    href: `mailto:${CONTACT_EMAIL}` },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-wrap {
          padding: 80px;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-wrap { padding: 48px; }
        }
        @media (max-width: 767px) {
          .footer-wrap { padding: 24px; }
        }

        /* Row 1 */
        .footer-row-1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-social-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        @media (max-width: 767px) {
          .footer-row-1 {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .footer-social-links {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }

        /* Row 2 */
        .footer-row-2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .footer-row-2 {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        /* Social link hover */
        .footer-link {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 14px;
          color: #6B6B6B;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .footer-link:hover { color: #0A0A0A; }
      `}</style>

      <footer
        style={{
          backgroundColor: "#F5F2EB",
          borderTop: "1px solid rgba(10,10,10,0.1)",
        }}
      >
        <div className="footer-wrap">

          {/* ── Row 1: name + social links ── */}
          <div className="footer-row-1">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize:   "24px",
                color:      "#0A0A0A",
              }}
            >
              Faymous Aisida
            </span>

            <div className="footer-social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Rule between rows */}
          <div
            style={{
              width:           "100%",
              height:          "1px",
              backgroundColor: "rgba(10,10,10,0.1)",
              margin:          "32px 0",
            }}
          />

          {/* ── Row 2: tagline + copyright ── */}
          <div className="footer-row-2">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize:   "13px",
                color:      "#6B6B6B",
              }}
            >
              Designed &amp; built with intention.
            </span>

            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize:   "13px",
                color:      "#6B6B6B",
              }}
            >
              © {new Date().getFullYear()} Faymous Aisida
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}
