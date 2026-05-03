"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

const MOBILE_MQ = "(max-width: 1023px)";

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_MQ).matches;
}

function getMobileServerSnapshot() {
  return true;
}

export function YellowDotCursor({ active }: { active: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);

  useEffect(() => {
    if (isMobile || !active) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    function tick() {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.18);
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${mouse.current.x - 5}px, ${mouse.current.y - 5}px, 0)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${pos.current.x - 20}px, ${pos.current.y - 20}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active, isMobile]);

  if (isMobile || !active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FBBF24", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(251,191,36,0.35)",
          willChange: "transform",
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </>
  );
}
