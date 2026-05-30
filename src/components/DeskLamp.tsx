"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const playClickSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("Audio click failed to play: ", e);
  }
};

export function DeskLamp() {
  const [isDark, setIsDark] = useState(false);
  const controls = useAnimation();

  // On mount, check if body has dark mode active
  useEffect(() => {
    if (typeof window !== "undefined") {
      const active = document.documentElement.classList.contains("dark");
      setIsDark(active);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    if (typeof window === "undefined") return;

    playClickSound();

    // Pull string animation sequence
    controls.start({
      y: 24,
      transition: { duration: 0.1, ease: "easeIn" }
    }).then(() => {
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      });
    });

    const nextMode = !isDark;
    setIsDark(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, controls]);

  return (
    <div className="fixed top-0 right-12 z-[250] pointer-events-none select-none hidden md:block">
      {/* Lamp Head SVG */}
      <svg
        width="110"
        height="90"
        viewBox="0 0 110 90"
        className="absolute right-0 top-0 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lamp Base/Mount */}
        <path
          d="M70 0 L90 0 L85 10 L75 10 Z"
          fill="var(--color-ink)"
          opacity="0.9"
        />
        {/* Arm */}
        <path
          d="M80 10 Q65 25 45 20"
          stroke="var(--color-ink)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Socket */}
        <path
          d="M40 16 L48 24 L38 34 L30 26 Z"
          fill="#A8A29E"
        />
        {/* Lamp Shade */}
        <path
          d="M52 22 L24 48 C16 56 32 72 44 60 L62 32 Z"
          fill={isDark ? "#D4835B" : "#C4622D"}
          className="transition-colors duration-500"
        />
        {/* Bulb */}
        <circle
          cx="30"
          cy="48"
          r="10"
          fill={isDark ? "#FBBF24" : "#E7E5E4"}
          className="transition-colors duration-500"
          style={
            isDark
              ? {
                  filter: "drop-shadow(0 0 12px #FBBF24) drop-shadow(0 0 4px #FBBF24)",
                }
              : {}
          }
        />
        {/* Light Beam cone (only visible in dark mode) */}
        <path
          d="M30 48 L-80 200 L180 200 Z"
          fill="url(#lamp-light-beam)"
          className={`transition-opacity duration-700 pointer-events-none ${isDark ? "opacity-25" : "opacity-0"}`}
        />
        
        <defs>
          <linearGradient id="lamp-light-beam" x1="30" y1="48" x2="30" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pull String Container */}
      <div className="absolute right-12 top-[45px] flex flex-col items-center">
        {/* Fixed wire chain */}
        <div
          className="w-[1.5px] h-[55px]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, var(--color-ink), var(--color-ink) 2px, transparent 2px, transparent 4px)",
            opacity: 0.65,
          }}
        />

        {/* Dynamic motion cord handle */}
        <motion.div
          animate={controls}
          onClick={toggleDarkMode}
          className="pointer-events-auto cursor-pointer flex flex-col items-center group"
          data-cursor="link"
          data-cursor-label={isDark ? "light mode" : "dark mode"}
          style={{ originY: 0 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Connector chain */}
          <div
            className="w-[1.5px] h-[25px] group-hover:bg-amber-500 transition-colors"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, var(--color-ink), var(--color-ink) 2px, transparent 2px, transparent 4px)",
            }}
          />
          {/* Bell-shaped pull knob */}
          <div
            className="w-[10px] h-[16px] rounded-t-sm rounded-b-md transition-all group-hover:scale-110 shadow-sm"
            style={{
              background: "linear-gradient(to bottom, #A8A29E 0%, #78716C 100%)",
              border: "1px solid rgba(0,0,0,0.15)",
              boxShadow: isDark ? "0 0 6px rgba(90, 158, 130, 0.4)" : "none",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
