"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#444748"; // outline-variant color
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      let numParticles = (width * height) / 15000; // Density
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(142, 145, 146, ${1 - dist / 100})`; // outline color with distance-based opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    resize();
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* TopAppBar */}
      <nav className="bg-surface-dim dark:bg-surface-dim flex justify-between items-center w-full px-margin h-12 docked full-width top-0 border-b border-outline-variant flat no shadows z-50 sticky">
        <div className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed tracking-widest">
          FURQAAN_NABI
        </div>
        <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md md:font-label-caps md:text-label-caps">
          <a
            className="text-secondary border-b border-secondary font-bold hover:text-secondary transition-colors active:opacity-80 transition-all"
            href="#dashboard"
          >
            DASHBOARD
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors active:opacity-80 transition-all"
            href="#systems"
          >
            SYSTEMS
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors active:opacity-80 transition-all"
            href="#hackathons"
          >
            HACKATHONS
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary transition-colors active:opacity-80 transition-all"
            href="#competencies"
          >
            COMPETENCIES
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-tertiary">
            STATUS: ONLINE
          </span>
          <span
            className="material-symbols-outlined text-tertiary"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            schedule
          </span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col md:flex-row relative z-10 w-full max-w-[1440px] mx-auto">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid pointer-events-none -z-20"></div>

        {/* Active Telemetry Canvas */}
        <canvas id="telemetry-canvas" ref={canvasRef}></canvas>

        {/* SideNavBar (Hidden on Mobile) */}
        <aside className="hidden lg:flex flex-col h-screen py-module-padding bg-surface-container-lowest dark:bg-surface-container-lowest docked left-0 h-full w-64 border-r border-outline-variant flat no shadows shrink-0 sticky top-12">
          <div className="px-module-padding mb-8">
            <div className="font-headline-sm text-headline-sm text-on-surface mb-2">
              FURQAAN_NABI
            </div>
            <div className="font-label-caps text-label-caps text-on-surface-variant">
              ROLE: FULL_STACK_ENG
            </div>
          </div>
          <nav className="flex flex-col gap-2 flex-grow">
            <a
              className="bg-secondary text-on-secondary font-bold flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="#dashboard"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                terminal
              </span>{" "}
              DASHBOARD
            </a>
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="#systems"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                deployed_code
              </span>{" "}
              SYSTEMS
            </a>
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="#hackathons"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                emoji_events
              </span>{" "}
              HACKATHONS
            </a>
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="#competencies"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                lan
              </span>{" "}
              COMPETENCIES
            </a>
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="#metrics"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                bar_chart
              </span>{" "}
              METRICS
            </a>
          </nav>
          <div className="mt-auto px-module-padding pb-4 border-b border-surface-variant mb-4">
            <a
              href="mailto:hi@furqaannabi.com"
              className="block w-full text-left font-label-caps text-label-caps text-secondary hover:text-white transition-colors blinking-cursor"
            >
              [ OPEN_COMMS ]
            </a>
            <div className="font-code-sm text-code-sm text-outline mt-2 break-all">
              hi@furqaannabi.com
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="https://github.com/furqaannabi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                code
              </span>{" "}
              GITHUB
            </a>
            <a
              className="text-on-surface-variant flex items-center gap-2 p-2 mx-2 hover:bg-surface-container-highest transition-all duration-75 active:translate-x-1"
              href="https://www.linkedin.com/in/furqaannabi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                person
              </span>{" "}
              LINKEDIN
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow p-gutter md:p-margin flex flex-col gap-gutter">
          {/* Hero Dashboard Top Area */}
          <section
            id="dashboard"
            className="module-border bg-surface-container-lowest/80 backdrop-blur-sm p-module-padding flex flex-col justify-center min-h-[409px] relative overflow-hidden group scroll-mt-16"
          >
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-surface-variant"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-surface-variant"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-surface-variant"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-surface-variant"></div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                ONLINE // OPEN_TO_WORK
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="font-label-caps text-label-caps text-secondary mb-3 tracking-widest">
                  &gt; OPERATOR // FURQAAN NABI
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface max-w-4xl mb-6 leading-tight">
                  Building seamless systems with purpose — high-impact
                  infrastructure across Web2 and Web3.
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mb-6">
                  Full-stack engineer focused on infrastructure, privacy, and
                  autonomous systems. From private settlement layers to
                  AI-driven protocols, building systems designed to operate at
                  scale, under pressure, and without reliance on centralized
                  control.
                </p>
                <blockquote className="border-l-2 border-secondary pl-4 italic font-body-md text-body-md text-on-surface max-w-2xl mb-6">
                  &ldquo;Real power comes from building things that just work,
                  again and again, under pressure and at scale.&rdquo;
                </blockquote>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a
                    href="#systems"
                    className="terminal-button font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest text-primary"
                  >
                    [ View Systems ]
                  </a>
                  <a
                    href="#hackathons"
                    className="terminal-button font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest text-primary"
                  >
                    [ Hackathon Wins ]
                  </a>
                  <a
                    href="mailto:hi@furqaannabi.com"
                    className="terminal-button font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest text-primary"
                  >
                    [ Contact ]
                  </a>
                </div>
              </div>
              <div className="hidden md:block w-64 h-64 border border-surface-variant p-2 bg-[#0A0A0A]">
                <img
                  src="/images/hero.gif"
                  alt="Hero Animation"
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </section>

          {/* Bento Grid Layout for Systems & Now Building */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Systems Section (Featured Project) */}
            <section
              id="systems"
              className="md:col-span-8 module-border bg-surface-container-lowest/90 backdrop-blur-sm flex flex-col scroll-mt-16"
            >
              <div className="border-b border-surface-variant p-2 px-4 flex items-center bg-surface-container-low">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  SYS_01 // FEATURED_DEPLOYMENT
                </span>
              </div>
              <div className="p-module-padding flex-grow flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start items-start gap-3 md:gap-4">
                  <div className="min-w-0">
                    <h2 className="font-headline-md text-headline-md text-secondary mb-1">
                      SSL — STEALTH SETTLEMENT LAYER
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Private settlement layer using Chainlink CRE — 1st Place
                      (Privacy Track), Chainlink Convergence ($10K)
                    </p>
                  </div>
                  <div className="bg-tertiary-fixed-dim/20 text-tertiary border border-tertiary font-label-caps text-label-caps px-2 py-1 uppercase whitespace-nowrap self-start shrink-0">
                    [ STATUS : DEPLOYED ]
                  </div>
                </div>

                {/* Mini Architecture Diagram Mockup */}
                <div className="bg-[#0A0A0A] border border-surface-variant p-4 pt-6 font-code-sm text-code-sm text-on-surface-variant relative overflow-x-auto">
                  <div className="absolute top-2 right-2 text-surface-variant text-xs">
                    ARCH_V1.2
                  </div>
                  <div className="flex justify-between items-center gap-2 max-w-md mx-auto my-4 min-w-[420px]">
                    <div className="border border-outline-variant p-2 text-center w-24 shrink-0">
                      SENDER
                    </div>
                    <div className="h-px bg-outline-variant w-12 relative shrink-0">
                      <span className="absolute right-0 -top-1">►</span>
                    </div>
                    <div className="border border-secondary text-secondary p-2 text-center w-32 shadow-[0_0_10px_rgba(255,182,147,0.1)] shrink-0">
                      STEALTH_CRE
                    </div>
                    <div className="h-px bg-outline-variant w-12 relative shrink-0">
                      <span className="absolute right-0 -top-1">►</span>
                    </div>
                    <div className="border border-outline-variant p-2 text-center w-24 shrink-0">
                      RECEIVER
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-label-caps text-label-caps text-outline mb-2">
                      INFRA_STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps">
                        SOLIDITY
                      </span>
                      <span className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps">
                        CHAINLINK_CRE
                      </span>
                      <span className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps">
                        EVM
                      </span>
                      <span className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps">
                        CCIP
                      </span>
                      <span className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps">
                        REACT
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-outline mb-2">
                      SYS_OBJECTIVE
                    </div>
                    <p className="font-body-md text-body-md text-on-surface text-sm">
                      Enable privacy-preserving settlement for digital value
                      transfer — recipients stay stealthed while transactions
                      remain verifiable across chains.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2 border-t border-surface-variant">
                  <a
                    href="https://github.com/furqaannabi/ssl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-button font-label-caps text-label-caps px-4 py-2 uppercase tracking-widest text-primary"
                  >
                    [ SOURCE ]
                  </a>
                  <span className="font-label-caps text-label-caps text-outline self-center">
                    AWARD // CHAINLINK_CONVERGENCE_2024
                  </span>
                </div>
              </div>
            </section>

            {/* Core Competencies Section */}
            <section
              id="competencies"
              className="md:col-span-4 module-border bg-surface-container-lowest/90 backdrop-blur-sm flex flex-col scroll-mt-16"
            >
              <div className="border-b border-surface-variant p-2 px-4 flex items-center bg-surface-container-low justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  LOG // CORE_COMPETENCIES
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              </div>
              <div className="p-module-padding flex-grow bg-[#0A0A0A] font-code-sm text-code-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <ul
                  className="space-y-4 relative z-10 text-on-surface-variant"
                  id="live-feed"
                >
                  <li className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <div>
                      <span className="text-outline text-xs block mb-1">
                        MOD_01 // FULL_STACK_ENG
                      </span>
                      <span className="text-on-surface">
                        React, Node.js, scalable backend systems
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <div>
                      <span className="text-outline text-xs block mb-1">
                        MOD_02 // SMART_CONTRACTS_WEB3
                      </span>
                      <span className="text-on-surface">
                        Solidity, EVM, cross-chain (CCIP)
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <div>
                      <span className="text-outline text-xs block mb-1">
                        MOD_03 // INFRA_SYSTEMS_DESIGN
                      </span>
                      <span className="text-on-surface">
                        High-throughput, decentralized architectures
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <div>
                      <span className="text-outline text-xs block mb-1">
                        MOD_04 // AI_AUTONOMOUS_SYS
                      </span>
                      <span className="text-on-surface">
                        LLM-powered workflows, agent-based execution
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <div>
                      <span className="text-outline text-xs block mb-1">
                        MOD_05 // CLOUD_DEVOPS
                      </span>
                      <span className="text-on-surface">
                        AWS, Docker, distributed systems
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-2 opacity-50">
                    <span className="text-secondary blinking-cursor">&gt;</span>
                    <span className="text-surface-variant">
                      Awaiting input...
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Hackathon Wins Section */}
            <section
              id="hackathons"
              className="md:col-span-12 module-border bg-surface-container-lowest/90 backdrop-blur-sm flex flex-col mt-4 scroll-mt-16"
            >
              <div className="border-b border-surface-variant p-2 px-4 flex items-center bg-surface-container-low justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  SYS_02 // HACKATHON_WINS
                </span>
                <span className="font-label-caps text-label-caps text-tertiary">
                  TOTAL_PRIZE ~ $42.5K
                </span>
              </div>
              <div className="p-module-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {[
                  {
                    name: "SSL — Stealth Settlement Layer",
                    placement: "1st Place (Privacy Track)",
                    event: "Chainlink Convergence",
                    prize: "$10K",
                    description: "Private settlement layer using CRE",
                    href: "https://github.com/furqaannabi/ssl",
                  },
                  {
                    name: "DealForge",
                    placement: "2nd Place",
                    event: "Synthesis — EigenCloud Track",
                    prize: "$1K",
                    description:
                      "AI agents negotiate + settle deals on-chain",
                    href: "https://github.com/furqaannabi/DealForge",
                  },
                  {
                    name: "ArcFlow",
                    placement: "Track Winner",
                    event: "ETHGlobal HackMoney — Arc Track",
                    prize: "$2.5K",
                    description: "Yield-generating corporate treasury",
                    href: "https://github.com/furqaannabi/arcflow",
                  },
                  {
                    name: "Memed.Fun",
                    placement: "1st Place",
                    event: "Lens Spring",
                    prize: "$20K GHO",
                    description: "Tokenized meme economy on Lens",
                    href: "https://github.com/furqaannabi/memed",
                  },
                  {
                    name: "RepCheck",
                    placement: "Winner",
                    event: "QuickNode",
                    prize: "$7K",
                    description: "On-chain reputation protocol",
                    href: "https://github.com/furqaannabi/repcheck",
                  },
                  {
                    name: "SAVR",
                    placement: "Winner",
                    event: "Lens",
                    prize: "$2.5K GHO",
                    description: "Decentralized ROSCA system",
                    href: "https://github.com/furqaannabi/savr",
                  },
                ].map((win) => (
                  <a
                    key={win.name}
                    href={win.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="module-border bg-[#0A0A0A] p-4 flex flex-col gap-3 hover:border-secondary transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-secondary group-hover:text-white transition-colors">
                        {win.name}
                      </h3>
                      <span className="font-label-caps text-label-caps text-tertiary border border-tertiary px-2 py-1 whitespace-nowrap">
                        {win.prize}
                      </span>
                    </div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant">
                      {win.placement} // {win.event}
                    </div>
                    <p className="font-body-md text-body-md text-on-surface text-sm">
                      {win.description}
                    </p>
                    <div className="mt-auto pt-2 border-t border-surface-variant font-label-caps text-label-caps text-outline group-hover:text-secondary transition-colors">
                      [ VIEW_SOURCE ►
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* GitHub Stats Section */}
            <section
              id="metrics"
              className="md:col-span-12 module-border bg-surface-container-lowest/90 backdrop-blur-sm flex flex-col mt-4 scroll-mt-16"
            >
              <div className="border-b border-surface-variant p-2 px-4 flex items-center bg-surface-container-low">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  SYS_03 // GITHUB_METRICS
                </span>
              </div>
              <div className="p-module-padding flex-grow flex flex-col md:flex-row gap-6 justify-center items-center">
                <img
                  src="/images/streak.svg"
                  alt="GitHub Streak"
                  className="w-full max-w-md"
                />
                <img
                  src="/images/top-langs.svg"
                  alt="Top Languages"
                  className="w-full max-w-md"
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim dark:bg-surface-dim flex flex-col md:flex-row justify-between items-center w-full px-margin py-4 gap-gutter docked full-width bottom-0 border-t border-outline-variant flat no shadows font-code-sm text-code-sm uppercase z-50 mt-auto">
        <div className="font-label-caps text-label-caps text-outline">
          © {new Date().getFullYear()} FURQAAN_NABI

        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            className="text-outline hover:text-secondary hover:underline underline-offset-4 transition-opacity duration-150"
            href="https://github.com/furqaannabi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a
            className="text-outline hover:text-secondary hover:underline underline-offset-4 transition-opacity duration-150"
            href="https://x.com/0xfurqaan"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            className="text-outline hover:text-secondary hover:underline underline-offset-4 transition-opacity duration-150"
            href="https://www.linkedin.com/in/furqaannabi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
          <a
            className="text-outline hover:text-secondary hover:underline underline-offset-4 transition-opacity duration-150"
            href="https://t.me/furqaannabi"
            target="_blank"
            rel="noopener noreferrer"
          >
            TELEGRAM
          </a>
          <a
            className="text-outline hover:text-secondary hover:underline underline-offset-4 transition-opacity duration-150"
            href="mailto:hi@furqaannabi.com"
          >
            EMAIL
          </a>
        </div>
      </footer>
    </>
  );
}