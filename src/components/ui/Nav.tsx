"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

const overlayLinks = [
  ...navLinks,
  { label: "Get in touch", href: "#contact" },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .nav-inner {
          padding-left: 80px;
          padding-right: 80px;
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .nav-inner {
            padding-left: 48px;
            padding-right: 48px;
          }
        }
        @media (max-width: 767px) {
          .nav-inner {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "#F5F2EB" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(10,10,10,0.10)"
            : "1px solid transparent",
        }}
      >
        <nav className="nav-inner h-16 flex items-center justify-between">
          {/* ── Name / logo ── */}
          <a
            href="/"
            className="text-[#0A0A0A] tracking-tight shrink-0"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            Faymous Aisida
          </a>

          {/* ── Desktop links + CTA (hidden below md) ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#6B6B6B",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              className="transition-all duration-200"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "13px",
                color: "#0A0A0A",
                border: "1px solid #0A0A0A",
                borderRadius: "999px",
                padding: "8px 20px",
                background: "transparent",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0A0A0A";
                e.currentTarget.style.color = "#F5F2EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#0A0A0A";
              }}
            >
              Get in touch
            </a>
          </div>

          {/* ── Mobile hamburger (visible below md) ── */}
          <button
            className="flex md:hidden items-center justify-center"
            style={{ width: "44px", height: "44px" }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <rect width="22" height="1.5" rx="0.75" fill="#0A0A0A" />
              <rect y="6"  width="22" height="1.5" rx="0.75" fill="#0A0A0A" />
              <rect y="12" width="22" height="1.5" rx="0.75" fill="#0A0A0A" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center nav-overlay"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          {/* X — top-right, aligned with hamburger position */}
          <button
            onClick={close}
            aria-label="Close menu"
            className="absolute top-0 flex items-center justify-center"
            style={{
              right: "var(--section-px)",
              height: "64px",
              width: "44px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1L17 17M17 1L1 17"
                stroke="#F5F2EB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Stacked links */}
          <nav className="flex flex-col items-center gap-10">
            {overlayLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "36px",
                  color: "#F5F2EB",
                  textDecoration: "none",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
