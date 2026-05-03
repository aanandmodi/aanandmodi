"use client";

import React from "react";

/* ── Dot matrix display — exact Yan Liu style with 18×18 grid ── */
/* Shows "AM" initials with multi-color Figma-style LED dots */
const COLS = 18;

// prettier-ignore
const amGrid = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,1,0,1,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,
  0,0,0,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,
  0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

function getDotColor(i: number) {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const isLeft = col < 9;
  // Terracotta gradient for A, amber for M
  if (isLeft) {
    if (row <= 5) return "#C4622D";
    if (row <= 8) return "#D4746E";
    return "#C4622D";
  }
  if (row <= 5) return "#E8A87C";
  if (row <= 8) return "#D4A574";
  return "#C9A060";
}

// Build activation order
const dotOrder = amGrid.reduce<number[]>((acc, val, i) => {
  if (val) acc.push(i);
  return acc;
}, []);
const dotSeqMap = new Map<number, number>();
dotOrder.forEach((dotIdx, seqIdx) => dotSeqMap.set(dotIdx, seqIdx));

export function DotMatrixBoard() {
  return (
    <div
      className="cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.08] hover:rotate-[2deg] group/matrix"
      style={{ perspective: "500px" }}
    >
      <div
        className="rounded-2xl p-4"
        style={{
          background: "linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 30%, #2d2d2d 100%)",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        {/* Label */}
        <div className="text-[8px] text-stone-500 tracking-[0.3em] uppercase text-center mb-2" style={{ fontFamily: "var(--font-mono)" }}>
          INITIALS.LED
        </div>
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {amGrid.map((on, i) => {
            const seq = dotSeqMap.get(i) ?? 0;
            const color = on ? getDotColor(i) : "";
            return (
              <div
                key={i}
                className={`dot-led w-[7px] h-[7px] rounded-full${on ? " dot-on" : ""}`}
                style={
                  {
                    "--dot-color": color,
                    "--dot-delay": `${seq * 18}ms`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
