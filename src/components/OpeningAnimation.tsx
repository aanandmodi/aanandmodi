"use client";

import React, { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeOutBack(t: number) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeInQuad(t: number) { return t * t; }

type AnimProps = { x: number; y: number; scale?: number; opacity?: number; rotate?: number };

function animate(el: HTMLElement, from: AnimProps, to: AnimProps, duration: number, easeFn: (t: number) => number) {
  return new Promise<void>(resolve => {
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const e = easeFn(t);
      const x = from.x + (to.x - from.x) * e;
      const y = from.y + (to.y - from.y) * e;
      const scale = (from.scale ?? 1) + ((to.scale ?? 1) - (from.scale ?? 1)) * e;
      const opacity = (from.opacity ?? 1) + ((to.opacity ?? 1) - (from.opacity ?? 1)) * e;
      const rotate = (from.rotate ?? 0) + ((to.rotate ?? 0) - (from.rotate ?? 0)) * e;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      el.dataset.posX = String(x);
      el.dataset.posY = String(y);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export function OpeningAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maskCircle, setMaskCircle] = useState<{ x: number; y: number } | null>(null);
  const [maskExpand, setMaskExpand] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const FONT_SIZE = 100;
    const CENTER_X = window.innerWidth / 2;
    const CENTER_Y = window.innerHeight / 2;

    // "Aanand" — 6 letters. "A" is the hero, the rest burst from the collision.
    const letterDefs = [
      { char: "A", role: "hero-rise" },   // rises from bottom
      { char: "d", role: "hero-fall" },   // falls from top
      { char: "a", role: "burst" },       // bursts out
      { char: "n", role: "burst" },
      { char: "a", role: "burst" },
      { char: "n", role: "burst" },
    ];

    // Inner wrapper for letters — shake applies here, not the background
    const lettersWrapper = document.createElement("div");
    Object.assign(lettersWrapper.style, {
      position: "absolute", inset: "0", pointerEvents: "none",
    });
    container.appendChild(lettersWrapper);

    // Create terracotta dot (period after "Aanand.")
    const dotEl = document.createElement("div");
    Object.assign(dotEl.style, {
      position: "absolute", width: "18px", height: "18px",
      borderRadius: "50%", background: "#C4622D",
      boxShadow: "0 0 12px 4px rgba(196,98,45,0.4)",
      opacity: "0", willChange: "transform, opacity",
    });
    lettersWrapper.appendChild(dotEl);

    // Create letter elements
    const els = letterDefs.map(def => {
      const el = document.createElement("div");
      Object.assign(el.style, {
        position: "absolute", fontSize: FONT_SIZE + "px", fontWeight: "800",
        color: "#ffffff", opacity: "0", willChange: "transform, opacity",
        userSelect: "none", lineHeight: "1",
        fontFamily: "var(--font-display), 'Inter', sans-serif",
      });
      el.textContent = def.char;
      lettersWrapper.appendChild(el);
      return { el, char: def.char, role: def.role };
    });

    // Measure and compute final positions for "Aanand"
    // Final order: A a n a n d
    const finalOrder = [0, 2, 3, 4, 5, 1]; // map letterDefs index to display order
    els.forEach(o => { o.el.style.opacity = "0.01"; });

    const gaps = [-2, 2, 2, 2, 0]; // kerning gaps between letters
    const widths = els.map(o => o.el.offsetWidth);

    // Calculate total width in display order
    let totalWidth = 0;
    finalOrder.forEach((li, di) => {
      totalWidth += widths[li];
      if (di < gaps.length) totalWidth += gaps[di];
    });

    let xPos = CENTER_X - totalWidth / 2;
    const yPos = CENTER_Y - FONT_SIZE / 2;
    const finalPos: { x: number; y: number }[] = new Array(els.length);

    finalOrder.forEach((li, di) => {
      finalPos[li] = { x: xPos, y: yPos };
      xPos += widths[li] + (di < gaps.length ? gaps[di] : 0);
    });

    els.forEach(o => { o.el.style.opacity = "0"; });

    // Flash element for collision
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute", width: "10px", height: "10px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(196,98,45,0.7) 0%, transparent 70%)",
      pointerEvents: "none", opacity: "0",
    });
    lettersWrapper.appendChild(flash);

    async function run() {
      const heroA = els[0];  // "A" — rises from bottom
      const heroD = els[1];  // "d" — falls from top

      // ── STEP 1: "A" rises from below ──
      const aCenterX = CENTER_X - heroA.el.offsetWidth / 2;
      const aStartY = window.innerHeight + 50;
      const aEndY = CENTER_Y - FONT_SIZE / 2;

      await animate(heroA.el,
        { x: aCenterX, y: aStartY, scale: 4, opacity: 0.5 },
        { x: aCenterX, y: aEndY, scale: 1.2, opacity: 1 },
        700, easeOutCubic
      );
      await delay(150);

      // ── STEP 2: "d" falls from the top ──
      const dStartX = CENTER_X - heroD.el.offsetWidth / 2 + 20;
      const dStartY = -120;
      const dCollideY = CENTER_Y - FONT_SIZE / 2;

      heroD.el.style.opacity = "1";
      await animate(heroD.el,
        { x: dStartX, y: dStartY, scale: 1, opacity: 1 },
        { x: dStartX, y: dCollideY, scale: 1, opacity: 1 },
        600, easeInQuad
      );

      // ── STEP 3: Collision! Flash + Shake ──
      flash.style.left = CENTER_X - 5 + "px";
      flash.style.top = CENTER_Y - 5 + "px";
      flash.style.animation = "flashBurst 0.5s ease-out forwards";
      lettersWrapper.style.animation = "shake 0.4s ease-out";

      // A and d repel from the collision
      await Promise.all([
        animate(heroA.el,
          { x: CENTER_X - heroA.el.offsetWidth / 2, y: CENTER_Y - FONT_SIZE / 2, scale: 1.2, opacity: 1 },
          { x: CENTER_X - heroA.el.offsetWidth / 2 - 40, y: CENTER_Y - FONT_SIZE / 2, scale: 1.3, opacity: 1 },
          150, easeOutCubic
        ),
        animate(heroD.el,
          { x: dStartX, y: dCollideY, scale: 1, opacity: 1 },
          { x: dStartX + 40, y: dCollideY, scale: 1.3, opacity: 1 },
          150, easeOutCubic
        ),
      ]);

      // ── STEP 4: Other letters burst out from the collision point ──
      // a(2), n(3), a(4), n(5)
      const burstLetters = [
        { obj: els[2], angle: -140, dist: 250 },   // first "a"
        { obj: els[3], angle: -200, dist: 220 },   // first "n"
        { obj: els[4], angle: -20, dist: 200 },    // second "a"
        { obj: els[5], angle: 30, dist: 260 },     // second "n"
      ];

      const burstPromises = burstLetters.map(bl => {
        const rad = bl.angle * Math.PI / 180;
        const burstX = CENTER_X + Math.cos(rad) * bl.dist - 25;
        const burstY = CENTER_Y + Math.sin(rad) * bl.dist - FONT_SIZE / 2;
        return animate(bl.obj.el,
          { x: CENTER_X - 25, y: CENTER_Y - FONT_SIZE / 2, scale: 0.3, opacity: 0, rotate: (Math.random() - 0.5) * 60 },
          { x: burstX, y: burstY, scale: 1.1, opacity: 1, rotate: (Math.random() - 0.5) * 20 },
          450, easeOutCubic
        );
      });
      await Promise.all(burstPromises);
      lettersWrapper.style.animation = "";
      await delay(200);

      // ── STEP 5: All letters settle into final "Aanand" positions ──
      const settlePromises = els.map((obj, i) => {
        const currentX = parseFloat(obj.el.dataset.posX || "0");
        const currentY = parseFloat(obj.el.dataset.posY || "0");
        const currentScale = parseFloat(obj.el.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || "1");
        return animate(obj.el,
          { x: currentX, y: currentY, scale: currentScale, opacity: 1, rotate: 0 },
          { x: finalPos[i].x, y: finalPos[i].y, scale: 1, opacity: 1, rotate: 0 },
          800, easeOutBack
        );
      });
      await Promise.all(settlePromises);

      // ── STEP 6: Terracotta dot bounces in (the "period" after Aanand) ──
      await delay(100);
      const lastLetter = els[finalOrder[finalOrder.length - 1]].el;
      const lastRect = lastLetter.getBoundingClientRect();
      const dotFinalX = lastRect.right + 6;
      const dotFinalY = lastRect.bottom - 22;

      // Drop in
      await animate(dotEl,
        { x: dotFinalX, y: -50, scale: 1, opacity: 1 },
        { x: dotFinalX, y: dotFinalY, scale: 1, opacity: 1 },
        400, easeInQuad
      );
      // Squash bounce
      await animate(dotEl,
        { x: dotFinalX, y: dotFinalY, scale: 1.3, opacity: 1 },
        { x: dotFinalX, y: dotFinalY - 15, scale: 1, opacity: 1 },
        150, easeOutCubic
      );
      // Settle
      await animate(dotEl,
        { x: dotFinalX, y: dotFinalY - 15, scale: 1, opacity: 1 },
        { x: dotFinalX, y: dotFinalY, scale: 1, opacity: 1 },
        200, easeInQuad
      );

      // ── STEP 7: Dot glows and triggers the circular mask reveal ──
      const dotCenterX = dotFinalX + 9;
      const dotCenterY = dotFinalY + 9;

      dotEl.style.transition = "box-shadow 0.6s ease-out";
      dotEl.style.boxShadow = "0 0 30px 12px rgba(196,98,45,0.7), 0 0 60px 24px rgba(196,98,45,0.3)";

      // Start mask while glow is still expanding
      await delay(150);
      setMaskCircle({ x: dotCenterX, y: dotCenterY });
      await delay(30);
      setMaskExpand(true);
      setTimeout(onComplete, 900);
    }

    const timer = setTimeout(run, 100);
    return () => {
      clearTimeout(timer);
      if (container.contains(lettersWrapper)) container.removeChild(lettersWrapper);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#111111",
        fontFamily: "var(--font-display), 'Inter', sans-serif",
        cursor: "none",
        ...(maskCircle ? {
          clipPath: maskExpand
            ? `circle(0% at ${maskCircle.x}px ${maskCircle.y}px)`
            : `circle(150% at ${maskCircle.x}px ${maskCircle.y}px)`,
          transition: "clip-path 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
        } : {}),
      }}
    >
      <style>{`
        @keyframes flashBurst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(40); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-4px, 2px); }
          20% { transform: translate(3px, -3px); }
          30% { transform: translate(-2px, 4px); }
          40% { transform: translate(4px, -1px); }
          50% { transform: translate(-3px, -2px); }
          60% { transform: translate(2px, 3px); }
          70% { transform: translate(-1px, -4px); }
          80% { transform: translate(3px, 2px); }
          90% { transform: translate(-2px, -1px); }
        }
      `}</style>
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/noise-texture.png)",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
          opacity: 0.4,
        }}
      />
    </div>
  );
}