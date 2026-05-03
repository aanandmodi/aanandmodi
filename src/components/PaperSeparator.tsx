"use client";

import React from "react";

export const PaperSeparator = React.memo(function PaperSeparator({
  flip = false,
  tone = "#C4622D",
}: {
  flip?: boolean;
  tone?: string;
}) {
  return (
    <div className={`paper-separator ${flip ? "paper-separator-flip" : ""}`} aria-hidden>
      <div className="paper-separator-tape paper-separator-tape-1" />
      <div className="paper-separator-tape paper-separator-tape-2" />
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none">
        <path
          d="M0,28 C80,18 140,42 220,28 C300,14 360,48 440,30 C520,12 580,52 660,34 C740,16 820,58 900,36 C980,14 1060,56 1200,30 L1200,70 L0,70 Z"
          fill="rgba(253,252,251,0.86)"
        />
        <path
          d="M0,28 C80,18 140,42 220,28 C300,14 360,48 440,30 C520,12 580,52 660,34 C740,16 820,58 900,36 C980,14 1060,56 1200,30"
          fill="none"
          stroke={tone}
          strokeWidth="2"
          strokeOpacity="0.25"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});

