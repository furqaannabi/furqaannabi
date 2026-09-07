"use client";

import { useEffect, useRef, useState } from "react";

type LogEntry = {
  tag: string;
  text: string;
  status: string;
  statusClass: string;
};

const ENTRIES: LogEntry[] = [
  {
    tag: "SYS_BOOT // CORE_COMPETENCIES",
    text: "Loading operator modules from /sys/furqaan_nabi",
    status: "[ INIT ]",
    statusClass: "text-outline",
  },
  {
    tag: "MOD_01 // FULL_STACK_ENG",
    text: "React, Node.js, scalable backend systems",
    status: "[ OK ]",
    statusClass: "text-tertiary",
  },
  {
    tag: "MOD_02 // SMART_CONTRACTS_WEB3",
    text: "Solidity, EVM, cross-chain (CCIP)",
    status: "[ OK ]",
    statusClass: "text-tertiary",
  },
  {
    tag: "MOD_03 // INFRA_SYSTEMS_DESIGN",
    text: "High-throughput, decentralized architectures",
    status: "[ OK ]",
    statusClass: "text-tertiary",
  },
  {
    tag: "MOD_04 // AI_AUTONOMOUS_SYS",
    text: "LLM-powered workflows, agent-based execution",
    status: "[ OK ]",
    statusClass: "text-tertiary",
  },
  {
    tag: "MOD_05 // CLOUD_DEVOPS",
    text: "AWS, Docker, distributed systems",
    status: "[ OK ]",
    statusClass: "text-tertiary",
  },
  {
    tag: "EDU_01 // AMITY_UNIVERSITY",
    text: "Bachelor of Computer Applications (Fintech and AI) — Expected 2028",
    status: "[ IN_PROGRESS ]",
    statusClass: "text-secondary",
  },
];

const CHAR_MS = 14;
const LINE_GAP_MS = 320;
const START_DELAY_MS = 500;

function formatUptime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const frac = Math.floor((ms % 1000) / 10);
  return `+${String(s).padStart(2, "0")}.${String(frac).padStart(2, "0")}`;
}

export default function LogFeed() {
  // lineIdx: index of the line currently being typed; charIdx: chars revealed on it
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [stamps, setStamps] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number>(0);
  const done = lineIdx >= ENTRIES.length;

  // Kick off after mount (and honour reduced-motion by skipping straight to the end)
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const t = setTimeout(
      () => {
        if (reduce) {
          setStamps(ENTRIES.map((_, i) => formatUptime(i * 180)));
          setLineIdx(ENTRIES.length);
        } else {
          startRef.current = performance.now();
          setStamps([formatUptime(0)]);
        }
        setStarted(true);
      },
      reduce ? 0 : START_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, []);

  // Typing engine
  useEffect(() => {
    if (!started || done) return;

    const current = ENTRIES[lineIdx];
    if (charIdx < current.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }

    // Line finished — pause, then advance
    const t = setTimeout(() => {
      const next = lineIdx + 1;
      if (next < ENTRIES.length) {
        setStamps((s) => [
          ...s,
          formatUptime(performance.now() - startRef.current),
        ]);
      }
      setLineIdx(next);
      setCharIdx(0);
    }, LINE_GAP_MS);
    return () => clearTimeout(t);
  }, [started, done, lineIdx, charIdx]);

  return (
    <ul
      className="space-y-3 relative z-10 text-on-surface-variant"
      id="live-feed"
      aria-live="polite"
    >
      {ENTRIES.map((entry, i) => {
        if (i > lineIdx) return null;
        const isActive = i === lineIdx && !done;
        const complete = i < lineIdx || done;
        const text = isActive ? entry.text.slice(0, charIdx) : entry.text;

        return (
          <li key={entry.tag} className="flex gap-2 log-line">
            <span className="text-outline text-[10px] tabular-nums shrink-0 pt-[3px] w-[52px] opacity-70">
              {stamps[i] ?? ""}
            </span>
            <span className="text-secondary opacity-50">&gt;</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-outline text-xs truncate">{entry.tag}</span>
                <span
                  className={`text-[10px] tracking-widest shrink-0 transition-opacity duration-300 ${entry.statusClass} ${
                    complete ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
              <span className="text-on-surface">
                {text}
                {isActive && (
                  <span className="text-secondary animate-pulse">▌</span>
                )}
              </span>
            </div>
          </li>
        );
      })}

      {done && (
        <li className="flex gap-2 opacity-50 log-line">
          <span className="text-outline text-[10px] shrink-0 w-[52px]"></span>
          <span className="text-secondary blinking-cursor">&gt;</span>
          <span className="text-surface-variant">Awaiting input...</span>
        </li>
      )}
    </ul>
  );
}
