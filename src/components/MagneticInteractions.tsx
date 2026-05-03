"use client";

import React, { useEffect } from "react";

export const MagneticInteractions = React.memo(function MagneticInteractions() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    if (!els.length) return;

    const leave = (el: HTMLElement) => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    const handlers = els.map((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const x = relX * 12;
        const y = relY * 10;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const onLeave = () => leave(el);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return { el, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        leave(el);
      });
    };
  }, []);

  return null;
});
