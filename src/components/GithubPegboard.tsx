"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Cell = {
  day: string;
  commits: number;
  message: string;
  color: string;
};

const commitMessages = [
  "Shipped HireMinds AI Multi-Agent pipeline at 3:15 AM. fr fr.",
  "Fixed typescript compile error by deleting half the codebase.",
  "Locked in for national hackathon. 6 cups of coffee consumed.",
  "Accepted research paper publication. Aura increased by +500.",
  "Created physical desk widgets. Switched to dark mode to sleep.",
  "Merged pull request. Proctoring cheat prevention agent bypassed by candidate's cat.",
  "Created a self-healing LangGraph compliance feedback loop.",
  "Cleaned up terminal CSS variables. Refactored sticky note physics.",
  "Wrote 40 lines of matrix rain code. Dancing cat easter egg added.",
  "Changed spacing from 2 to 4 to force pipeline re-trigger.",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function makeGridCells() {
  const cells: Cell[] = [];
  const totalCells = 7 * 20; // 7 rows, 20 columns

  for (let i = 0; i < totalCells; i++) {
    const dayIndex = i % 7;
    const dayName = daysOfWeek[dayIndex]!;
    
    // Weighted random commits
    const randomVal = Math.random();
    let commits = 0;
    let color = "var(--color-cell-empty)"; // empty cell variable

    if (randomVal > 0.85) {
      commits = Math.floor(Math.random() * 4) + 8;
      color = "var(--color-accent)"; // heavy activity (terracotta/green)
    } else if (randomVal > 0.6) {
      commits = Math.floor(Math.random() * 3) + 4;
      color = "var(--color-accent-light)"; // medium activity
    } else if (randomVal > 0.3) {
      commits = Math.floor(Math.random() * 3) + 1;
      color = "color-mix(in oklab, var(--color-accent) 25%, var(--color-cell-empty))"; // light activity
    }

    const message = commits > 0 
      ? commitMessages[Math.floor(Math.random() * commitMessages.length)]! 
      : "No commits. Sleeping off the caffeine.";

    cells.push({
      day: dayName,
      commits,
      message,
      color,
    });
  }
  return cells;
}

export function GithubPegboard() {
  const gridCells = useMemo(() => makeGridCells(), []);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Sprout items on hover (flowers, plants, sparkles)
  const sproutNode = useMemo(() => {
    if (hoveredIdx === null) return null;
    const cell = gridCells[hoveredIdx];
    if (!cell || cell.commits === 0) return null;

    const sprouts = ["🌱", "🌸", "✨", "⟡", "✿", "🍀"];
    const text = sprouts[hoveredIdx % sprouts.length];

    return (
      <motion.span
        initial={{ scale: 0, y: 0, opacity: 0 }}
        animate={{ scale: [1, 1.4, 1.2], y: -22, opacity: 1 }}
        className="absolute text-sm select-none pointer-events-none"
        style={{ zIndex: 30 }}
      >
        {text}
      </motion.span>
    );
  }, [hoveredIdx, gridCells]);

  return (
    <div
      className="relative w-full max-w-[420px] bg-[#fdfcfb] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm transition-transform hover:scale-[1.02] cursor-default"
      style={{
        boxShadow: "0 6px 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs">🧶</span>
          <span className="text-[10px] text-stone-600 dark:text-stone-300 font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
            GitHub Garden Pegboard
          </span>
        </div>
        <span className="text-[9px] text-stone-400 dark:text-stone-500 font-mono tracking-widest">
          365 DAYS ACTIVE
        </span>
      </div>

      {/* Grid container with days label sidebar */}
      <div className="flex gap-2">
        {/* Days label */}
        <div className="flex flex-col justify-between text-[8px] text-stone-400 font-bold font-mono h-[110px] py-1 select-none pr-1">
          <span>Sun</span>
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>

        {/* Pegboard Cell Grid */}
        <div className="flex-1 relative flex items-center justify-center">
          <div
            className="grid grid-flow-col gap-[3.5px]"
            style={{
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
              gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
              height: "110px",
            }}
          >
            {gridCells.map((cell, idx) => (
              <div key={idx} className="relative flex items-center justify-center">
                <motion.div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ scale: 1.45, zIndex: 10 }}
                  className="w-[12px] h-[12px] rounded-[3px] border-[0.5px] border-stone-200/50 cursor-pointer shadow-sm relative"
                  style={{
                    backgroundColor: cell.color,
                    transition: "background-color 0.2s ease",
                  }}
                />

                {/* Sprout visual portal */}
                {hoveredIdx === idx && sproutNode}
              </div>
            ))}
          </div>

          {/* Active tooltip popover */}
          <AnimatePresence>
            {hoveredIdx !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute left-0 right-0 -bottom-16 bg-stone-900 border border-stone-800 text-white rounded-lg p-2.5 shadow-md z-30 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9.5px",
                  lineHeight: 1.35,
                }}
              >
                <div className="flex items-center justify-between border-b border-stone-800 pb-1 mb-1 font-bold">
                  <span className="text-[#5A9E82] uppercase tracking-wider">{gridCells[hoveredIdx]?.day} Activity</span>
                  <span className="text-stone-400 font-mono">{gridCells[hoveredIdx]?.commits} Commits</span>
                </div>
                <p className="text-stone-300 italic">
                  &ldquo;{gridCells[hoveredIdx]?.message}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend footer */}
      <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-3 mt-4 text-[9px] text-stone-400 dark:text-stone-500 font-mono">
        <span>Less</span>
        <div className="flex gap-[3.5px] items-center">
          <div className="w-[10px] h-[10px] rounded-[2px] border border-stone-200/30" style={{ backgroundColor: "var(--color-cell-empty)" }} />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-stone-200/30" style={{ backgroundColor: "color-mix(in oklab, var(--color-accent) 25%, var(--color-cell-empty))" }} />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-stone-200/30" style={{ backgroundColor: "var(--color-accent-light)" }} />
          <div className="w-[10px] h-[10px] rounded-[2px] border border-stone-200/30" style={{ backgroundColor: "var(--color-accent)" }} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
