"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PORTRAIT_IMAGES = [
  "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop&crop=faces&auto=format",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=faces&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces&auto=format",
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const backCircleRef  = useRef<SVGPathElement>(null);
  const frontCircleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PORTRAIT_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Draw both circle segments once on load, 800ms after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      [backCircleRef.current, frontCircleRef.current].forEach((path) => {
        if (!path) return;
        // rAF ensures the browser has committed the initial dashoffset before
        // the transition starts — prevents the "snap to 0" with no animation
        requestAnimationFrame(() => {
          path.style.transition       = "stroke-dashoffset 1s ease-out";
          path.style.strokeDashoffset = "0";
        });
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .hero-content-width {
            max-width: 100% !important;
          }
          .hero-portrait {
            display: none !important;
          }
        }
      `}</style>

      <section
        className="hero-section"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          paddingTop: "120px",
          paddingBottom: "48px",
          paddingLeft: "80px",
          paddingRight: "80px",
          backgroundColor: "#F5F2EB",
        }}
      >
        {/* Empty first child keeps justify-between placing headline in lower half */}
        <div aria-hidden="true" />

        {/* ── Label + headline + descriptor ── */}
        <div className="hero-fade-up">

          {/* Status label — 16px above the headline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "11px",
              color: "#6B6B6B",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            <span>UI/UX Designer ·</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px", marginRight: "6px" }}>
                <span style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "1.5px solid #22C55E",
                  animation: "beacon-ring 2s ease-out infinite",
                  opacity: 0,
                }} />
                <span style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "1.5px solid #22C55E",
                  animation: "beacon-ring 2s ease-out infinite 0.75s",
                  opacity: 0,
                }} />
                <span style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  position: "relative",
                  zIndex: 1,
                }} />
              </span>
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(56px, 8vw, 96px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#0A0A0A",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Designing digital
            <br />
            experiences that matter.
          </h1>

          {/* Descriptor */}
          <p
            style={{
              marginTop: "24px",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "16px",
              color: "#6B6B6B",
              maxWidth: "420px",
              lineHeight: 1.7,
            }}
          >
            I craft interfaces for fintech, AI, fashion, and beyond — turning
            complex problems into products people love.
          </p>
        </div>

        {/* ── Bottom row: CTA left, metadata right ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <a
            href="#work"
            className="cta-btn"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "14px",
              color: "#F5F2EB",
              backgroundColor: "#0A0A0A",
              borderRadius: "999px",
              padding: "14px 28px",
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            View my work →
          </a>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              textAlign: "right",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            <span>Based in Lagos, NG</span>
            <span>Open to remote &amp; relocation</span>
          </div>
        </div>

        {/* ── Floating portrait card — cycles through images every 3s ── */}
        <div
          className="hero-portrait"
          style={{
            position: "absolute",
            top:      "170px",
            right:    "380px",
            width:    "180px",
            height:   "180px",
            transform: "rotate(2deg)",
            overflow: "visible",
          }}
        >
          {/* BACK arc — renders behind the photo (top-left arc) */}
          <svg
            viewBox="0 0 300 300"
            style={{
              position:      "absolute",
              top:           "-40px",
              left:          "-40px",
              width:         "calc(100% + 80px)",
              height:        "calc(100% + 80px)",
              pointerEvents: "none",
              zIndex:        0,
              overflow:      "visible",
            }}
          >
            <path
              ref={backCircleRef}
              d="M 40 140 C 50 80, 110 35, 180 35 C 230 35, 270 60, 295 125"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="310"
              style={{ strokeDashoffset: 310 }}
            />
          </svg>

          {/* Inner div clips images to rounded square — sits between the two arcs */}
          <div
            style={{
              width:        "100%",
              height:       "100%",
              borderRadius: "16px",
              overflow:     "hidden",
              boxShadow:    "0 8px 32px rgba(10,10,10,0.08)",
              position:     "relative",
              zIndex:       1,
            }}
          >
            {PORTRAIT_IMAGES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="Portrait"
                fill
                style={{
                  objectFit:  "cover",
                  filter:     "grayscale(100%)",
                  opacity:    i === activeIndex ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                }}
                sizes="180px"
              />
            ))}
          </div>

          {/* FRONT arc — renders in front of the photo (bottom-right arc) */}
          <svg
            viewBox="0 0 300 300"
            style={{
              position:      "absolute",
              top:           "-40px",
              left:          "-40px",
              width:         "calc(100% + 80px)",
              height:        "calc(100% + 80px)",
              pointerEvents: "none",
              zIndex:        2,
              overflow:      "visible",
            }}
          >
            <path
              ref={frontCircleRef}
              d="M 270 85 C 295 150, 285 220, 230 255 C 170 290, 90 280, 50 230 C 30 205, 28 170, 60 118"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="545"
              style={{ strokeDashoffset: 545 }}
            />
          </svg>
        </div>

        {/* Bottom separator rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid rgba(10,10,10,0.10)",
          }}
        />
      </section>
    </>
  );
}
