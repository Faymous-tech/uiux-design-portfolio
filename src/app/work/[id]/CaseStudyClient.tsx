"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import CTA from "@/components/sections/CTA";
import { projects } from "@/lib/projects";

// ── Helpers ────────────────────────────────────────────────────────────────

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 0.55 ? "#0A0A0A" : "#FFFFFF";
}

function useFadeUp(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity   = "1";
        el.style.transform = "translateY(0)";
        observer.unobserve(el);
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

const FADE: React.CSSProperties = {
  opacity:    0,
  transform:  "translateY(30px)",
  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
};

const LABEL: React.CSSProperties = {
  fontFamily:    "var(--font-display)",
  fontWeight:    400,
  fontSize:      "11px",
  color:         "#6B6B6B",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom:  "28px",
  display:       "block",
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const params  = useParams();
  const id      = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const index   = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const next    = projects[(index + 1) % projects.length];

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const heroRef      = useRef<HTMLDivElement>(null);
  const problemRef   = useRef<HTMLDivElement>(null);
  const storyRef     = useRef<HTMLDivElement>(null);
  const researchRef  = useRef<HTMLDivElement>(null);
  const outcomeRef   = useRef<HTMLDivElement>(null);
  const moreRef      = useRef<HTMLDivElement>(null);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useFadeUp(heroRef);
  useFadeUp(problemRef);
  useFadeUp(storyRef);
  useFadeUp(researchRef);
  useFadeUp(outcomeRef);
  useFadeUp(moreRef);

  // Individual fade-up for each showcase block
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    showcaseRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!project) {
    return (
      <>
        <Nav />
        <main style={{ padding: "200px 80px", backgroundColor: "#F5F2EB", minHeight: "100vh" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: "#6B6B6B" }}>
            Project not found.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const showcaseList =
    project.showcaseImages && project.showcaseImages.length > 0
      ? project.showcaseImages
      : [0, 1, 2].map(() => ({
          src:     project.heroImage,
          caption: `Selected screen from the ${project.title} experience.`,
        }));

  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <>
      <style>{`
        .cs-px { padding-left: 80px; padding-right: 80px; }
        @media (min-width: 768px) and (max-width: 1023px) { .cs-px { padding-left: 48px; padding-right: 48px; } }
        @media (max-width: 767px)  { .cs-px { padding-left: 24px; padding-right: 24px; } }

        /* Shared two-column grid — used by both section 2 and 3 so columns align vertically */
        .cs-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .cs-two-col { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Sticky metadata — position only, sizing comes from the shared grid */
        .cs-story-meta {
          position: sticky;
          top: 140px;
        }
        @media (max-width: 767px) {
          .cs-story-meta { position: static; }
        }

        /* More-projects list row */
        .more-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px 0;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          z-index: 1;
          transition: background 0.2s ease;
        }
        .more-row:hover { background: rgba(10,10,10,0.02); z-index: 10; }

        .more-row-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 28px;
          color: #0A0A0A;
          flex-shrink: 0;
        }
        .more-row-desc {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 16px;
          color: #6B6B6B;
          margin-left: auto;
          text-align: right;
          line-height: 1.5;
          max-width: 480px;
        }

        @media (max-width: 767px) {
          .more-row-name { font-size: 20px; }
          .more-row-desc { display: none; }
        }

        /* Showcase caption row */
        .cs-caption { display: flex; align-items: center; gap: 16px; margin-top: 16px; }

        /* Design system / More flows half-cards */
        .ds-card { height: 700px; }
        @media (max-width: 767px) { .ds-card { height: 300px; } }

        /* Scrollable visual explorations container */
        .ve-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(10,10,10,0.2) transparent;
        }
        .ve-scroll::-webkit-scrollbar { width: 4px; }
        .ve-scroll::-webkit-scrollbar-track { background: transparent; }
        .ve-scroll::-webkit-scrollbar-thumb { background: rgba(10,10,10,0.2); border-radius: 2px; }
      `}</style>

      <Nav />

      {/* Thin rule pinned directly below the fixed nav bar — case study only */}
      <div
        style={{
          position:        "fixed",
          top:             "64px",
          left:            0,
          right:           0,
          height:          "1px",
          backgroundColor: "rgba(10,10,10,0.1)",
          zIndex:          49,
        }}
      />

      <main style={{ backgroundColor: "#F5F2EB", minHeight: "100vh" }}>

        {/* ── 1. HERO ──────────────────────────────────────────────── */}
        <div
          ref={heroRef}
          className="cs-px"
          style={{ ...FADE, paddingTop: "160px", paddingBottom: "64px" }}
        >
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontWeight:    700,
              fontSize:      "clamp(56px, 8vw, 96px)",
              color:         "#0A0A0A",
              lineHeight:    1.05,
              letterSpacing: "-0.02em",
              margin:        0,
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontFamily:  "var(--font-display)",
              fontWeight:  400,
              fontSize:    "clamp(28px, 4vw, 44px)",
              color:       "#0A0A0A",
              lineHeight:  1.25,
              maxWidth:    "820px",
              marginTop:   "64px",
              marginBottom: 0,
            }}
          >
            {project.description}
          </p>

          {/* Hero image */}
          <div
            style={{
              marginTop:    "56px",
              position:     "relative",
              aspectRatio:  "16 / 9",
              borderRadius: "16px",
              overflow:     "hidden",
              width:        "100%",
            }}
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
        </div>

        {/* ── 2. PROBLEM / SOLUTION / METADATA ─────────────────────── */}
        {(project.problem || project.solution) && (
          <div
            ref={problemRef}
            className="cs-px"
            style={{ ...FADE, paddingTop: "80px", paddingBottom: "80px" }}
          >
            <div className="cs-two-col">

              {/* Problem */}
              {project.problem && (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "36px", color: "#0A0A0A", lineHeight: 1.1, marginBottom: "24px" }}>
                    Problem
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "16px", color: "#0A0A0A", lineHeight: 1.7, margin: 0 }}>
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "36px", color: "#0A0A0A", lineHeight: 1.1, marginBottom: "24px" }}>
                    Solution
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "16px", color: "#0A0A0A", lineHeight: 1.7, margin: 0 }}>
                    {project.solution}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ── 3. STORY + STICKY METADATA ───────────────────────────── */}
        {project.story && project.story.length > 0 && (
          <div
            ref={storyRef}
            className="cs-px"
            style={{ ...FADE, paddingTop: "80px", paddingBottom: "80px", position: "relative" }}
          >
            <div className="cs-two-col">

              {/* Story paragraphs — max-width matches Problem column width */}
              <div style={{ maxWidth: "720px" }}>
                {project.story.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily:   "var(--font-display)",
                      fontWeight:   400,
                      fontSize:     i === 0 ? "28px" : "17px",
                      color:        "#0A0A0A",
                      lineHeight:   i === 0 ? 1.5 : 1.8,
                      marginTop:    0,
                      marginBottom: i < project.story!.length - 1 ? "40px" : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Sticky metadata — starts at same left edge as Solution column */}
              <div className="cs-story-meta">
                {[
                  { label: "Year",      value: project.year },
                  { label: "Timeframe", value: "16 days" },
                  { label: "Tools",     value: project.tools },
                  { label: "Category",  value: project.category },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} style={{ marginBottom: "32px" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "13px", color: "#6B6B6B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                        {label}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "22px", color: "#0A0A0A", lineHeight: 1.2 }}>
                        {value}
                      </div>
                    </div>
                  ) : null
                )}
              </div>

            </div>
          </div>
        )}

        {/* ── 4a. RESEARCH ─────────────────────────────────────────── */}
        <div
          ref={researchRef}
          className="cs-px"
          style={{ ...FADE, paddingTop: "80px", paddingBottom: "80px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: LABEL.marginBottom }}>
            <span style={{ ...LABEL, marginBottom: 0 }}>Research</span>
            <span style={{ ...LABEL, marginBottom: 0 }}>01</span>
          </div>
          <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(10,10,10,0.1)", marginBottom: "48px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: "48px", alignItems: "start" }}>
            {/* Left — research paragraph */}
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "17px", color: "#0A0A0A", lineHeight: 1.8, maxWidth: "560px", margin: 0 }}>
              {project.research ?? "The research phase focused on understanding the core pain points users face when navigating property discovery and mortgage financing. We conducted user interviews, competitive analysis, and journey mapping to identify where the current experience breaks down and where the biggest opportunities for improvement existed."}
            </p>

            {/* Right — research video, scrollable image, or placeholder */}
            {project.researchVideo ? (
              <div style={{ aspectRatio: "4 / 3", borderRadius: "16px", overflow: "hidden", backgroundColor: "#F5F2EB" }}>
                <div style={{ width: "100%", height: "100%", padding: "24px", boxSizing: "border-box" }}>
                  <video
                    src={project.researchVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
              </div>
            ) : project.researchImage ? (
              <div
                className="ve-scroll"
                style={{ aspectRatio: "4 / 3", borderRadius: "16px", overflowY: "auto", overflowX: "hidden", backgroundColor: "#E8E4DC", padding: "20px", boxSizing: "border-box" }}
              >
                <Image
                  src={project.researchImage}
                  alt={`${project.title} — research`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#E8E4DC",
                  borderRadius:    "12px",
                  aspectRatio:     "4 / 3",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "13px", color: "#6B6B6B" }}>
                  Research visuals coming soon
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── 4b. VISUAL EXPLORATIONS (02) ────────────────────────── */}
        <div
          ref={(el) => { showcaseRefs.current[0] = el; }}
          className="cs-px"
          style={{ ...FADE, paddingTop: "64px", paddingBottom: "64px" }}
        >
          {/* Label — no rule, just spacing */}
          <span style={{ ...LABEL, marginBottom: "24px" }}>Visual explorations</span>

          {/* Intro paragraph */}
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "17px", color: "#0A0A0A", lineHeight: 1.8, maxWidth: "640px", marginBottom: "40px", marginTop: 0 }}>
            With a clear understanding of user needs, we moved into visual exploration — translating research insights into early interface concepts, layout structures, and interaction patterns that would define the product&apos;s look and feel.
          </p>

          {/* Full-width image */}
          {project.visualExplorationsImage ? (
            /* Scrollable treatment — outer clips border-radius, gradient stays fixed */
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", width: "100%", backgroundColor: "#E8E4DC" }}>
              <div
                className="ve-scroll"
                style={{ aspectRatio: "16 / 9", overflowY: "auto", overflowX: "hidden", width: "100%", padding: "20px", boxSizing: "border-box" }}
              >
                <Image
                  src={project.visualExplorationsImage}
                  alt={`${project.title} — visual explorations`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          ) : (
            /* Default treatment — cropped fill image */
            <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "16px", overflow: "hidden", width: "100%" }}>
              <Image
                src={showcaseList[1].src}
                alt={`${project.title} — screen 2`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
          )}

          {/* Number + caption */}
          <div className="cs-caption">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "12px", color: "#6B6B6B" }}>02</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "13px", color: "#6B6B6B" }}>
              {showcaseList[1].caption}
            </span>
          </div>
        </div>

        {/* ── 4c. DESIGN SYSTEM / MORE FLOWS (03) ─────────────────── */}
        {(() => {
          const isDesignSystem = !!project.processImages;
          const label          = isDesignSystem ? "Design system" : "More flows";
          const paragraph      = isDesignSystem
            ? "A cohesive design system was established to ensure consistency across every screen — covering typography scales, color tokens, spacing rules, and reusable component patterns."
            : "A selection of additional screens showcasing the depth of the product experience — from edge cases to secondary flows that round out the full user journey.";
          const placeholderText = isDesignSystem
            ? "Design system screens coming soon"
            : "Additional screens coming soon";
          const cardA = project.processImages?.[0];
          const cardB = project.processImages?.[1];

          return (
            <div
              ref={(el) => { showcaseRefs.current[1] = el; }}
              className="cs-px"
              style={{ ...FADE, paddingTop: "64px", paddingBottom: "64px" }}
            >
              {/* Label row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={{ ...LABEL, marginBottom: 0 }}>{label}</span>
                <span style={{ ...LABEL, marginBottom: 0 }}>03</span>
              </div>

              {/* Paragraph */}
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "17px", color: "#0A0A0A", lineHeight: 1.8, maxWidth: "640px", marginBottom: "40px", marginTop: 0 }}>
                {paragraph}
              </p>

              {/* Two half-width cards */}
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {([
                  { card: cardA, scrollSrc: project.moreFlowsImage1 },
                  { card: cardB, scrollSrc: project.moreFlowsImage2 },
                ] as { card: typeof cardA; scrollSrc: string | undefined }[]).map(({ card, scrollSrc }, ci) => (
                  <div
                    key={ci}
                    className="ds-card"
                    style={{
                      flex:         "1 1 calc(50% - 12px)",
                      minWidth:     "280px",
                      borderRadius: "16px",
                      overflow:     "hidden",
                      position:     "relative",
                      backgroundColor: "#E8E4DC",
                      display:      scrollSrc || card ? "block" : "flex",
                      alignItems:   scrollSrc || card ? undefined : "center",
                      justifyContent: scrollSrc || card ? undefined : "center",
                    }}
                  >
                    {scrollSrc ? (
                      <div
                        className="ve-scroll"
                        style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", padding: "20px", boxSizing: "border-box" }}
                      >
                        <Image
                          src={scrollSrc}
                          alt={`${project.title} — ${label} ${ci + 1}`}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 45vw"
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    ) : card ? (
                      <Image
                        src={card.src}
                        alt={`${project.title} — ${label} ${ci + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    ) : (
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "13px", color: "#6B6B6B" }}>
                        {placeholderText}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Context one-liner */}
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "14px", color: "#6B6B6B", maxWidth: "640px", marginTop: "24px", marginBottom: 0 }}>
                {isDesignSystem
                  ? "A snapshot of the component library, typography scale, and color tokens used across the product."
                  : "Additional screens highlighting the depth and consistency of the full product experience."}
              </p>
            </div>
          );
        })()}

        {/* ── 5. OUTCOME ───────────────────────────────────────────── */}
        {project.outcome && (
          <div
            ref={outcomeRef}
            className="cs-px"
            style={{ ...FADE, paddingTop: "80px", paddingBottom: "80px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: LABEL.marginBottom }}>
              <span style={{ ...LABEL, marginBottom: 0 }}>Outcome &amp; Learnings</span>
              <span style={{ ...LABEL, marginBottom: 0 }}>04</span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize:   "20px",
                color:      "#0A0A0A",
                lineHeight: 1.6,
                maxWidth:   "720px",
                margin:     0,
              }}
            >
              {project.outcome}
            </p>
          </div>
        )}

        {/* ── 6. MORE PROJECTS ─────────────────────────────────────── */}
        <div
          ref={moreRef}
          className="cs-px"
          style={{ ...FADE, paddingTop: "80px", paddingBottom: "120px" }}
        >
          {/* Rule */}
          <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(10,10,10,0.1)", marginBottom: "48px" }} />

          {/* Heading */}
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", color: "#0A0A0A", margin: "0 0 48px 0", letterSpacing: "-0.02em" }}>
            More projects
          </h2>

          {/* Project rows */}
          {otherProjects.map((p, i) => {
            const isHovered = hoveredRow === i;
            return (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                className="more-row"
                style={{ borderBottom: i < otherProjects.length - 1 ? "1px solid rgba(10,10,10,0.1)" : "none" }}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Hover-reveal Polaroid — position:absolute inline-guaranteed, never in flow */}
                <div
                  style={{
                    position:   "absolute",
                    left:       "50%",
                    top:        "50%",
                    background: "white",
                    padding:    "6px",
                    borderRadius: "6px",
                    boxShadow:  "0 12px 24px rgba(0,0,0,0.15)",
                    opacity:    isHovered ? 1 : 0,
                    pointerEvents: "none",
                    transform:  `translateX(-50%) translateY(-50%) rotate(-4deg) scale(${isHovered ? 1 : 0.9})`,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    zIndex:     20,
                  }}
                >
                  <div style={{ width: "140px", height: "105px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                    <Image src={p.heroImage} alt={p.title} fill style={{ objectFit: "cover" }} sizes="140px" />
                  </div>
                </div>

                {/* Project name */}
                <div className="more-row-name">{p.title}</div>

                {/* Description */}
                <div className="more-row-desc">{p.description}</div>
              </Link>
            );
          })}
        </div>

        {/* ── 7. CLOSING CTA ───────────────────────────────────────── */}
        <CTA
          lines={[["Got", "a", "project"], ["in", "mind?"]]}
          circleWord="mind?"
          description="Let's talk about what you're building. I'd love to be a part of it."
          bgColor="#D4CABA"
        />

      </main>

      <Footer />
    </>
  );
}
