"use client";

import React, { useState, useEffect } from "react";
import { DotMatrixBoard } from "./DotMatrix";
import { RetroTerminal } from "./RetroTerminal";
import { NameBadge } from "./NameBadge";
import { VinylCard } from "./VinylCard";
import { MacFolder } from "./MacFolder";

const LocalTime = React.memo(function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const hour12 = h % 12 || 12;
      const ampm = h >= 12 ? "PM" : "AM";
      setTime(`AHM ${String(hour12).padStart(2, "0")}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <div className="hidden lg:flex flex-col items-end tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
      <span className="text-[9px] text-stone-400">Local Time</span>
      <span className="text-[11px] text-stone-800 font-medium">{time}</span>
    </div>
  );
});

/* ── Cozy star/dust particles ── */
const CozyDust = React.memo(function CozyDust() {
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number; opacity: number }[]>([]);

  useEffect(() => {
    const p = [];
    for (let i = 0; i < 30; i++) {
      p.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 4,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: `rgba(196, 98, 45, ${p.opacity})`,
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
});

/* ── Massive code decorations — cozy scattered everywhere ── */
const codeDecorations = [
  // Top scatter
  { symbol: "{ }", top: "3%", left: "5%", size: "28px", rotate: "-12deg", delay: "0s", opacity: 0.06 },
  { symbol: "</>", top: "6%", left: "22%", size: "20px", rotate: "8deg", delay: "1.2s", opacity: 0.08 },
  { symbol: "fn()", top: "2%", left: "42%", size: "14px", rotate: "-3deg", delay: "2.4s", opacity: 0.05 },
  { symbol: "=>", top: "5%", left: "65%", size: "24px", rotate: "15deg", delay: "0.6s", opacity: 0.07 },
  { symbol: "[ ]", top: "3%", left: "80%", size: "22px", rotate: "-8deg", delay: "1.8s", opacity: 0.06 },
  { symbol: "//", top: "8%", left: "93%", size: "18px", rotate: "20deg", delay: "0.3s", opacity: 0.05 },
  // Left edge
  { symbol: "&&", top: "20%", left: "2%", size: "16px", rotate: "10deg", delay: "1.5s", opacity: 0.07 },
  { symbol: "!=", top: "35%", left: "1%", size: "20px", rotate: "-15deg", delay: "2.8s", opacity: 0.04 },
  { symbol: "let", top: "50%", left: "3%", size: "14px", rotate: "5deg", delay: "0.9s", opacity: 0.06 },
  { symbol: "( )", top: "65%", left: "2%", size: "22px", rotate: "-20deg", delay: "3.2s", opacity: 0.05 },
  { symbol: ";;", top: "78%", left: "4%", size: "12px", rotate: "12deg", delay: "1.1s", opacity: 0.07 },
  // Right edge
  { symbol: "$ _", top: "18%", left: "96%", size: "16px", rotate: "18deg", delay: "2.2s", opacity: 0.05 },
  { symbol: "++", top: "30%", left: "95%", size: "20px", rotate: "-10deg", delay: "0.7s", opacity: 0.06 },
  { symbol: "async", top: "45%", left: "97%", size: "11px", rotate: "6deg", delay: "3.5s", opacity: 0.04 },
  { symbol: "/* */", top: "60%", left: "94%", size: "14px", rotate: "-14deg", delay: "1.6s", opacity: 0.07 },
  { symbol: "::", top: "75%", left: "96%", size: "18px", rotate: "22deg", delay: "2.0s", opacity: 0.05 },
  // Bottom scatter
  { symbol: "import", bottom: "5%", left: "8%", size: "12px", rotate: "4deg", delay: "2.6s", opacity: 0.04 },
  { symbol: "<<", bottom: "3%", left: "25%", size: "20px", rotate: "-8deg", delay: "1.3s", opacity: 0.06 },
  { symbol: ">>", bottom: "7%", left: "40%", size: "18px", rotate: "11deg", delay: "0.4s", opacity: 0.05 },
  { symbol: "null", bottom: "4%", left: "58%", size: "14px", rotate: "-6deg", delay: "3.8s", opacity: 0.04 },
  { symbol: ".map", bottom: "6%", left: "72%", size: "12px", rotate: "16deg", delay: "1.9s", opacity: 0.06 },
  { symbol: "→", bottom: "3%", left: "88%", size: "22px", rotate: "-12deg", delay: "2.3s", opacity: 0.05 },
  // Inner scatter (near center, very faint)
  { symbol: "~", top: "25%", left: "15%", size: "30px", rotate: "-5deg", delay: "4.0s", opacity: 0.03 },
  { symbol: "λ", top: "40%", left: "85%", size: "26px", rotate: "8deg", delay: "3.0s", opacity: 0.03 },
  { symbol: "∞", bottom: "20%", left: "12%", size: "24px", rotate: "14deg", delay: "2.1s", opacity: 0.04 },
  { symbol: "π", bottom: "25%", left: "90%", size: "22px", rotate: "-18deg", delay: "1.4s", opacity: 0.03 },
  { symbol: "Σ", top: "15%", left: "50%", size: "20px", rotate: "3deg", delay: "4.5s", opacity: 0.03 },
  { symbol: "∂", bottom: "15%", left: "55%", size: "18px", rotate: "-9deg", delay: "3.3s", opacity: 0.04 },
];

const FloatingCode = React.memo(function FloatingCode() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {codeDecorations.map((d, i) => (
        <span
          key={i}
          className="absolute select-none code-decoration hidden md:block"
          style={{
            fontFamily: "var(--font-mono)",
            top: d.top,
            left: d.left,
            bottom: d.bottom,
            fontSize: d.size,
            opacity: d.opacity,
            color: "#78716C",
            "--rotate": d.rotate,
            animationDelay: d.delay,
            willChange: "transform",
          } as React.CSSProperties}
        >
          {d.symbol}
        </span>
      ))}
    </div>
  );
});

/* ── Cozy sticky note ── */
const StickyNote = React.memo(function StickyNote({ text, rotate, top, left, color = "#FFF9C4", width = "140px", delay = "3s" }: {
  text: string; rotate: string; top: string; left: string; color?: string; width?: string; delay?: string;
}) {
  return (
    <div
      className="absolute z-20 transition-all duration-500 hover:scale-110 hover:rotate-0 hover:-translate-y-2 cursor-pointer"
      style={{
        top, left, transform: `rotate(${rotate})`, width,
        animation: `hero-pop 0.6s cubic-bezier(0.4,0,0.2,1) ${delay} both`,
      }}
    >
      <div
        className="p-3 shadow-md"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
          boxShadow: "2px 3px 10px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <p className="text-[10px] text-stone-600 leading-relaxed whitespace-pre-line" style={{ fontFamily: "var(--font-editorial)" }}>
          {text}
        </p>
      </div>
    </div>
  );
});

/* ── Coffee steam animation ── */
const CoffeeSteam = React.memo(function CoffeeSteam() {
  return (
    <div className="absolute pointer-events-none" style={{ top: "-12px", left: "50%", transform: "translateX(-50%)" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "4px",
            height: "12px",
            background: "rgba(168, 162, 158, 0.2)",
            left: `${i * 6 - 6}px`,
            filter: "blur(2px)",
            animation: `steam-rise 2.5s ease-out ${i * 0.4}s infinite`,
            willChange: "transform, opacity, filter"
          }}
        />
      ))}
    </div>
  );
});

export const HeroSection = React.memo(function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-visible">
      <CozyDust />
      <FloatingCode />

      {/* ══════ DESKTOP: Cozy scattered desk layout ══════ */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-4 relative z-10">
        <div className="relative w-[1400px] h-[900px] overflow-visible" style={{ maxWidth: "100vw" }}>

          {/* ── Name: Left-aligned editorial title ── */}
          <div className="absolute top-[38%] left-[80px] -translate-y-1/2 z-10">
            <div className="relative hero-entrance" style={{ "--delay": "0.3s" } as React.CSSProperties}>
              <h1
                className="text-stone-800"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "7rem",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                }}
              >
                Aanand
              </h1>
              <h1
                className="text-stone-800"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "7rem",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  fontStyle: "italic",
                }}
              >
                Modi<span className="text-[#C4622D]">.</span>
              </h1>
              {/* Glare sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ animation: "hero-glare 1.2s ease-in-out 5s both" }}>
                <div className="absolute top-0 h-full w-[60%] -skew-x-12" style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 52%, rgba(255,255,255,0.2) 75%, transparent 100%)",
                }} />
              </div>
            </div>

            {/* Tagline */}
            <p
              className="text-stone-400 tracking-[0.25em] uppercase mt-6 hero-entrance"
              style={{ fontFamily: "var(--font-mono)", fontSize: "12px", "--delay": "1.6s" } as React.CSSProperties}
            >
              I build, then I ship
            </p>

            {/* Short bio below name */}
            <p
              className="text-stone-500 mt-4 max-w-[380px] leading-relaxed hero-entrance"
              style={{ fontFamily: "var(--font-body)", fontSize: "14px", "--delay": "2.0s" } as React.CSSProperties}
            >
              AI/ML engineer & full-stack builder from Ahmedabad.
              Published researcher, 2× national hackathon finalist.
              I build things that ship.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-5 hero-entrance" style={{ "--delay": "2.3s" } as React.CSSProperties}>
              <div className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" style={{willChange: "opacity"}} />
              <span className="text-[10px] text-stone-400 tracking-wider uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                Open to opportunities
              </span>
            </div>
          </div>

          {/* ── Name badge: Top right area ── */}
          <div
            className="absolute right-[100px] top-[-70px] z-20"
            style={{ animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 1.8s both", willChange: "opacity, transform" }}
          >
            <NameBadge />
          </div>

          {/* ── Terminal: centered, nudged right — below ripped-paper desk cluster (matches layout reference) ── */}
          <div
            className="absolute left-[calc(50%-70px)] top-[clamp(400px,42vw,460px)] z-20"
            style={{ animation: "hero-slide-right 0.7s cubic-bezier(0.4,0,0.2,1) 2.5s both", willChange: "opacity, transform" }}
          >
            <RetroTerminal />
          </div>

          {/* ── Vinyl card: Bottom left ── */}
          <div
            className="absolute left-[100px] bottom-[40px] z-30 -rotate-[3deg] transition-all duration-300 hover:rotate-[1deg] hover:scale-[1.05] hover:-translate-y-3"
            style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 2.8s both", willChange: "opacity, transform" }}
          >
            <VinylCard />
          </div>

          {/* ── Mac folder: Bottom center-right ── */}
          <div
            className="absolute left-[550px] bottom-[50px] z-30 rotate-[4deg]"
            style={{ perspective: "500px", animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 3.0s both", willChange: "opacity, transform" }}
          >
            <MacFolder />
          </div>

          {/* ── Dot matrix: Right of name ── */}
          <div
            className="absolute left-[580px] top-[180px] z-20 rotate-[6deg] scale-[0.6] transition-transform duration-300 ease-out hover:scale-[0.66] hover:rotate-[2deg] group/matrix"
            style={{ animation: "hero-slide-left 0.7s cubic-bezier(0.4,0,0.2,1) 2.6s both", willChange: "opacity, transform" }}
          >
            <DotMatrixBoard />
          </div>

          {/* ── Ripped paper + cozy desk items ── */}
          <div
            className="absolute top-[30px] left-[550px] z-15 rotate-[-4deg] transition-all duration-300 hover:scale-105 hover:rotate-[-1deg] group/paper"
            style={{ animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 2.4s both", willChange: "opacity, transform" }}
          >
            <img
              src="/ripped-paper.png"
              alt="Ripped paper"
              className="w-[460px] opacity-90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              draggable={false}
            />
            {/* Ice coffee with steam */}
            <div className="absolute top-[48%] left-[55%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <CoffeeSteam />
                <img src="/ice-coffee.png" alt="Ice coffee" className="w-[75px] drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)] hover:coffee-wobble" draggable={false} style={{willChange: "transform"}} />
              </div>
            </div>
            {/* Plant */}
            <div className="absolute top-[68%] left-[18%] -translate-x-1/2 -translate-y-1/2">
              <img src="/plant.png" alt="Plant" className="w-[130px] drop-shadow-[0_3px_6px_rgba(0,0,0,0.12)] scale-[1.4] rotate-[-4deg] plant-hover" draggable={false} style={{willChange: "transform"}} />
            </div>
            {/* Apple pencil */}
            <div className="absolute top-1/2 left-[78%] -translate-x-1/2 -translate-y-1/2 group/pencil">
              <img src="/apple-pencil.png" alt="Pencil" className="w-[60px] drop-shadow-[0_3px_6px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover/pencil:scale-110 group-hover/pencil:-translate-y-2" draggable={false} style={{willChange: "transform"}} />
              <div className="absolute -bottom-[5px] left-[0px] w-[80px] h-[10px] pointer-events-none overflow-hidden">
                <img src="/hand-drawn-line.svg" alt="" className="w-full h-full object-contain pencil-line" draggable={false} />
              </div>
            </div>
          </div>

          {/* ── Flower: Near center ── */}
          <div
            className="absolute left-[480px] top-[380px] z-20 group/flower"
            style={{ animation: "hero-pop 0.7s cubic-bezier(0.4,0,0.2,1) 3.2s both", willChange: "transform, opacity" }}
          >
            <div className="relative w-[80px] rotate-[-5deg] transition-all duration-500 ease-out group-hover/flower:scale-[1.6] group-hover/flower:rotate-[-1deg] group-hover/flower:-translate-y-4 group-hover/flower:z-40" style={{ willChange: "transform" }}>
              <img src="/flower.png" alt="" className="w-full transition-opacity duration-500 ease-out group-hover/flower:opacity-0" draggable={false} />
              <img src="/flower hover.png" alt="" className="absolute inset-0 w-full opacity-0 transition-opacity duration-500 ease-out group-hover/flower:opacity-100" draggable={false} />
            </div>
          </div>

          {/* ── Image collage with cat ── */}
          <div
            className="absolute right-[50px] bottom-[60px] z-10 rotate-[5deg] transition-transform duration-300 ease-out hover:rotate-[1deg] hover:scale-105 cursor-pointer group/collage overflow-visible"
            style={{ animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.4s both", willChange: "transform, opacity" }}
          >
            <div className="relative overflow-visible">
              <img
                src="/cat.png"
                alt="Cat peeking"
                className="absolute top-[25%] right-[10%] w-[150px] z-20 transition-[transform,opacity] duration-500 ease-out scale-0 opacity-0 origin-center group-hover/collage:scale-100 group-hover/collage:opacity-100 group-hover/collage:rotate-[6deg] drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)] group-hover/collage:-translate-y-2"
                style={{ willChange: "transform, opacity" }}
              />
              <img src="/image-collage.jpg" alt="Photo collage" className="w-[280px] rounded-xl shadow-md relative z-10" />
            </div>
          </div>

          {/* ── Cozy sticky notes ── */}
          <StickyNote
            text={"TODO:\n☑ Ship v2 of JARVIS\n☐ Write ML paper\n☐ Win another hackathon"}
            rotate="-3deg" top="560px" left="370px"
            color="#FFF9C4" width="150px" delay="3.3s"
          />
          <StickyNote
            text={'"The best code is\nthe code that ships."'}
            rotate="4deg" top="120px" left="920px"
            color="#E8F5E9" width="130px" delay="3.6s"
          />

          {/* ── Decorative accents ── */}
          <img
            src="/yellow-star.svg" alt=""
            className="absolute left-[460px] top-[320px] w-[22px] z-30 cursor-pointer hover:scale-150 hover:rotate-[180deg] transition-all duration-700"
            style={{ animation: "hero-pop 0.5s cubic-bezier(0.4,0,0.2,1) 3.5s both", willChange: "transform, opacity" }}
            draggable={false}
          />
          <img
            src="/star.svg" alt=""
            className="absolute right-[450px] bottom-[100px] w-[22px] opacity-20 pointer-events-none"
            style={{ animation: "code-float 6s ease-in-out infinite", willChange: "transform" }}
            draggable={false}
          />
          <img
            src="/messy.svg" alt=""
            className="absolute right-[200px] top-[700px] w-[100px] opacity-[0.06] pointer-events-none rotate-12"
            draggable={false}
          />
          <img
            src="/pixel-flower.svg" alt=""
            className="absolute left-[340px] top-[200px] w-[35px] opacity-[0.08] pointer-events-none rotate-[-15deg]"
            style={{ animation: "code-float 8s ease-in-out 1s infinite", willChange: "transform" }}
            draggable={false}
          />

          {/* ── Highlights / underline SVG ── */}
          <img
            src="/highlights.svg" alt=""
            className="absolute left-[85px] top-[calc(38%+85px)] w-[320px] opacity-[0.15] pointer-events-none"
            style={{ animation: "hero-fade-in 0.8s cubic-bezier(0.4,0,0.2,1) 1.2s both", willChange: "opacity, transform" }}
            draggable={false}
          />

          {/* ── Local time widget ── */}
          <div className="absolute top-[30px] right-[30px] z-10 hero-entrance" style={{ "--delay": "1.0s" } as React.CSSProperties}>
            <LocalTime />
          </div>

          {/* ── Warm paper texture overlay on edges ── */}
          <div className="absolute inset-0 pointer-events-none z-0 rounded-[40px]" style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(245,240,232,0.4) 100%)",
          }} />
        </div>
      </div>

      {/* ══════ MOBILE: Stacked layout ══════ */}
      <div className="lg:hidden px-6 pt-20 pb-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400" style={{ fontFamily: "var(--font-mono)" }}>
            Portfolio / 2026
          </span>
          <LocalTime />
        </div>

        <h1
          className="text-stone-800"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 12vw, 4rem)",
            fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em",
          }}
        >
          Aanand
        </h1>
        <h1
          className="text-stone-800 mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 12vw, 4rem)",
            fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", fontStyle: "italic",
          }}
        >
          Modi<span className="text-[#C4622D]">.</span>
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" style={{willChange: "opacity"}} />
          <span className="text-[9px] text-stone-400 tracking-wider uppercase" style={{ fontFamily: "var(--font-mono)" }}>Open to opportunities</span>
        </div>

        <p className="text-stone-500 max-w-[400px] mb-10" style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.6 }}>
          AI/ML engineer & full-stack builder. Published researcher, 2× national hackathon finalist. I build things that ship.
        </p>

        <div className="mb-8">
          <RetroTerminal />
        </div>

        <div className="w-[160px] p-3 -rotate-2 mx-auto mb-8" style={{
          background: "linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)",
          boxShadow: "2px 3px 8px rgba(0,0,0,0.06)",
        }}>
          <p className="text-[9px] text-stone-600 font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>NOTE:</p>
          <p className="text-[11px] text-stone-700 leading-relaxed" style={{ fontFamily: "var(--font-editorial)" }}>
            Ship fast,<br />learn faster.<br />Break things beautifully.
          </p>
        </div>
      </div>
    </section>
  );
});

