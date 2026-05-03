"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { prompt: "$ whoami", output: "AI/ML Engineer · Full Stack Dev · Researcher" },
  { prompt: "$ cat motto.txt", output: '"Ship it, then iterate."' },
  { prompt: "$ ls ~/wins/", output: "2× national hackathon 🏆  published research 📄" },
];

export function RetroTerminal() {
  const [display, setDisplay] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Typing effect
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 3800;

    terminalLines.forEach((line, lineIdx) => {
      for (let c = 1; c <= line.prompt.length; c++) {
        timeouts.push(setTimeout(() => {
          setDisplay(prev => {
            const next = [...prev];
            next[lineIdx * 2] = line.prompt.slice(0, c);
            return next;
          });
        }, delay));
        delay += 30;
      }
      delay += 250;
      timeouts.push(setTimeout(() => {
        setDisplay(prev => {
          const next = [...prev];
          next[lineIdx * 2 + 1] = line.output;
          return next;
        });
      }, delay));
      delay += 350;
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const allDone = display.length > 0 && display[terminalLines.length * 2 - 1] !== undefined;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ rotate: 2 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 50, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
      className={`w-[360px] cursor-grab active:cursor-grabbing ${isDragging ? "" : "transition-transform duration-300 hover:scale-[1.03]"}`}
      style={{ zIndex: isDragging ? 50 : 20, touchAction: "none", willChange: "transform" }}
      onMouseEnter={() => allDone && !isDragging && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "#1c1917",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* macOS title bar — DRAG HANDLE */}
        <div
          className="flex items-center justify-between px-3.5 py-2.5"
          style={{
            background: "linear-gradient(to bottom, #292524, #1c1917)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-[7px]">
            <div className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E0443E]/70" />
            <div className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] border border-[#DEA123]/70" />
            <div className="w-[12px] h-[12px] rounded-full bg-[#28C840] border border-[#1AAB29]/70" />
          </div>
          <span className="text-[10px] text-stone-500 select-none tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
            aanand@dev ~ zsh
          </span>
          {/* Drag hint — subtle grip dots */}
          <div className="flex gap-[3px] opacity-30" title="Drag me!">
            <div className="grid grid-cols-2 gap-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[2px] h-[2px] rounded-full bg-stone-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Terminal body */}
        <div className="w-full p-4 overflow-hidden pointer-events-none" style={{ fontFamily: "var(--font-mono)", minHeight: "180px" }}>
          {terminalLines.map((line, i) => (
            <div key={i} className="mb-1">
              {display[i * 2] !== undefined && (
                <div className="text-[11.5px] leading-[1.8]">
                  <span className="text-emerald-400/80">❯</span>{" "}
                  <span className="text-stone-300">{display[i * 2]}</span>
                  {display[i * 2 + 1] === undefined && (
                    <span
                      className="inline-block w-[7px] h-[13px] bg-amber-400/70 ml-[2px] align-text-bottom rounded-[1px]"
                      style={{ animation: "cursor-blink 1s step-end infinite" }}
                    />
                  )}
                </div>
              )}
              {display[i * 2 + 1] !== undefined && (
                <div className="text-[11px] text-stone-500 mb-1.5 leading-[1.6]">{display[i * 2 + 1]}</div>
              )}
            </div>
          ))}
          {/* Idle cursor */}
          {allDone && !hovered && (
            <div className="text-[11.5px] leading-[1.8]">
              <span className="text-emerald-400/80">❯</span>{" "}
              <span
                className="inline-block w-[7px] h-[13px] bg-amber-400/70 ml-[1px] align-text-bottom rounded-[1px]"
                style={{ animation: "cursor-blink 1s step-end infinite" }}
              />
            </div>
          )}
          {/* Easter egg cat */}
          {hovered && allDone && (
            <div className="flex justify-center mt-2 opacity-90">
              <img src="/cat-dance.gif" alt="Dancing cat" className="h-[70px] rounded-md" draggable={false} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
