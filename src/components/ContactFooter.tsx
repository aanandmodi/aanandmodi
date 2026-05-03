"use client";

import React, { useState, useEffect, useRef } from "react";
import { SectionDoodles } from "./SectionDoodles";
import { InkHighlight } from "./InkHighlight";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/aanandmodi", emoji: "🐙", color: "#333333" },
  { label: "LinkedIn", url: "https://linkedin.com/in/aanand-modi-648687353", emoji: "💼", color: "#0077b5" },
  { label: "Email", url: "mailto:aanandmodi09@gmail.com", emoji: "✉️", color: "#ea4335" },
];

const brainrotQuotes = [
  "this portfolio goes hard fr fr 🔥",
  "no cap, shipping code at 3am 🌙",
  "slay the codebase bestie 💅",
  "it's giving... production-grade ✨",
  "built different, literally 🧠",
  "main character energy only 🎬",
  "rent free in your terminal 🏠",
  "not me debugging at 4am again 💀",
];

/* ── Playful Label Widget ── */
const StatusLabel = React.memo(function StatusLabel() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % brainrotQuotes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-10 right-10 lg:right-32 rotate-12 z-20 group cursor-default">
      {/* Tape piece */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm -rotate-6 z-10 shadow-sm" style={{ clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }} />
      <div className="bg-[#FEFBED] px-4 py-3 shadow-md border border-[#F0EAC1] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 rounded-sm" style={{ willChange: "transform" }}>
        <span className="text-[12px] text-stone-600 italic font-medium whitespace-nowrap" style={{ fontFamily: "var(--font-editorial)" }}>
          &ldquo;{brainrotQuotes[quoteIndex]}&rdquo;
        </span>
      </div>
    </div>
  );
});

/* ── Marquee Line ── */
const Marquee = React.memo(function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[#0D0D0D] py-3 my-16 border-y-2 border-[#C4622D] relative z-20 transform -rotate-2 scale-105 shadow-xl">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center mx-4">
            <span className="text-[#F5F0E8] text-[12px] uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
              OPEN FOR WORK
            </span>
            <span className="mx-4 text-[#C4622D] text-[14px]">✦</span>
            <span className="text-[#F5F0E8] text-[12px] uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
              LET&apos;S SHIP IT
            </span>
            <span className="mx-4 text-[#C4622D] text-[14px]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
});

