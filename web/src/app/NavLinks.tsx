"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "dashboard", label: "DASHBOARD" },
  { id: "competencies", label: "COMPETENCIES" },
  { id: "hackathons", label: "HACKATHONS" },
] as const;

type SectionId = (typeof LINKS)[number]["id"];

export default function NavLinks() {
  const [active, setActive] = useState<SectionId>("dashboard");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atBottom) {
        setActive(LINKS[LINKS.length - 1].id);
        return;
      }

      // Activate the last section whose top has crossed a line 40% down the viewport
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current: SectionId = LINKS[0].id;
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = link.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md md:font-label-caps md:text-label-caps">
      {LINKS.map((link) => {
        const isActive = active === link.id;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setActive(link.id)}
            aria-current={isActive ? "location" : undefined}
            className={`border-b pb-0.5 transition-colors duration-200 active:opacity-80 ${
              isActive
                ? "text-secondary border-secondary font-bold"
                : "text-on-surface-variant border-transparent hover:text-secondary"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
