"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Viewport-sized particle network behind the page — the video-like background.
 * Denser and slightly brighter on small screens (no cursor/hover to carry it).
 * Pauses when the tab is hidden; draws one static frame under reduced motion.
 */
export default function TelemetryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = false;
    let linkDist = 100;
    let areaPer = 15000;

    const tune = () => {
      const mobile = compact.matches;
      linkDist = mobile ? 130 : 100;
      areaPer = mobile ? 7200 : 15000;
    };

    const targetCount = () =>
      Math.max(compact.matches ? 64 : 48, Math.round((width * height) / areaPer));

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (compact.matches ? 0.35 : 0.5),
      vy: (Math.random() - 0.5) * (compact.matches ? 0.35 : 0.5),
      r: compact.matches ? 0.9 + Math.random() * 1.4 : 0.6 + Math.random() * 1.2,
    });

    const resize = () => {
      tune();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = targetCount();
      particles = particles
        .map((p) => ({
          ...p,
          x: Math.min(Math.max(p.x, 0), width),
          y: Math.min(Math.max(p.y, 0), height),
        }))
        .slice(0, n);
      while (particles.length < n) particles.push(makeParticle());
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const mobile = compact.matches;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = mobile ? "rgba(255, 182, 147, 0.55)" : "#444748";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const a = 1 - dist / linkDist;
            ctx.beginPath();
            ctx.strokeStyle = mobile
              ? `rgba(255, 182, 147, ${a * 0.35})`
              : `rgba(142, 145, 146, ${a})`;
            ctx.lineWidth = mobile ? 0.7 : 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      step();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    if (reduce) step();
    else start();

    window.addEventListener("resize", resize);
    compact.addEventListener("change", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      compact.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="telemetry-canvas" ref={canvasRef} aria-hidden="true" />;
}
