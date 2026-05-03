"use client";

import React, { useEffect } from "react";

export const HeroParallax = React.memo(function HeroParallax() {
  useEffect(() => {
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!layers.length) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      layers.forEach((el) => {
        const depth = Number(el.dataset.parallax ?? "1");
        const x = mx * depth * 6;
        const y = my * depth * 5;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
});

