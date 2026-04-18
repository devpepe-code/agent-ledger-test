"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Subtle radial gradient following the pointer (marketing pages).
 * Disabled when prefers-reduced-motion or via .cursor-glow hidden in CSS.
 */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setActive(true);
  }, []);

  const onLeave = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] cursor-glow hidden md:block"
      aria-hidden
      style={{
        background: active
          ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(124, 58, 237, 0.04), transparent 40%)`
          : undefined,
      }}
    />
  );
}
