"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
  const labelRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState("");
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);

  useEffect(() => {
    if (isMobile || !active) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    function tick() {
      const dot = dotRef.current;
      const label = labelRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
      }
      if (label) {
        label.style.transform = `translate3d(${mouse.current.x + 12}px, ${mouse.current.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active, isMobile]);

  useEffect(() => {
    if (isMobile || !active) return;

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>("[data-cursor], a, button");
      if (!interactive) {
        setCursorLabel("");
        return;
      }

      const label = interactive.dataset.cursorLabel;
      setCursorLabel(label ?? "");
    };

    const handlePointerLeaveWindow = () => {
      setCursorLabel("");
    };

    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerleave", handlePointerLeaveWindow);

    return () => {
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", handlePointerLeaveWindow);
    };
  }, [active, isMobile]);

  if (isMobile || !active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "var(--color-ink)",
          boxShadow: "0 0 0 1px rgba(245,240,232,0.5)",
          willChange: "transform",
        }}
      />
      <span
        ref={labelRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none uppercase tracking-[0.2em]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "rgba(28,25,23,0.9)",
          opacity: cursorLabel ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform, opacity",
        }}
      >
        {cursorLabel}
      </span>
    </>
  );
}
