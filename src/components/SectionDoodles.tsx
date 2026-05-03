"use client";

import React, { useMemo } from "react";

type Doodle = {
  id: string;
  text?: string;
  emoji?: string;
  top: string;
  left: string;
  rotate: string;
  size: number;
  opacity: number;
  color?: string;
  blur?: number;
};

const brainrotStamps = [
  "NO CAP",
  "SHIP IT",
  "BUILT DIFFERENT",
  "MAIN CHARACTER",
  "PROD READY",
  "DEBUG MODE",
  "SLAY",
  "GOATED",
  "W RIZZ",
  "LOCKED IN",
  "RIZZ ENGINE",
  "AURA FARMING",
  "BRO IS COOKING",
  "WE ARE SO BACK",
  "IT'S GIVING",
  "OK BUT WHY IS IT CLEAN",
  "REAL",
  "FR FR",
  "SHEESH",
  "W BUILD",
];

const doodleEmojis = ["✦", "★", "✿", "☁", "⚡", "✎", "❖", "∞", "∿", "♡", "⟡", "☾", "☼", "✺", "✧"];

function pick<T>(arr: T[], seed: number) {
  return arr[seed % arr.length]!;
}

export const SectionDoodles = React.memo(function SectionDoodles({
  seed = 0,
  tone = "accent",
  density = "fun",
}: {
  seed?: number;
  tone?: "accent" | "cool" | "warm";
  density?: "normal" | "fun" | "extreme";
}) {
  const doodles = useMemo<Doodle[]>(() => {
    const palette =
      tone === "cool"
        ? ["#6A9EC0", "#9680C2", "#5A9E82"]
        : tone === "warm"
          ? ["#C9A060", "#C4622D", "#D4835B"]
          : ["#C4622D", "#D4835B", "#9680C2"];

    const items: Doodle[] = [];

    const positions =
      density === "extreme"
        ? [
            { top: "6%", left: "5%" },
            { top: "10%", left: "20%" },
            { top: "12%", left: "82%" },
            { top: "18%", left: "92%" },
            { top: "26%", left: "6%" },
            { top: "30%", left: "86%" },
            { top: "42%", left: "95%" },
            { top: "54%", left: "4%" },
            { top: "62%", left: "92%" },
            { top: "70%", left: "10%" },
            { top: "78%", left: "22%" },
            { top: "84%", left: "78%" },
            { top: "88%", left: "90%" },
          ]
        : density === "fun"
          ? [
              { top: "8%", left: "6%" },
              { top: "12%", left: "84%" },
              { top: "24%", left: "8%" },
              { top: "34%", left: "92%" },
              { top: "48%", left: "4%" },
              { top: "58%", left: "94%" },
              { top: "72%", left: "10%" },
              { top: "82%", left: "76%" },
              { top: "88%", left: "92%" },
            ]
          : [
              { top: "10%", left: "6%" },
              { top: "14%", left: "82%" },
              { top: "44%", left: "92%" },
              { top: "72%", left: "10%" },
              { top: "84%", left: "76%" },
              { top: "30%", left: "4%" },
            ];

    for (let i = 0; i < positions.length; i++) {
      const p = positions[i]!;
      const isStamp = i % 2 === 0 || (density === "extreme" && i % 3 === 0);
      const color = palette[(seed + i) % palette.length]!;
      const rot = `${(((seed + i * 2) % 17) * 2.6 - 20).toFixed(1)}deg`;
      const stampOpacity = density === "extreme" ? 0.24 : density === "fun" ? 0.20 : 0.16;
      const doodleOpacity = density === "extreme" ? 0.18 : density === "fun" ? 0.14 : 0.10;
      items.push({
        id: `${seed}-${i}`,
        top: p.top,
        left: p.left,
        rotate: rot,
        size: isStamp ? 11 : 34,
        opacity: isStamp ? stampOpacity : doodleOpacity,
        color,
        blur: isStamp ? 0 : 0.15,
        text: isStamp ? pick(brainrotStamps, seed + i * 3) : undefined,
        emoji: !isStamp ? pick(doodleEmojis, seed + i * 5) : undefined,
      });
    }

    return items;
  }, [seed, tone, density]);

  return (
    <div className="section-doodles" aria-hidden>
      {doodles.map((d) =>
        d.text ? (
          <div
            key={d.id}
            className="stamp"
            style={{
              top: d.top,
              left: d.left,
              transform: `rotate(${d.rotate})`,
              opacity: d.opacity,
              color: d.color,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
            }}
          >
            <span>{d.text}</span>
          </div>
        ) : (
          <div
            key={d.id}
            className="doodle"
            style={{
              top: d.top,
              left: d.left,
              transform: `rotate(${d.rotate})`,
              opacity: d.opacity,
              color: d.color,
              fontSize: d.size,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
            }}
          >
            {d.emoji}
          </div>
        )
      )}
    </div>
  );
});

