"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const navLinks = [
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

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

  const close = () => { setMenuOpen(false); setWorkOpen(false); };

  const numStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "14px",
    fontWeight: 500,
    color: "#b3ad9f",
    width: "24px",
    flexShrink: 0,
  } as const;

  const wordStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "42px",
    fontWeight: 700,
    color: "#0A0A0A",
    lineHeight: 1,
    letterSpacing: "-0.5px",
  } as const;

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
        @keyframes navFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes navSubDrop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
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
          {/* Name / logo */}
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

          {/* Desktop links + CTA */}
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

          {/* Mobile hamburger */}
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

      {/* Full-screen mobile overlay — editorial cream */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100]"
          style={{
            backgroundColor: "#F5F2EB",
            display: "flex",
            flexDirection: "column",
            padding: "30px 24px 28px",
            animation: "navFade 0.25s ease",
            overflowY: "auto",
          }}
        >
          {/* Watermark */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-12px",
              fontFamily: "var(--font-display)",
              fontSize: "170px",
              fontWeight: 800,
              color: "rgba(10,10,10,0.045)",
              letterSpacing: "-10px",
              whiteSpace: "nowrap",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            WORK
          </span>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
            <a
              href="/"
              onClick={close}
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", color: "#0A0A0A", textDecoration: "none" }}
            >
              Faymous Aisida
            </a>
            <button
              onClick={close}
              aria-label="Close menu"
              style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1L17 17M17 1L1 17" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Overline */}
          <div style={{ marginTop: "30px", fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a9589", fontWeight: 500, zIndex: 2 }}>
            Menu
          </div>

          {/* Menu */}
          <nav style={{ marginTop: "18px", zIndex: 2, flex: 1 }}>
            {/* 01 Work — accordion */}
            <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
              <button
                onClick={() => setWorkOpen((v) => !v)}
                aria-expanded={workOpen}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
              >
                <span style={numStyle}>01</span>
                <span style={wordStyle}>Work</span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ marginLeft: "auto", transform: workOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                >
                  <path d="M4 6l4 4 4-4" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {workOpen && (
                <div style={{ marginTop: "16px", marginLeft: "40px", display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "6px", animation: "navSubDrop 0.3s ease" }}>
                  {projects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/work/${p.id}`}
                      onClick={close}
                      style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                    >
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 600, color: "#0A0A0A", whiteSpace: "nowrap" }}>
                        {p.title}
                      </span>
                      <span style={{ flex: 1, borderBottom: "2px dotted #cbc5b6", margin: "0 14px" }} />
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "12.5px", color: "#9a9589", width: "74px", textAlign: "left", flexShrink: 0, whiteSpace: "nowrap" }}>
                        {p.category.split("·")[0].trim()}
                      </span>
                      <span style={{ width: "22px", textAlign: "right", fontSize: "15px", color: "#bdb7a8", flexShrink: 0 }}>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 02 About */}
            <a
              href="#about"
              onClick={close}
              style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: "1px solid rgba(10,10,10,0.08)", textDecoration: "none" }}
            >
              <span style={numStyle}>02</span>
              <span style={wordStyle}>About</span>
            </a>

            {/* 03 Contact */}
            <a
              href="#contact"
              onClick={close}
              style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: "1px solid rgba(10,10,10,0.08)", textDecoration: "none" }}
            >
              <span style={numStyle}>03</span>
              <span style={wordStyle}>Contact</span>
            </a>
          </nav>

          {/* Footer */}
          <div style={{ zIndex: 2, marginTop: "18px" }}>
            <a
              href="#contact"
              onClick={close}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid #0A0A0A", borderRadius: "999px", padding: "14px 24px", fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 500, color: "#0A0A0A", textDecoration: "none" }}
            >
              Get in touch <span>→</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "22px", fontFamily: "var(--font-display)", fontSize: "12px", color: "#9a9589" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="https://linkedin.com/in/faymousaisida" target="_blank" rel="noreferrer" style={{ color: "#9a9589", textDecoration: "none" }}>LinkedIn</a>
                <a href="https://dribbble.com/faymousaisida" target="_blank" rel="noreferrer" style={{ color: "#9a9589", textDecoration: "none" }}>Dribbble</a>
                <a href="mailto:aisidafamous@gmail.com" style={{ color: "#9a9589", textDecoration: "none" }}>Email</a>
              </div>
              <span>Lagos, NG</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
