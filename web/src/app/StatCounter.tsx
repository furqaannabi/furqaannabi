"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  pad?: number;
  durationMs?: number;
  delayMs?: number;
  className?: string;
};

function format(n: number, decimals: number, pad: number): string {
  const fixed = n.toFixed(decimals);
  if (!pad) return fixed;
  const [int, frac] = fixed.split(".");
  const padded = int.padStart(pad, "0");
  return frac !== undefined ? `${padded}.${frac}` : padded;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  pad = 0,
  durationMs = 1400,
  delayMs = 0,
  className,
}: Props) {
  const [display, setDisplay] = useState(() => format(0, decimals, pad));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      if (reduce) {
        setDisplay(format(value, decimals, pad));
        return;
      }
      const t0 = performance.now() + delayMs;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - t0) / durationMs));
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(value * eased, decimals, pad));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, decimals, pad, durationMs, delayMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