/* ── Floating Emojis ── */
const FloatingEmojis = React.memo(function FloatingEmojis() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = false;

    const root = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0;
        if (visible && animationFrameId === 0) {
          animationFrameId = requestAnimationFrame(tick);
        }
      },
      { threshold: [0, 0.02, 0.1] }
    );
    if (root) observer.observe(root);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    function tick() {
      if (!visible) {
        animationFrameId = 0;
        return;
      }
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const container = containerRef.current;
      if (container) {
        const children = container.children;
        if (children[0]) {
          (children[0] as HTMLElement).style.transform =
            `translate3d(${currentX * 0.02}px, ${currentY * 0.02}px, 0)`;
        }
        if (children[1]) {
          (children[1] as HTMLElement).style.transform =
            `translate3d(${currentX * -0.01}px, ${currentY * -0.01}px, 0)`;
        }
        if (children[2]) {
          (children[2] as HTMLElement).style.transform =
            `translate3d(${currentX * -0.03}px, ${currentY * 0.02}px, 0)`;
        }
        if (children[3]) {
          (children[3] as HTMLElement).style.transform =
            `translate3d(${currentX * 0.01}px, ${currentY * -0.03}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="absolute top-[20%] left-[10%] text-5xl -rotate-12 opacity-80 drop-shadow-md" style={{ willChange: "transform" }}>🔥</div>
      <div className="absolute top-[60%] left-[5%] text-4xl rotate-12 opacity-60 drop-shadow-md" style={{ willChange: "transform" }}>💯</div>
      <div className="absolute top-[15%] right-[15%] text-6xl rotate-45 opacity-70 blur-[1px] drop-shadow-md" style={{ willChange: "transform" }}>✨</div>
      <div className="absolute bottom-[40%] right-[8%] text-5xl -rotate-12 opacity-90 drop-shadow-md" style={{ willChange: "transform" }}>🧠</div>
      
      {/* Playful drawn star */}
      <svg className="absolute top-[40%] left-[20%] w-12 h-12 text-[#C4622D] opacity-40 blur-[2px] rotate-6" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>

      <div className="absolute bottom-[20%] right-[25%] text-4xl -rotate-45 opacity-50 drop-shadow-md">👀</div>
    </div>
  );
});

export const ContactFooter = React.memo(function ContactFooter() {
  return (
    <section 
      id="contact" 
      className="relative pt-20 pb-8 scroll-mt-16 overflow-hidden bg-[#F5F0E8]"
    >
      <SectionDoodles seed={5} tone="warm" density="extreme" />
      {/* Background paper texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{
        backgroundImage: `url('/paper-texture.jpg')`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
      }} />

      {/* Grid lines to make it look like a planning board */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" style={{
        backgroundImage: `linear-gradient(transparent 95%, #C4622D 100%), linear-gradient(90deg, transparent 95%, #C4622D 100%)`,
        backgroundSize: "40px 40px",
      }} />

      <FloatingEmojis />

      <div className="relative z-20">
        <StatusLabel />

        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-8 scroll-fade-in">
            <span className="text-[11px] tracking-[0.3em] uppercase text-stone-500 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
              05 — Contact
            </span>
            <div className="flex-1 h-[2px] bg-stone-300" />
          </div>

          {/* Big Editorial CTA */}
          <div className="scroll-fade-in text-center lg:text-left mt-20 mb-12 relative">
            
            {/* Hand-drawn arrow pointing to button */}
            <svg className="hidden lg:block absolute -top-8 left-[60%] w-24 h-24 text-[#C4622D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: "rotate(15deg)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              <path d="M19 12 Q 15 2, 5 5" strokeWidth="2" fill="none" />
            </svg>

            <h2
              className="text-stone-900 mb-6 drop-shadow-sm"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              Let&apos;s build<br />
              <span className="relative inline-block mt-2">
                <InkHighlight color="#C4622D">
                  <span className="italic">something</span>
                </InkHighlight>
              </span><br/>
              together.
            </h2>
            
            <div className="inline-block relative">
               <p className="text-stone-600 text-[16px] max-w-[420px] mx-auto lg:mx-0 mb-10 leading-relaxed bg-[#FEFBED] p-4 border border-[#F0EAC1] shadow-sm -rotate-1 relative z-10" style={{ fontFamily: "var(--font-editorial)" }}>
                 Whether you need a 3AM hackathon partner, a deep-tech solution, or just want to talk about AI, let&apos;s connect. No cap.
               </p>
               {/* Tape */}
               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/60 backdrop-blur-sm rotate-3 z-20" style={{ clipPath: "polygon(0 0, 100% 10%, 95% 100%, 5% 90%)" }} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start mt-6">
              {/* Email CTA button */}
              <a
                href="mailto:aanandmodi09@gmail.com"
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#0D0D0D] text-[#F5F0E8] overflow-hidden group/cta transition-transform hover:scale-105 active:scale-95 shadow-[8px_8px_0px_rgba(196,98,45,1)] hover:shadow-[4px_4px_0px_rgba(196,98,45,1)] hover:translate-x-1 hover:translate-y-1 magnetic"
                style={{ fontFamily: "var(--font-mono)" }}
                data-cursor="link"
                data-cursor-label="email"
              >
                <div className="absolute inset-0 bg-[#C4622D] translate-y-[100%] group-hover/cta:translate-y-0 transition-transform duration-300 rounded-xl" />
                <span className="relative z-10 text-[13px] font-bold tracking-widest uppercase">
                  Say Hello
                </span>
                <span className="relative z-10 text-xl group-hover/cta:rotate-12 transition-transform duration-300">👋</span>
              </a>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.filter(l => l.label !== "Email").map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl border-2 border-stone-800 bg-white shadow-[4px_4px_0px_rgba(13,13,13,1)] flex items-center justify-center text-2xl transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-stone-100 group/social relative magnetic"
                    data-cursor="link"
                    data-cursor-label={link.label.toLowerCase()}
                  >
                    <span className="group-hover/social:scale-110 group-hover/social:-rotate-12 transition-transform duration-300">
                      {link.emoji}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-[#0D0D0D] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/social:opacity-100 transition-opacity whitespace-nowrap font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      {link.label}
                      {/* Triangle pointer */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0D0D0D] rotate-45" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Marquee />

        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {/* Footer bottom */}
          <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-stone-200 border-dashed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 border-2 border-stone-400 flex items-center justify-center text-[12px] font-bold text-stone-600 shadow-inner" style={{ fontFamily: "var(--font-display)" }}>
                AM
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-stone-500 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  Aanand Modi © {new Date().getFullYear()}
                </span>
                <span className="text-[9px] text-stone-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  All rights reserved.
                </span>
              </div>
            </div>
            
            {/* Receipt style sign-off */}
            <div className="bg-white px-5 py-3 border-2 border-stone-200 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] -rotate-2 hover:rotate-0 transition-transform">
              <span className="text-[11px] text-stone-500 flex items-center gap-2 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                Built in Ahmedabad <span className="inline-block animate-bounce text-[#C4622D] text-lg">♥</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
