"use client";

import React from "react";

export function NameBadge() {
  return (
    <div className="flex flex-col items-center">
      <a
        href="https://linkedin.com/in/aanand-modi-648687353"
        target="_blank"
        rel="noopener noreferrer"
        className="badge-swing flex flex-col items-center cursor-pointer group/badge"
      >
        {/* Lanyard strap */}
        <div className="w-[24px] h-[180px] relative shadow-sm z-0 rounded-b-sm" style={{
          background: "linear-gradient(180deg, #44403c 0%, #292524 100%)",
        }}>
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.25) 3px, rgba(255,255,255,0.25) 4px)",
            }}
          />
          <span
            className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 text-[5.5px] font-bold text-white/40 tracking-[0.25em] uppercase whitespace-nowrap select-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PORTFOLIO.2026
          </span>
        </div>

        {/* Metal clip */}
        <div className="w-[32px] h-[10px] rounded-b-md -mt-[1px] z-10" style={{
          background: "linear-gradient(180deg, #a8a29e 0%, #78716c 50%, #57534e 100%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
        }} />

        {/* Badge card */}
        <div className="rounded-2xl w-[190px] -mt-[2px] relative" style={{ perspective: "800px" }}>
          <div
            className="rounded-2xl overflow-hidden relative transition-transform duration-500 group-hover/badge:scale-[1.05]"
            style={{
              background: "linear-gradient(170deg, #faf9f7 0%, #f5f0e8 100%)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {/* Top accent bar */}
            <div className="h-[4px] w-full" style={{ background: "linear-gradient(90deg, #C4622D, #D4835B, #C4622D)" }} />

            {/* Avatar circle */}
            <div className="flex justify-center pt-5 pb-2">
              <div
                className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #e7e5e4, #d6d3d1)",
                  border: "3px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <span className="text-xl font-bold text-stone-500" style={{ fontFamily: "var(--font-display)" }}>AM</span>
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 rounded-full opacity-[0.06]" style={{
                  backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                  backgroundSize: "6px 6px",
                }} />
              </div>
            </div>

            {/* Name */}
            <div className="text-center px-4 pb-2">
              <h3 className="text-stone-800 font-bold text-[17px] tracking-[0.02em] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Aanand Modi
              </h3>
              <p className="text-[10px] text-stone-400 mt-1 tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Builder · Researcher
              </p>
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-stone-200/60" />

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 px-4 py-3">
              {["AI/ML", "Full Stack", "Published"].map((tag) => (
                <span
                  key={tag}
                  className="text-[7.5px] px-2.5 py-[3px] rounded-full bg-stone-100 text-stone-500 tracking-[0.1em] uppercase border border-stone-200/50"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom — location */}
            <div className="bg-stone-50/60 px-4 py-2 flex items-center justify-center gap-1.5" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <span className="text-[9px]">📍</span>
              <span className="text-[8.5px] text-stone-400 tracking-wider uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Ahmedabad, India
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
