"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about-section {
          padding: 120px 80px;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-section { padding: 120px 48px; }
        }
        @media (max-width: 767px) {
          .about-section { padding: 80px 24px; }
        }

        .about-columns {
          display: flex;
          align-items: flex-start;
          gap: 80px;
        }
        .about-left  { flex: 0 0 40%; }
        .about-right { flex: 1; }

        @media (max-width: 767px) {
          .about-columns {
            flex-direction: column;
            gap: 32px;
          }
          .about-left, .about-right { flex: none; width: 100%; }
        }

        .about-pill {
          display: inline-block;
          border: 1px solid rgba(10,10,10,0.25);
          border-radius: 999px;
          padding: 8px 20px;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 13px;
          color: #0A0A0A;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .about-pill:hover {
          background: #0A0A0A;
          color: #F5F2EB;
        }
      `}</style>

      <section
        id="about"
        className="about-section"
        style={{ backgroundColor: "#D4CABA" }}
      >
        {/* Fade-up wrapper */}
        <div
          ref={innerRef}
          style={{
            opacity:    0,
            transform:  "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="about-columns">

            {/* ── Left column ── */}
            <div className="about-left">
              <p
                style={{
                  fontFamily:    "var(--font-display)",
                  fontWeight:    400,
                  fontSize:      "11px",
                  color:         "rgba(10,10,10,0.45)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom:  "20px",
                }}
              >
                About
              </p>
              <h2
                style={{
                  fontFamily:  "var(--font-display)",
                  fontWeight:  700,
                  fontSize:    "clamp(32px, 4vw, 48px)",
                  color:       "#0A0A0A",
                  lineHeight:  1.15,
                  maxWidth:    "420px",
                  margin:      0,
                }}
              >
                Designer by day, The Green Arrow by night.
              </h2>
            </div>

            {/* ── Right column ── */}
            <div className="about-right">
              <p
                style={{
                  fontFamily:  "var(--font-display)",
                  fontWeight:  300,
                  fontSize:    "17px",
                  color:       "rgba(10,10,10,0.65)",
                  lineHeight:  1.8,
                  maxWidth:    "540px",
                  margin:      0,
                }}
              >
                I&apos;m Faymous, a UI/UX designer from Lagos. I spend my days
                turning complex problems into clean, intuitive digital
                experiences — and my nights wondering how to make them even
                better. I also work part time as a vigilante, fighting crime
                and keeping watch over my city.
              </p>

              <a
                href="/about"
                className="about-pill"
                style={{ marginTop: "32px" }}
              >
                More about me →
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
