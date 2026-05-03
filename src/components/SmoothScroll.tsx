"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Lenis from "lenis";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function reducedMotionServerSnapshot() {
  return false;
}

export function SmoothScroll({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    reducedMotionServerSnapshot
  );

  useEffect(() => {
    if (!enabled || reduceMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.09,
      wheelMultiplier: 1.12,
      touchMultiplier: 1.15,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, reduceMotion]);

  return <>{children}</>;
}
