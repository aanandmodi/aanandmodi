"use client";

import React, { useEffect, useState } from "react";

type TypewriterLinesProps = {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
  typingMs?: number;
  pauseMs?: number;
};

export const TypewriterLines = React.memo(function TypewriterLines({
  lines,
  className,
  style,
  typingMs = 45,
  pauseMs = 1200,
}: TypewriterLinesProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!lines.length) return;
    const active = lines[lineIndex] ?? "";
    const finishedTyping = charIndex === active.length;
    const finishedDeleting = charIndex === 0;

    const delay = deleting ? Math.max(typingMs / 2, 20) : typingMs;
    const timeout = setTimeout(
      () => {
        if (!deleting && finishedTyping) {
          setDeleting(true);
          return;
        }
        if (deleting && finishedDeleting) {
          setDeleting(false);
          setLineIndex((prev) => (prev + 1) % lines.length);
          return;
        }
        setCharIndex((prev) => prev + (deleting ? -1 : 1));
      },
      (!deleting && finishedTyping) || (deleting && finishedDeleting) ? pauseMs : delay
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, lineIndex, lines, pauseMs, typingMs]);

  if (!lines.length) return null;
  const shown = lines[lineIndex]?.slice(0, charIndex) ?? "";

  return (
    <p className={className} style={style}>
      {shown}
      <span className="cursor-blink">|</span>
    </p>
  );
});
