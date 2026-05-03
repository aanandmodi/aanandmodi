"use client";

import React, { useCallback, useRef } from "react";

export function NameBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = px * 10;
    const rotX = py * -10;
    inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
  }, []);

  const onLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  }, []);

  return (
    <div className="flex flex-col items-center">
      <a
        href="https://linkedin.com/in/aanand-modi-648687353"
        target="_blank"
        rel="noopener noreferrer"
        className="badge-swing flex flex-col items-center cursor-pointer group/badge magnetic"
        data-cursor="link"
        data-cursor-label="linkedin"
      >
        {/* Lanyard strap */}
        <div
          className="w-[26px] h-[180px] relative shadow-sm z-0 rounded-b-sm overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #44403c 0%, #1c1917 100%)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
          }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.25) 3px, rgba(255,255,255,0.25) 4px)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 0.6px, transparent 0.6px)",
            backgroundSize: "8px 8px",
          }} />
          <span
            className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 text-[5.5px] font-bold text-white/40 tracking-[0.25em] uppercase whitespace-nowrap select-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PORTFOLIO.2026
          </span>
        </div>

        {/* Metal clip */}
        <div
          className="w-[36px] h-[10px] rounded-b-md -mt-[1px] z-10"
          style={{
            background: "linear-gradient(180deg, #d6d3d1 0%, #a8a29e 45%, #78716c 100%)",
            boxShadow: "0 10px 18px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        />

        {/* Badge card */}
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="rounded-2xl w-[210px] -mt-[2px] relative"
          style={{ perspective: "900px" }}
        >
          {/* Paper stack backer */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              transform: "translate(8px, 10px) rotate(2.2deg)",
              background: "linear-gradient(180deg, rgba(245,240,232,0.9), rgba(231,229,228,0.85))",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
            }}
          />
          <div
            ref={innerRef}
            className="rounded-2xl overflow-hidden relative transition-[transform] duration-500"
            style={{
              background: "linear-gradient(170deg, #fdfcfb 0%, #f5f0e8 100%)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 10px 34px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.06)",
              transform: "rotateX(0deg) rotateY(0deg) translateZ(0)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top accent bar */}
            <div className="h-[4px] w-full" style={{ background: "linear-gradient(90deg, #C4622D, #D4835B, #F59E0B)" }} />

            {/* Subtle grain + micro grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
              backgroundImage:
                "linear-gradient(rgba(28,25,23,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.10) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              mixBlendMode: "multiply",
            }} />

            {/* Holo sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 48%, transparent 61%)",
                transform: "translateX(-120%)",
                animation: "hero-glare 1.1s ease-in-out both",
              }}
            />

            {/* Avatar circle */}
            <div className="flex justify-center pt-5 pb-2 relative">
              <div
                className="w-[76px] h-[76px] rounded-full overflow-hidden flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #e7e5e4, #d6d3d1)",
                  border: "3px solid #fff",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Aanand Modi"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <img
                  src="/avatar-hover.gif"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"
                  draggable={false}
                />
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 rounded-full opacity-[0.06]" style={{
                  backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                  backgroundSize: "6px 6px",
                }} />
              </div>

              {/* Verified stamp */}
              <div
                className="absolute -right-2 -bottom-1 rotate-12"
                style={{
                  background: "rgba(196,98,45,0.10)",
                  border: "1px solid rgba(196,98,45,0.35)",
                  borderRadius: 999,
                  padding: "4px 7px",
                  boxShadow: "0 6px 16px rgba(196,98,45,0.12)",
                }}
              >
                <span className="text-[8px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)", color: "#C4622D" }}>
                  verified
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="text-center px-4 pb-2">
              <h3 className="text-stone-800 font-bold text-[18px] tracking-[0.01em] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Aanand Modi
              </h3>
              <p className="text-[10px] text-stone-400 mt-1 tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Builder · Researcher
              </p>
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-stone-200/60" />

            {/* Tags + micro signature */}
            <div className="flex flex-wrap justify-center gap-1.5 px-4 pt-3 pb-2">
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

            <div className="px-5 pb-3 flex items-center justify-between">
              <span className="text-[20px] text-stone-700/80" style={{ fontFamily: "var(--font-handwritten)" }}>
                Aanand
              </span>
              {/* Tiny QR-ish mark */}
              <svg width="34" height="34" viewBox="0 0 34 34" className="opacity-70">
                <rect x="1" y="1" width="32" height="32" rx="6" fill="rgba(28,25,23,0.04)" stroke="rgba(28,25,23,0.10)" />
                <path d="M8 8h6v6H8zM20 8h6v6h-6zM8 20h6v6H8z" fill="rgba(28,25,23,0.45)" />
                <path d="M20 20h3v3h-3zM24 24h2v2h-2zM23 20h3v6h-2v-4h-1z" fill="rgba(28,25,23,0.35)" />
              </svg>
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
