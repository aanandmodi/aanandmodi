"use client";

import React from "react";

export const SectionDivider = React.memo(function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden>
      <svg viewBox="0 0 240 24" preserveAspectRatio="none">
        <path d="M2 12 C 28 2, 52 22, 80 12 C 108 3, 132 20, 160 12 C 186 4, 210 19, 238 11" />
      </svg>
    </div>
  );
});
