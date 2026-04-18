"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Brief random digit flicker, then count to `target`. Respects prefers-reduced-motion.
 */
export function useScrambleCount(target: number, durationMs = 1500): number {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(target);
      return;
    }

    const scrambleMs = 300;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;

      if (elapsed < scrambleMs) {
        const hi = Math.max(99, target * 3);
        setDisplay(Math.floor(Math.random() * hi));
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const settleT = Math.min(1, (elapsed - scrambleMs) / (durationMs - scrambleMs));
      const eased = 1 - (1 - settleT) ** 3;
      setDisplay(Math.round(target * eased));
      if (settleT < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return display;
}
