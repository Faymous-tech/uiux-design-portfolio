"use client";

import { useEffect, useRef } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

interface Props {
  lines?: string[][];
  circleWord?: string;
  description?: string;
  ctaHref?: string;
  ctaText?: string;
  bgColor?: string;
}

const DEFAULT_LINES: string[][] = [["Let's", "design"], ["something", "awesome."]];
const DEFAULT_CIRCLE = "awesome.";

export default function CTA({
  lines       = DEFAULT_LINES,
  circleWord  = DEFAULT_CIRCLE,
  description = "Have a project in mind? I'd love to hear about it. Let's build something worth remembering.",
  ctaHref     = `mailto:${CONTACT_EMAIL}`,
  ctaText     = "Get in touch →",
  bgColor     = "#F5F2EB",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const innerRef   = useRef<HTMLDivElement>(null);
  const circleRef  = useRef<SVGPathElement>(null);

  // Pre-compute word structure (pure, no mutation)
  const wordStructure = lines.map((line, li) => {
    const offset = lines.slice(0, li).reduce((sum, l) => sum + l.length, 0);
    return line.map((word, wi) => ({
      word,
      idx:       offset + wi,
      isCircled: word === circleWord,
      isLast:    wi === line.length - 1,
    }));
  });

  const totalWords  = lines.reduce((sum, l) => sum + l.length, 0);
  const circleDelay = totalWords * 150 + 500;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        wordRefs.current.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
          }, i * 150);
        });

        setTimeout(() => {
          const path = circleRef.current;
          if (!path) return;
          path.style.transition      = "stroke-dashoffset 0.8s ease-out";
          path.style.strokeDashoffset = "0";
        }, circleDelay);

        setTimeout(() => {
          const el = innerRef.current;
          if (!el) return;
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
        }, 300);

        observer.unobserve(section);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [circleDelay]);

  return (
    <>
      <style>{`
        .cta-section { padding: 120px 80px; }
        @media (min-width: 768px) and (max-width: 1023px) { .cta-section { padding: 80px 48px; } }
        @media (max-width: 767px)  { .cta-section { padding: 80px 24px; } }

        .cta-bottom-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin-top: 20px;
        }

        .cta-btn-dark {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 15px;
          color: #F5F2EB;
          background: #0A0A0A;
          border-radius: 999px;
          padding: 16px 32px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .cta-btn-dark:hover { background: rgba(10,10,10,0.85); transform: scale(1.02); }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="cta-section"
        style={{ backgroundColor: bgColor, position: "relative" }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    700,
              fontSize:      "clamp(48px, 7vw, 88px)",
              color:         "#0A0A0A",
              lineHeight:    1.0,
              margin:        "0 auto",
              letterSpacing: "-0.02em",
            }}
          >
            {wordStructure.map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line.map(({ word, idx, isCircled, isLast }) => (
                  <span
                    key={idx}
                    ref={(el) => { wordRefs.current[idx] = el; }}
                    style={{
                      display:     "inline-block",
                      opacity:     0,
                      transform:   "translateY(20px)",
                      transition:  "opacity 0.5s ease-out, transform 0.5s ease-out",
                      marginRight: isLast ? 0 : "0.25em",
                      whiteSpace:  "nowrap",
                      ...(isCircled ? { position: "relative", padding: "12px 10px" } : {}),
                    }}
                  >
                    {word}
                    {isCircled && (
                      <svg
                        viewBox="0 0 300 150"
                        style={{
                          position:      "absolute",
                          top:           "-20px",
                          left:          "-15px",
                          width:         "calc(100% + 30px)",
                          height:        "calc(100% + 40px)",
                          pointerEvents: "none",
                          zIndex:        1,
                        }}
                      >
                        <path
                          ref={circleRef}
                          d="M 60 75 C 55 40, 100 15, 160 20 C 220 25, 270 50, 265 80 C 260 115, 210 135, 150 130 C 90 128, 50 115, 55 85 C 58 70, 65 65, 70 68"
                          fill="none"
                          stroke="#0A0A0A"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="600"
                          strokeDashoffset="600"
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div
            ref={innerRef}
            style={{
              opacity:    0,
              transform:  "translateY(20px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <div className="cta-bottom-row">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize:   "16px",
                  color:      "#6B6B6B",
                  maxWidth:   "400px",
                  lineHeight: 1.7,
                  margin:     "0 auto",
                }}
              >
                {description}
              </p>
              <a href={ctaHref} className="cta-btn-dark">{ctaText}</a>
            </div>
          </div>
        </div>

        <div
          style={{
            position:        "absolute",
            bottom:          0,
            left:            0,
            right:           0,
            height:          "1px",
            backgroundColor: "rgba(10,10,10,0.1)",
          }}
        />
      </section>
    </>
  );
}
