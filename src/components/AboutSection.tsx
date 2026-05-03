"use client";

import React, { useState } from "react";

/* ── Skills as physical sticky notes/Polaroids ── */
const skillGroups = [
  { label: "Core Langs", items: "Python, Java, TypeScript, Dart", color: "#FDF2BE", rotation: "-2deg", top: "10%", left: "5%" },
  { label: "AI & Data", items: "LangGraph, RAG, TensorFlow", color: "#F3DDE1", rotation: "3deg", top: "40%", left: "12%" },
  { label: "Frontend", items: "React, Next.js, Tailwind, Flutter", color: "#D1E8DF", rotation: "-4deg", top: "70%", left: "8%" },
  { label: "Backend", items: "Node.js, FastAPI, Firebase", color: "#E1E5F2", rotation: "2deg", top: "20%", left: "70%" },
  { label: "Cloud & Ops", items: "Docker, AWS, GCP, Linux", color: "#FDE6D4", rotation: "5deg", top: "50%", left: "75%" },
];

/* ── Sticky Note Component ── */
const SkillStickyNote = React.memo(function SkillStickyNote({ group }: { group: typeof skillGroups[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute w-[180px] p-4 shadow-md transition-all duration-300 cursor-pointer z-10"
      style={{
        backgroundColor: group.color,
        top: group.top,
        left: group.left,
        transform: `rotate(${isHovered ? "0deg" : group.rotation}) scale(${isHovered ? 1.05 : 1})`,
        boxShadow: isHovered ? "0 15px 30px rgba(0,0,0,0.15)" : "2px 4px 10px rgba(0,0,0,0.08)",
        borderBottomRightRadius: "20px 5px",
        willChange: "transform, box-shadow"
      }}
    >
      <div className="w-8 h-3 bg-black/10 absolute -top-1.5 left-1/2 -translate-x-1/2 -rotate-2" />
      <h4 className="text-[12px] font-bold text-stone-800 mb-2 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
        {group.label}
      </h4>
      <p className="text-[14px] text-stone-700 leading-snug" style={{ fontFamily: "var(--font-editorial)" }}>
        {group.items}
      </p>
    </div>
  );
});

export const AboutSection = React.memo(function AboutSection() {
  return (
    <section id="about" className="relative px-6 lg:px-8 py-20 lg:py-32 scroll-mt-16 overflow-hidden">
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{
        backgroundImage: `url('/paper-texture.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
      }} />

      {/* Grid lines for notebook feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{
        backgroundImage: `linear-gradient(transparent 95%, #C4622D 100%), linear-gradient(90deg, transparent 95%, #C4622D 100%)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="relative mx-auto max-w-[1200px] min-h-[800px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 scroll-fade-in relative z-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-stone-500 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            01 — The Builder
          </span>
          <div className="w-[100px] h-[2px] bg-stone-300" />
        </div>

        {/* Center content - The Diary Entry */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[500px] z-10 scroll-fade-in">
          <div className="bg-white/90 backdrop-blur-md p-8 pb-12 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.05)] border border-stone-100 relative">
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm -rotate-2 border border-white/20 shadow-sm" style={{ clipPath: "polygon(5% 0%, 95% 2%, 100% 100%, 0% 98%)" }} />
            
            <h2 className="text-stone-800 text-3xl md:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Aanand Modi
            </h2>
            
            <div className="space-y-4 text-stone-600 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-editorial)" }}>
              <p>
                I am a Computer Engineering student specializing in AI/ML, but honestly, I&apos;m just addicted to building things that work in the real world.
              </p>
              <p>
                From autonomous hiring pipelines to multi-agent formatting engines, I don&apos;t just study algorithms—I deploy them under pressure. I thrive in hackathons, tight deadlines, and ambitious ideas.
              </p>
              <div className="pt-4 mt-6 border-t border-stone-200 border-dashed flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-widest text-stone-400 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  Focus: Full Stack AI
                </span>
                <img src="/hand-drawn-line.svg" alt="" className="w-16 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Aesthetic scattered elements */}
        
        {/* Sketch image */}
        <div className="absolute -left-10 top-[20%] w-[250px] rotate-[-8deg] opacity-90 hidden md:block z-0 shadow-lg hover:rotate-[-2deg] transition-all duration-500 cursor-default" style={{willChange: "transform"}}>
          <div className="bg-[#f0ece1] p-3 pb-10 border border-stone-200">
            <img src="/sketch.jpg" alt="Sketch" className="w-full h-auto filter grayscale opacity-80 mix-blend-multiply" />
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 handwritten-font" style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}>Idea #402</p>
          </div>
        </div>

        {/* Coffee cup stain/image */}
        <div className="absolute right-[10%] top-[5%] w-[180px] rotate-[15deg] opacity-80 hidden lg:block z-0 pointer-events-none">
          <img src="/coffee.png" alt="Coffee" className="w-full h-auto drop-shadow-xl" />
        </div>

        {/* Apple Pencil */}
        <div className="absolute left-[30%] bottom-0 w-[300px] rotate-[45deg] opacity-90 hidden md:block z-20 pointer-events-none drop-shadow-2xl">
          <img src="/apple-pencil.png" alt="Pencil" className="w-full h-auto" />
        </div>

        {/* Sticky Notes for Skills */}
        <div className="hidden lg:block">
          {skillGroups.map((group) => (
            <SkillStickyNote key={group.label} group={group} />
          ))}
        </div>

        {/* Mobile skills view */}
        <div className="lg:hidden mt-[450px] relative z-20 grid grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="p-4 shadow-sm relative"
              style={{ backgroundColor: group.color, borderBottomRightRadius: "15px 5px" }}
            >
              <h4 className="text-[10px] font-bold text-stone-800 mb-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                {group.label}
              </h4>
              <p className="text-[12px] text-stone-700 leading-snug" style={{ fontFamily: "var(--font-editorial)" }}>
                {group.items}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

