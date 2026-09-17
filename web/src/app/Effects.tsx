"use client";

import { useEffect } from "react";

/**
 * Cursor spotlight: a soft accent glow follows the pointer (desktop only).
 * No-op under prefers-reduced-motion or on touch devices.
 */
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const root = document.documentElement;
    let frame = 0;
    let mx = -1000;
    let my = -1000;
    const apply = () => {
      frame = 0;
      root.style.setProperty("--mx", `${mx}px`);
      root.style.setProperty("--my", `${my}px`);
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    root.classList.add("has-spotlight");
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("has-spotlight");
    };
  }, []);

  return <div id="spotlight" aria-hidden="true" />;
}
