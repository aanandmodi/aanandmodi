"use client";

import React, { useEffect, useRef, useState } from "react";
import { SectionDoodles } from "./SectionDoodles";
import { GithubPegboard } from "./GithubPegboard";


/* ── Skills as physical sticky notes/Polaroids ── */
const skillGroups = [
  { label: "Core Langs", items: "Python, Java, TypeScript, Dart", color: "var(--color-sticky-langs)", rotation: "-2deg", top: "10%", left: "5%" },
  { label: "AI & Data", items: "LangGraph, RAG, TensorFlow", color: "var(--color-sticky-ai)", rotation: "3deg", top: "40%", left: "12%" },
  { label: "Frontend", items: "React, Next.js, Tailwind, Flutter", color: "var(--color-sticky-frontend)", rotation: "-4deg", top: "70%", left: "8%" },
  { label: "Backend", items: "Node.js, FastAPI, Firebase", color: "var(--color-sticky-backend)", rotation: "2deg", top: "20%", left: "70%" },
  { label: "Cloud & Ops", items: "Docker, AWS, GCP, Linux", color: "var(--color-sticky-ops)", rotation: "5deg", top: "50%", left: "75%" },
];

/* ── Sticky Note Component ── */
const SkillStickyNote = React.memo(function SkillStickyNote({
  group,
  className = "",
}: {
  group: typeof skillGroups[0];
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full p-4 shadow-md transition-all duration-300 cursor-pointer z-10 ${className}`}
      style={{
        backgroundColor: group.color,
        transform: `rotate(${isHovered ? "0deg" : group.rotation}) scale(${isHovered ? 1.05 : 1})`,
        boxShadow: isHovered ? "0 15px 30px rgba(0,0,0,0.15)" : "2px 4px 10px rgba(0,0,0,0.08)",
        borderBottomRightRadius: "20px 5px",
        willChange: "transform, box-shadow"
      }}
    >
      <div className="w-8 h-3 bg-black/10 absolute -top-1.5 left-1/2 -translate-x-1/2 -rotate-2" />
      <h4 className="text-[12px] font-bold text-stone-900 dark:text-stone-100 mb-2 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
        {group.label}
      </h4>
      <p className="text-[14px] text-stone-800 dark:text-stone-200 leading-snug" style={{ fontFamily: "var(--font-editorial)" }}>
        {group.items}
      </p>
    </div>
  );
});

export const AboutSection = React.memo(function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".builder-reveal"));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("builder-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative px-6 lg:px-8 py-20 lg:py-32 scroll-mt-16 overflow-hidden">
      <SectionDoodles seed={1} tone="accent" density="extreme" />
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.15] dark:mix-blend-screen" style={{
        backgroundImage: `url('/paper-texture.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
      }} />

      {/* Grid lines for notebook feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(transparent 95%, #C4622D 100%), linear-gradient(90deg, transparent 95%, #C4622D 100%)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Coffee cup stain - placed relative to background */}
      <div className="absolute right-[8%] top-[6%] w-[180px] rotate-[15deg] opacity-70 dark:opacity-30 pointer-events-none hidden lg:block z-0 builder-reveal builder-reveal-right" style={{ "--builder-rot": "15deg" } as React.CSSProperties}>
        <img src="/coffee.png" alt="Coffee" className="w-full h-auto drop-shadow-xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 scroll-fade-in relative z-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            01 — The Builder
          </span>
          <div className="w-[100px] h-[2px] bg-stone-300 dark:bg-stone-800" />
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
          
          {/* Left Column: Diary Entry & Sketch & Pencil */}
          <div className="lg:col-span-7 relative flex flex-col gap-8">
            
            {/* The Diary Entry Card */}
            <div className="bg-white/95 dark:bg-stone-900/90 backdrop-blur-md p-8 pb-12 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.06),_0_1px_3px_rgba(0,0,0,0.03)] border border-stone-100 dark:border-stone-800 relative z-10 builder-reveal builder-reveal-center">
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 dark:bg-stone-800/40 backdrop-blur-sm -rotate-2 border border-white/20 dark:border-stone-700/20 shadow-sm" style={{ clipPath: "polygon(5% 0%, 95% 2%, 100% 100%, 0% 98%)" }} />
              
              <h2 className="text-stone-800 dark:text-stone-100 text-4xl md:text-5xl font-bold mb-5 tracking-tight" style={{ fontFamily: "var(--font-handwritten)", lineHeight: 1.05 }}>
                Aanand Modi
              </h2>
              
              <div className="space-y-4 text-stone-800 dark:text-stone-200 text-[28px] md:text-[30px] leading-[1.35]" style={{ fontFamily: "var(--font-handwritten)" }}>
                <p>
                  I am a Computer Engineering student specializing in AI/ML, but honestly, I&apos;m just addicted to building things that work in the real world.
                </p>
                <p>
                  From autonomous hiring pipelines to multi-agent formatting engines, I don&apos;t just study algorithms—I deploy them under pressure. I thrive in hackathons, tight deadlines, and ambitious ideas.
                </p>
                <div className="pt-4 mt-6 border-t border-stone-200 dark:border-stone-800 border-dashed flex justify-between items-center">
                  <span className="text-[18px] text-stone-550 dark:text-stone-400" style={{ fontFamily: "var(--font-handwritten)" }}>
                    Focus: Full Stack AI
                  </span>
                  <img src="/hand-drawn-line.svg" alt="" className="w-16 opacity-50 dark:invert dark:opacity-75" />
                </div>
              </div>
            </div>

            {/* Sketch polaroid - aligned cleanly under the diary on desktop / mobile */}
            <div className="relative md:absolute md:-left-8 md:top-[65%] w-full max-w-[240px] rotate-[-4deg] opacity-90 z-0 shadow-md hover:rotate-[-1deg] transition-all duration-500 cursor-default builder-reveal builder-reveal-left mx-auto md:mx-0" style={{ willChange: "transform", "--builder-rot": "-4deg" } as React.CSSProperties}>
              <div className="bg-[#f0ece1] dark:bg-stone-900 p-3 pb-8 border border-stone-200 dark:border-stone-800 shadow-sm">
                <img src="/sketch.jpg" alt="Sketch" className="w-full h-auto filter grayscale opacity-80 mix-blend-multiply dark:mix-blend-normal dark:opacity-60" />
                <p className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 dark:text-stone-400 handwritten-font" style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}>Idea #402</p>
              </div>
            </div>

            {/* Apple Pencil - lying at the bottom edge */}
            <div className="absolute left-[20%] -bottom-16 w-[260px] rotate-[22deg] opacity-90 hidden xl:block z-20 pointer-events-none drop-shadow-xl builder-reveal builder-reveal-up" style={{ "--builder-rot": "22deg" } as React.CSSProperties}>
              <img src="/apple-pencil.png" alt="Pencil" className="w-full h-auto" />
            </div>

          </div>

          {/* Right Column: Pegboard & Sticky Notes */}
          <div className="lg:col-span-5 relative flex flex-col gap-6">
            
            {/* Pegboard Contribution Card */}
            <div className="builder-reveal builder-reveal-up">
              <GithubPegboard />
            </div>

            {/* Responsive grid of skill sticky notes */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {skillGroups.map((group) => (
                <SkillStickyNote
                  key={group.label}
                  group={group}
                  className="builder-reveal builder-reveal-up"
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

