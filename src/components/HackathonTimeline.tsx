"use client";

import React, { useEffect, useRef } from "react";
import { SectionDoodles } from "./SectionDoodles";

const hackathons = [
  {
    name: "CodeVersity National Hackathon",
    place: "🥉 2nd Runner-Up",
    date: "2025",
    org: "IIT Gandhinagar",
    team: "Team Apex",
    duration: "48 Hours",
    project: "HireMinds AI",
    story: "Built a fully autonomous AI hiring orchestrator with a 6-agent pipeline — real-time fraud detection, live coding environments, adaptive MCQs, AI voice interviews, and explainable recommendations. Zero human intervention.",
    tech: ["Python", "FastAPI", "LangGraph", "React"],
    color: "#C4622D",
    rotation: -2,
  },
  {
    name: "GDG Autonomous Hackathon",
    place: "🥉 2nd Runner-Up",
    date: "2026",
    org: "Google Developer Groups",
    team: "Team Apex",
    duration: "24 Hours",
    project: "StartupOps",
    story: "Built an AI co-founder system that guides early-stage startups with real-time strategic advice, prioritization, and pivot recommendations. Autonomous agent workflows simulating co-founder decision-making at 3AM.",
    tech: ["Python", "LangGraph", "React", "Firebase"],
    color: "#5A9E82",
    rotation: 1.5,
  },
  {
    name: "HACKaMINeD 2026",
    place: "🏁 Participant",
    date: "2026",
    org: "Nirma University",
    team: "Team Apex",
    duration: "1250+ Hackers",
    project: "Magnetic Manuscript",
    story: "12-agent LangGraph engine converting raw research drafts into journal-ready manuscripts for IEEE, Nature, The Lancet. Self-healing formatting pipeline with AI cover letter generation.",
    tech: ["LangGraph", "Python-docx", "Citeproc"],
    color: "#9680C2",
    rotation: -1,
  },
  {
    name: "Avishkar 2.0",
    place: "🎯 Showcase",
    date: "2025",
    org: "Silver Oak University",
    team: "",
    duration: "",
    project: "Food Insight Scanner",
    story: "Showcased AI-powered Flutter app using Groq AI for real-time barcode scanning, allergen detection, and personalized nutrition analysis. Generates a 'Good for You' score.",
    tech: ["Flutter", "Groq AI", "Firebase"],
    color: "#C9A060",
    rotation: 2,
  },
  {
    name: "Smart India Hackathon (SIH)",
    place: "✅ College Top Qualifier",
    date: "2025",
    org: "Government of India",
    team: "",
    duration: "",
    project: "",
    story: "Cleared college-level selection for India's largest student hackathon. Made it through the internal rounds at Silver Oak before the national stage.",
    tech: [],
    color: "#6A9EC0",
    rotation: -1.5,
  },
];

