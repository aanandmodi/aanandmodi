"use client";

import React, { useState, useCallback, useEffect, memo } from "react";
import { YellowDotCursor } from "@/components/CustomCursor";
import { ClickBurst } from "@/components/ClickBurst";
import { NavHeader } from "@/components/NavHeader";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ResearchSection } from "@/components/ResearchSection";
import { HackathonTimeline } from "@/components/HackathonTimeline";
import { ContactFooter } from "@/components/ContactFooter";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticInteractions } from "@/components/MagneticInteractions";
import { PaperSeparator } from "@/components/PaperSeparator";
import { StickerSheet } from "@/components/StickerSheet";

type Burst = { id: number; x: number; y: number };

const ClickBurstOverlay = memo(() => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <>
      {bursts.map((b) => (
        <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => removeBurst(b.id)} />
      ))}
    </>
  );
});
ClickBurstOverlay.displayName = "ClickBurstOverlay";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <OpeningAnimation onComplete={() => setLoading(false)} />}

      <SmoothScroll enabled={!loading}>
        <div className={loading ? "h-screen overflow-hidden" : ""}>
          <YellowDotCursor active={!loading} />
          <MagneticInteractions />
          <StickerSheet />
          <ClickBurstOverlay />

          <NavHeader />
          <HeroSection />
          <PaperSeparator tone="#C4622D" />
          <AboutSection />
          <PaperSeparator flip tone="#C4622D" />
          <WorkSection />
          <PaperSeparator tone="#9680C2" />
          <ResearchSection />
          <PaperSeparator flip tone="#6A9EC0" />
          <HackathonTimeline />
          <ContactFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
