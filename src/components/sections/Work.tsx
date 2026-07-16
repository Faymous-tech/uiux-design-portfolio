"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

export default function Work() {
  const [containerHeight, setContainerHeight] = useState(projects.length * 900 + 1200);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setContainerHeight(projects.length * 900 + 1200);
  }, []);

  // Scale-down to 0.95 as each card gets covered by the next sticky card
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined" || window.innerWidth < 768) return;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const nextEl = cardRefs.current[i + 1];
        if (!nextEl) return;

        const nextRect = nextEl.getBoundingClientRect();
        const stickyTop = 80; // matches top: 80px on sticky wrappers

        // progress: 0 = next card off-screen bottom, 1 = next card at its sticky pos
        const travelDistance = window.innerHeight - stickyTop;
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight - nextRect.top) / travelDistance)
        );

        // Scale from 1.0 → 0.95 as the next card slides in over this one
        el.style.transform = `scale(${1 - 0.05 * progress})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Grayscale → color on scroll for touch/no-hover devices (hover devices use CSS)
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;

    const observers: IntersectionObserver[] = [];
    imageRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          el.style.filter = entry.isIntersecting ? "grayscale(0%)" : "grayscale(100%)";
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .work-section {
          padding-left: 80px;
          padding-right: 80px;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .work-section { padding-left: 48px; padding-right: 48px; }
        }
        @media (max-width: 767px) {
          .work-section { padding-left: 24px; padding-right: 24px; }
        }

        /* Title hover transition */
        .project-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.1;
          color: #0A0A0A;
          transition: color 0.3s ease;
        }
        .project-card-link:hover .project-title { color: #6B6B6B; }

        /* Grey inner panel — responsive padding */
        .card-image-panel { padding: 64px; }
        @media (min-width: 768px) and (max-width: 1023px) { .card-image-panel { padding: 40px; } }
        @media (max-width: 767px) { .card-image-panel { padding: 24px; } }

        /* Grayscale default + scale/color on hover (desktop only) */
        .card-image-inner {
          filter: grayscale(100%);
          transition: transform 0.6s ease, filter 0.6s ease-in-out;
        }
        @media (hover: hover) {
          .project-card-link:hover .card-image-inner {
            transform: scale(1.03);
            filter: grayscale(0%);
          }
        }


        /* Top row */
        .card-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 24px 24px;
        }
        @media (max-width: 767px) {
          .card-top-row { flex-direction: column; gap: 6px; }
        }

        /* Bottom row */
        .card-bottom-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          padding: 20px 24px 32px;
        }
        @media (max-width: 767px) {
          .card-bottom-row { flex-direction: column; gap: 12px; }
          .card-tags       { justify-content: flex-start !important; }
        }

        /* Mobile: disable sticky stacking */
        @media (max-width: 767px) {
          .sticky-cards-container { height: auto !important; }
          .sticky-card-wrapper    {
            position:  static !important;
            transform: none !important;
            z-index:   auto !important;
          }
        }
      `}</style>

      <section
        id="work"
        className="work-section"
        style={{
          backgroundColor: "#F5F2EB",
          paddingTop:    "120px",
          paddingBottom: "120px",
        }}
      >
        {/* ── Section header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    400,
              fontSize:      "11px",
              color:         "#6B6B6B",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Selected Work
          </span>
          <a
            href="/work"
            style={{
              fontFamily:     "var(--font-display)",
              fontWeight:     400,
              fontSize:       "13px",
              color:          "#0A0A0A",
              border:         "1px solid #0A0A0A",
              borderRadius:   "999px",
              padding:        "8px 18px",
              textDecoration: "none",
              display:        "inline-block",
            }}
          >
            All projects →
          </a>
        </div>

        {/* Rule */}
        <div
          style={{
            width:           "100%",
            height:          "1px",
            backgroundColor: "rgba(10,10,10,0.1)",
            margin:          "24px 0",
          }}
        />

        {/* ── Sticky stacking cards container ── */}
        <div
          className="sticky-cards-container"
          style={{ position: "relative", height: `${containerHeight}px` }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="sticky-card-wrapper"
              style={{
                position:        "sticky",
                top:             "80px",
                zIndex:          index === projects.length - 1 ? 10 : index + 1,
                marginBottom:    "24px",
                transition:      "transform 0.4s ease",
                transformOrigin: "top center",
              }}
            >
              {/* ── Card box ── */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius:    "16px",
                  boxShadow:       "0 4px 24px rgba(10,10,10,0.08)",
                  border:          "1px solid rgba(10,10,10,0.08)",
                }}
              >
                <Link
                  href={`/work/${project.id}`}
                  className="project-card-link"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  {/* Top row */}
                  <div className="card-top-row">
                    <h2 className="project-title">{project.title}</h2>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize:   "13px",
                        color:      "#6B6B6B",
                        flexShrink: 0,
                        paddingTop: "6px",
                      }}
                    >
                      {project.category} · {project.year}
                    </div>
                  </div>

                  {/* Grey inner panel */}
                  <div
                    className="card-image-panel"
                    style={{
                      backgroundColor: "#EEEEEE",
                      borderRadius:    "12px",
                      margin:          "0 24px 24px",
                    }}
                  >
                    {/* Centered image — 60% width of the grey panel */}
                    <div
                      style={{
                        width:        "60%",
                        margin:       "0 auto",
                        aspectRatio:  "16 / 9",
                        overflow:     "hidden",
                        borderRadius: "8px",
                        boxShadow:    "0 4px 16px rgba(0,0,0,0.10)",
                        position:     "relative",
                      }}
                    >
                      <div
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className="card-image-inner"
                        style={{ position: "relative", width: "100%", height: "100%" }}
                      >
                        <Image
                          src={project.heroImage}
                          alt={project.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="card-bottom-row">
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 300,
                        fontSize:   "15px",
                        color:      "#6B6B6B",
                        maxWidth:   "520px",
                        lineHeight: 1.7,
                        margin:     0,
                      }}
                    >
                      {project.description}
                    </p>
                    <div
                      className="card-tags"
                      style={{
                        display:        "flex",
                        flexWrap:       "wrap",
                        gap:            "8px",
                        justifyContent: "flex-end",
                      }}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily:   "var(--font-display)",
                            fontWeight:   400,
                            fontSize:     "11px",
                            color:        "#6B6B6B",
                            border:       "1px solid rgba(10,10,10,0.15)",
                            borderRadius: "999px",
                            padding:      "4px 12px",
                            whiteSpace:   "nowrap",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Separator between cards (not after last) */}
              {index < projects.length - 1 && (
                <div
                  style={{
                    width:           "100%",
                    height:          "1px",
                    backgroundColor: "rgba(10,10,10,0.1)",
                    margin:          "24px 0",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
