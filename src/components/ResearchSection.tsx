"use client";

import React, { useState, useRef, useCallback } from "react";

const papers = [
  {
    title: "Navigating the Nutritional Maze: A Case for the Food Insight Scanner for Personalized Health",
    venue: "ICEM 2026",
    journal: "IJRISS",
    issn: "ISSN: 2454-6186",
    year: "February 2026",
    coAuthors: "Aanand Modi, Abhishek Agarwal",
    advisor: "Asst. Prof. K. Ramya",
    abstract: "Proposed an AI-powered mobile system using OCR, Indian food database, and personalized health engine to address India's food labeling crisis affecting 212 million diabetics. Accepted in 7 days.",
    doi: "https://doi.org/10.47772/IJRISS.2026.10190029",
    conference: "NSB Bangalore",
    tags: ["AI/ML", "Healthcare", "OCR", "Mobile Computing", "Personalization"],
    color: "#9680C2",
  },
];

const ResearchCard = React.memo(function ResearchCard({ paper }: { paper: typeof papers[0] }) {
  const [copiedDoi, setCopiedDoi] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  const applyTilt = useCallback(() => {
    rafRef.current = undefined;
    const el = innerRef.current;
    if (!el) return;
    const { x, y } = tiltTarget.current;
    el.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  }, []);

  const scheduleTilt = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(applyTilt);
  }, [applyTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      tiltTarget.current = { x, y };
      scheduleTilt();
    },
    [scheduleTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = undefined;
    tiltTarget.current = { x: 0, y: 0 };
    if (innerRef.current) {
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  const copyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  return (
    <div className="scroll-fade-in relative z-10 w-full max-w-[800px] mx-auto">
      
      {/* Playful Bookmark sticking out */}
      <div className="absolute -top-6 right-8 lg:right-16 w-8 h-16 bg-[#C4622D] rounded-b-md shadow-md z-0 origin-top transform hover:scale-y-110 transition-transform duration-300" 
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)", willChange: "transform" }} />

      {/* Paper card — physical paper look with 3D tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 rounded-xl overflow-hidden cursor-default"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={innerRef}
          className="rounded-xl overflow-hidden transition-[box-shadow,border-color] duration-400 ease-out"
          style={{
            transform: "rotateX(0deg) rotateY(0deg)",
            transformStyle: "preserve-3d",
            background: "#fdfcfb",
            border: `1px solid #e7e5e4`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
            willChange: "transform",
          }}
        >
        {/* Top border accent */}
        <div className="h-[4px] w-full" style={{ background: `linear-gradient(90deg, ${paper.color}, ${paper.color}60, transparent)` }} />

        <div className="p-6 lg:p-10 relative">
          {/* Journal Stamp */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 opacity-10 rotate-12 pointer-events-none">
            <div className="border-4 border-[#9680C2] rounded-full w-24 h-24 flex items-center justify-center">
              <span className="text-[#9680C2] font-bold text-xl uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", transform: "rotate(-15deg)" }}>
                PUBLISHED
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md font-medium uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  {paper.journal}
                </span>
                <span className="text-[10px] text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>
                  {paper.year}
                </span>
                <span className="text-[10px] text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>
                  • {paper.issn}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-stone-800" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}>
                {paper.title}
              </h3>
            </div>

            {/* Authors & Info box */}
            <div className="p-4 rounded-lg border border-stone-100 bg-stone-50/50 flex flex-col gap-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest w-16" style={{ fontFamily: "var(--font-mono)" }}>Authors</span>
                <span className="text-[13px] text-stone-700 font-medium" style={{ fontFamily: "var(--font-body)" }}>{paper.coAuthors}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest w-16" style={{ fontFamily: "var(--font-mono)" }}>Advisor</span>
                <span className="text-[13px] text-stone-500 italic" style={{ fontFamily: "var(--font-editorial)" }}>{paper.advisor}</span>
              </div>
            </div>

            {/* Abstract */}
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-4 h-[1px] bg-stone-300" /> Abstract
              </p>
              <p className="text-[14px] text-stone-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {paper.abstract}
              </p>
            </div>

            {/* Footer (Tags & Action) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-6 mt-2 border-t border-stone-100">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {paper.tags.map((tag) => (
                  <span key={tag} className="text-[9px] px-2 py-1 bg-stone-50 border border-stone-200 text-stone-500 rounded-md transition-colors hover:bg-[#9680C2] hover:text-white hover:border-[#9680C2]" style={{ fontFamily: "var(--font-mono)", willChange: "background-color, color, border-color" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => copyDoi(paper.doi)}
                  className="group relative px-3 py-1.5 rounded-md overflow-hidden bg-stone-100 border border-stone-200 transition-all active:scale-95"
                  style={{ willChange: "transform" }}
                >
                  <div className="absolute inset-0 bg-stone-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ willChange: "transform" }} />
                  <span className="relative z-10 text-[10px] text-stone-600 font-medium flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    {copiedDoi ? (
                      <>
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                        Copy DOI
                      </>
                    )}
                  </span>
                </button>
                
                <a
                  href={paper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-4 py-1.5 rounded-md overflow-hidden bg-[#9680C2] transition-all active:scale-95"
                  style={{ willChange: "transform" }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" style={{ willChange: "transform" }} />
                  <span className="relative z-10 text-[10px] text-white font-medium flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                    View Publication
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ willChange: "transform" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Cute note below paper */}
      <div className="flex items-center gap-2 mt-4 ml-4">
        <span className="text-[18px] animate-bounce" style={{ animationDuration: "2s", willChange: "transform" }}>⚡</span>
        <span className="text-[11px] text-stone-500 italic" style={{ fontFamily: "var(--font-editorial)" }}>
          Accepted in 7 days — published at {paper.conference}
        </span>
      </div>
    </div>
  );
});

export const ResearchSection = React.memo(function ResearchSection() {
  return (
    <section id="research" className="relative px-6 lg:px-8 pt-20 lg:pt-32 pb-16 scroll-mt-16 overflow-hidden">
      {/* Paper texture background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]" style={{
        backgroundImage: `url('/paper-texture.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
      }} />

      {/* Playful background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #9680C2 1.5px, transparent 1.5px)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Floating decorative stickers in background */}
      <div className="absolute top-20 right-10 lg:right-32 opacity-20 rotate-12 blur-[1px] pointer-events-none select-none text-[80px]">
        🔬
      </div>
      <div className="absolute bottom-10 left-10 lg:left-20 opacity-20 -rotate-12 blur-[1px] pointer-events-none select-none text-[60px]">
        📖
      </div>

      <div className="mx-auto max-w-[1000px] relative">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 scroll-fade-in">
          <span className="text-[11px] tracking-[0.3em] uppercase text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>
            03 — Research
          </span>
          <div className="flex-1 h-[1px] bg-stone-200" />
        </div>

        {/* Editorial intro */}
        <div className="mb-12 scroll-fade-in relative">
          <h2
            className="text-stone-800 max-w-[600px] relative z-10"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Turning <span style={{ color: "#9680C2", fontStyle: "italic" }}>hypothesis</span> into peer-reviewed reality.
          </h2>
          
          {/* Hand-drawn curly underline */}
          <svg className="absolute -bottom-4 left-0 w-[120px] h-[20px] text-[#9680C2] opacity-60 z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {papers.map((paper, i) => (
          <ResearchCard key={i} paper={paper} />
        ))}
      </div>
    </section>
  );
});