const HackathonCard = React.memo(function HackathonCard({ h, index }: { h: typeof hackathons[0]; index: number }) {
  const isEven = index % 2 === 0;
  const finalTilt = isEven ? -3.4 : 3.4;

  return (
    <div
      className={`war-card relative flex w-full my-8 lg:my-0 scroll-fade-in ${isEven ? "justify-start" : "justify-end lg:mt-[-80px]"}`}
      style={{ "--war-accent": h.color, "--war-tilt": `${finalTilt}deg` } as React.CSSProperties}
    >
      
      {/* Decorative timeline connecting node (visible on desktop) */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: h.color }} />
        {/* Connecting dashed line to card */}
        <svg
          className="absolute top-1/2 -translate-y-1/2 w-24 h-2"
          style={{ left: isEven ? "auto" : "-6rem", right: isEven ? "-6rem" : "auto" }}
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <line
            className="war-thread"
            x1="0"
            y1="5"
            x2="100"
            y2="5"
            stroke={h.color}
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.55"
          />
        </svg>
      </div>

      <div 
        className="relative w-full lg:w-[45%] group war-slap"
        style={{ 
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          willChange: "transform",
        }}
      >
        {/* Tape piece top center */}
        <div
          className="war-tape absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/50 backdrop-blur-md z-20 shadow-sm"
          style={{
            transform: `rotate(${isEven ? -3 : 4}deg)`,
            clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
          }}
        />

        {/* Index Card Body */}
        <div 
          className="war-card-paper bg-[#fdfcfb] border border-[#e7e5e4] p-6 lg:p-8 relative z-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-1"
          style={{ borderRadius: "2px 20px 2px 2px", willChange: "transform, box-shadow" }}
        >
          <div className="war-card-torn-edge war-card-torn-top" />
          <div className="war-card-torn-edge war-card-torn-right" />
          <div className="war-card-crease war-card-crease-1" />
          <div className="war-card-crease war-card-crease-2" />

          {/* Subtle grid lines background like a real index card */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(transparent 95%, #C4622D 95%)",
            backgroundSize: "100% 24px"
          }} />

          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold" style={{ color: h.color, fontFamily: "var(--font-mono)" }}>{h.place}</span>
                <span className="text-[10px] text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>{h.date}</span>
              </div>
              <h3 className="text-stone-800 text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {h.name}
              </h3>
              <p className="text-[11px] text-stone-500 mt-1" style={{ fontFamily: "var(--font-mono)" }}>@ {h.org}</p>
            </div>
            
            <div className="text-right shrink-0">
              <span className="text-[40px] font-bold leading-none opacity-20" style={{ color: h.color, fontFamily: "var(--font-display)" }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Project/Team Tags */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {h.project && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-stone-200 bg-white">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="text-[10px] text-stone-600 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{h.project}</span>
              </div>
            )}
            {h.team && (
              <span className="text-[10px] px-2.5 py-1 bg-stone-100 text-stone-500 rounded-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                {h.team} {h.duration && `· ${h.duration}`}
              </span>
            )}
          </div>

          {/* Story */}
          <p className="text-[13px] text-stone-700 leading-relaxed italic mb-5 relative z-10" style={{ fontFamily: "var(--font-editorial)" }}>
            <span aria-hidden className="select-none">
              &ldquo;
            </span>
            {h.story}
            <span aria-hidden className="select-none">
              &rdquo;
            </span>
          </p>

          {/* Tech stack footer */}
          {h.tech && h.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-100 relative z-10">
              {h.tech.map(t => (
                <span key={t} className="text-[9px] px-2 py-0.5 text-stone-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export const HackathonTimeline = React.memo(function HackathonTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1) scroll-progress driven "string draw"
    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress 0 when top is below viewport, 1 when bottom is above viewport
      const start = vh * 0.9;
      const end = vh * 0.15;
      const t = (start - rect.top) / Math.max(1, rect.height - (start - end));
      const clamped = Math.max(0, Math.min(1, t));
      section.style.setProperty("--war-progress", String(clamped));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 2) per-card reveal (tape slap + connector thread)
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".war-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).classList.add("war-inview");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((c) => io.observe(c));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hackathons"
      className="war-stories relative px-6 lg:px-8 pt-20 lg:pt-32 pb-24 scroll-mt-16 overflow-hidden"
    >
      <SectionDoodles seed={4} tone="cool" density="extreme" />
      {/* Background texture - Corkboard / Paper feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]" style={{
        backgroundImage: `url('/paper-texture.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
      }} />

      {/* Grid lines to make it look like a planning board */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{
        backgroundImage: `linear-gradient(transparent 95%, #6A9EC0 100%), linear-gradient(90deg, transparent 95%, #6A9EC0 100%)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="mx-auto max-w-[1000px] relative">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 scroll-fade-in relative z-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            04 — War Stories
          </span>
          <div className="flex-1 h-[2px] bg-stone-300" />
          <span className="text-[20px] animate-pulse drop-shadow-md">⚔️</span>
        </div>

        {/* The center "string" for desktop (Red string theory) */}
        <div
          className="war-string hidden lg:block absolute left-1/2 top-[100px] bottom-10 w-[2px] bg-red-400/60 z-0"
          style={{ boxShadow: "0 0 6px rgba(248,113,113,0.55)" }}
        />

        {/* Hackathon cards timeline */}
        <div className="relative z-10 flex flex-col pt-4">
          {hackathons.map((h, i) => (
            <HackathonCard key={i} h={h} index={i} />
          ))}
        </div>

        {/* Summary note - sticky note style */}
        <div className="mt-16 mx-auto lg:ml-[50%] lg:translate-x-12 max-w-[300px] scroll-fade-in relative rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default" style={{ willChange: "transform" }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 border-2 border-red-500 rounded-full flex items-center justify-center opacity-70 z-20 shadow-md">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-inner" />
          </div>
          <div className="bg-[#FEFBED] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.12)] border border-[#F0EAC1] relative z-10" style={{ borderBottomRightRadius: "20px 5px" }}>
            <p className="text-[14px] text-stone-800 leading-relaxed font-medium" style={{ fontFamily: "var(--font-editorial)" }}>
              5 hackathons. 2 national podiums.<br/>Always Team Apex. Always shipping.
            </p>
            <p className="text-[9px] text-stone-500 mt-4 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
              Pull Shark & YOLO GitHub Badges
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
