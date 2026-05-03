"use client";

import React from "react";

export function VinylCard() {
  return (
    <a
      href="https://github.com/AanandModi"
      target="_blank"
      rel="noopener noreferrer"
      className="group/vinyl"
      style={{ overflow: "visible" }}
    >
      <div className="relative w-[240px]" style={{ overflow: "visible" }}>
        {/* Vinyl record — pops out on hover */}
        <div className="absolute inset-x-0 top-[24px] flex justify-center z-10 pointer-events-none" style={{ overflow: "visible" }}>
          <img
            src="/Vinyl.png"
            alt="Vinyl record"
            className="w-36 h-36 vinyl-spin transition-all duration-500 ease-out group-hover/vinyl:scale-[1.15] group-hover/vinyl:-translate-y-[18px] group-hover/vinyl:drop-shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
            style={{ willChange: "transform" }}
            draggable={false}
          />
        </div>
        {/* Rotating gradient border on hover */}
        <div
          className="absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-400 group-hover/vinyl:opacity-100 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, #C4622D, #FAEF5D, transparent, transparent, #C4622D)",
            animation: "vinyl-spin 3s linear infinite",
          }}
        />
        {/* Card body */}
        <div className="relative bg-white border border-stone-200 rounded-2xl shadow-sm flex flex-col items-center w-[240px] pt-6 pb-6">
          {/* Hover blobs */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover/vinyl:opacity-100">
            <div className="vinyl-blob vinyl-blob-1" />
            <div className="vinyl-blob vinyl-blob-2" />
            <div className="vinyl-blob vinyl-blob-3" />
          </div>
          {/* Spacer for vinyl */}
          <div className="relative z-[1] w-36 h-36" />
          {/* Info */}
          <div className="relative z-[1] mt-4 text-center">
            <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)" }}>Side Projects</p>
            <h3 className="text-stone-800 font-bold text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>Build Log</h3>
            <p className="text-[11px] text-stone-500 mb-1">15+ projects shipped</p>
            <p className="text-stone-400 text-[13px] font-medium leading-snug">Always building</p>
          </div>
        </div>
      </div>
    </a>
  );
}
