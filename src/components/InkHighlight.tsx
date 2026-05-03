"use client";

import React, { useEffect, useRef, useState } from "react";

export const InkHighlight = React.memo(function InkHighlight({
  children,
  color = "var(--color-accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setOn(true);
          io.disconnect();
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`ink-highlight ${on ? "ink-highlight-on" : ""}`}
      style={{ "--ink": color } as React.CSSProperties}
    >
      <span className="ink-highlight-text">{children}</span>
      <span className="ink-highlight-mark" aria-hidden />
    </span>
  );
});

