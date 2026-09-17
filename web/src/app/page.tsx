import { execSync } from "child_process";
import Image from "next/image";
import TelemetryCanvas from "./TelemetryCanvas";
import NavLinks from "./NavLinks";
import StatCounter from "./StatCounter";
import Effects from "./Effects";
import WinDetails from "./WinDetails";
import {
  HACKATHON_WINS,
  TOTAL_PRIZE_K,
  ACTIVE_SINCE_YEAR,
  CURRENT_YEAR,
  LATEST_WIN,
  WINS_BY_PRIZE,
  type Win,
} from "./data";

const FEATURED_COUNT = 3;
const FEATURED_WINS = WINS_BY_PRIZE.slice(0, FEATURED_COUNT);
const COMPACT_WINS = WINS_BY_PRIZE.slice(FEATURED_COUNT);

function resolveBuildHash(): string {
  const fromEnv =
    process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_COMMIT_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);
  try {
    return execSync("git rev-parse --short=7 HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

const BUILD_HASH = resolveBuildHash();

function WinCard({
  win,
  index,
  featured = false,
}: {
  win: Win;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className="module-border card-hover bg-[#0A0A0A] p-4 flex flex-col gap-3 group relative"
    >
      <WinDetails win={win} rank={index + 1} total={HACKATHON_WINS.length} />
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`${
            featured ? "font-headline-sm text-headline-sm" : "font-body-md text-body-md font-semibold"
          } text-secondary group-hover:text-white transition-colors`}
        >
          {win.name}
        </h3>
        <span
          className={`font-label-caps text-label-caps border px-2 py-1 whitespace-nowrap ${
            featured
              ? "text-tertiary border-tertiary bg-tertiary-fixed-dim/10"
              : "text-tertiary/80 border-tertiary/50"
          }`}
        >
          {win.prize}
        </span>
      </div>
      <div className="flex items-start justify-between gap-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          {`${win.placement} // ${win.event}`}
        </span>
        <span className="font-label-caps text-label-caps text-outline whitespace-nowrap">
          {win.date}
        </span>
      </div>
      <p
        className={`font-body-md text-body-md text-on-surface text-sm ${
          featured ? "" : "line-clamp-2 text-on-surface-variant"
        }`}
      >
        {win.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {(featured ? win.stack : win.stack.slice(0, 3)).map((tech) => (
          <span
            key={tech}
            className="bg-surface-variant text-on-surface px-1.5 py-0.5 font-label-caps text-label-caps text-[10px]"
          >
            {tech}
          </span>
        ))}
        {!featured && win.stack.length > 3 && (
          <span className="text-outline px-1 py-0.5 font-label-caps text-label-caps text-[10px]">
            +{win.stack.length - 3}
          </span>
        )}
      </div>
      <div className="mt-auto pt-2 border-t border-surface-variant font-label-caps text-label-caps text-outline flex flex-wrap gap-4 relative z-10">
        <a
          href={win.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary transition-colors"
        >
          [ VIEW_SOURCE ]
        </a>
        {win.proof && (
          <a
            href={win.proof}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            [ PROOF ]
          </a>
        )}
      </div>
    </article>
  );
}

type Social = {
  label: string;
  href: string;
  path: string;
};

const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/furqaannabi",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "X",
    href: "https://x.com/0xfurqaan",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/furqaannabi/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Telegram",
    href: "https://t.me/furqaannabi",
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/furqaannabi/",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    label: "Email",
    href: "mailto:hi@furqaannabi.com",
    path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  },
];

export default function Home() {
  return (
    <>
      {/* TopAppBar */}
      <nav className="bg-surface-dim dark:bg-surface-dim flex justify-between items-center w-full px-margin h-12 docked full-width top-0 border-b border-outline-variant flat no shadows z-50 sticky">
        <div className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed tracking-widest">
          FURQAAN_NABI
        </div>
        <NavLinks />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-label-caps text-label-caps text-tertiary">
            STATUS: ONLINE
          </span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col md:flex-row relative z-10 w-full max-w-[1440px] mx-auto">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid pointer-events-none -z-20"></div>

        {/* Active Telemetry Canvas */}
        <TelemetryCanvas />
        <Effects />

        {/* Main Content Area */}
        <div className="flex-grow p-gutter md:p-margin flex flex-col gap-gutter">
          {/* Hero Dashboard Top Area */}
          <section
            id="dashboard"
            className="module-border bg-surface-container-lowest/80 backdrop-blur-sm p-module-padding flex flex-col justify-center relative overflow-hidden group scroll-mt-16"
          >
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-surface-variant"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-surface-variant"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-surface-variant"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-surface-variant"></div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-1 min-w-0">
                <div className="font-label-caps text-label-caps text-secondary mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="opacity-60">&gt;</span>
                  <span className="text-outline">LATEST_DEPLOYMENT:</span>
                  <a
                    href={LATEST_WIN.proof ?? LATEST_WIN.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    {LATEST_WIN.name}
                  </a>
                  <span className="text-outline">
                    {`// ${LATEST_WIN.org} · ${LATEST_WIN.date.toUpperCase()}`}
                  </span>
                  <span className="text-secondary blinking-cursor" aria-hidden="true"></span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface max-w-4xl mb-5 leading-tight">
                  Building seamless systems with purpose — high-impact
                  infrastructure across Web2 and Web3.
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mb-5">
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
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hi@furqaannabi.com"
                    className="terminal-button font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest text-primary"
                  >
                    [ Contact ]
                  </a>
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-button font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest text-primary"
                  >
                    [ View CV ]
                  </a>
                </div>
              </div>

              <div className="w-36 h-36 md:w-60 md:h-60 mx-auto md:mx-0 order-first md:order-none photo-frame border border-surface-variant p-2 bg-[#0A0A0A] shrink-0">
                <span className="bracket top-[-1px] left-[-1px] border-t border-l" aria-hidden="true" />
                <span className="bracket top-[-1px] right-[-1px] border-t border-r" aria-hidden="true" />
                <span className="bracket bottom-[-1px] left-[-1px] border-b border-l" aria-hidden="true" />
                <span className="bracket bottom-[-1px] right-[-1px] border-b border-r" aria-hidden="true" />
                <Image
                  src="https://github.com/furqaannabi.png?size=512"
                  alt="Furqaan Nabi"
                  width={512}
                  height={512}
                  sizes="(min-width: 768px) 240px, 144px"
                  preload
                  className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 photo-frame-img"
                />
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-8 pt-6 border-t border-surface-variant grid grid-cols-2 md:grid-cols-4 gap-y-6">
              <div className="py-1 md:pr-6">
                <div className="font-headline-md text-headline-md text-on-surface leading-none">
                  BCA
                </div>
                <div className="font-label-caps text-label-caps text-outline mt-2">
                  FINTECH_&amp;_AI // AMITY · 2028
                </div>
              </div>
              <div className="py-1 pl-4 md:px-6 border-l border-surface-variant">
                <div className="font-headline-md text-headline-md text-on-surface tabular-nums leading-none">
                  <StatCounter value={HACKATHON_WINS.length} pad={2} />
                </div>
                <div className="font-label-caps text-label-caps text-outline mt-2">
                  HACKATHON_WINS
                </div>
              </div>
              <div className="py-1 md:px-6 md:border-l border-surface-variant">
                <div className="font-headline-md text-headline-md text-tertiary tabular-nums leading-none">
                  <StatCounter
                    value={TOTAL_PRIZE_K}
                    prefix="$"
                    suffix="K"
                    decimals={1}
                    delayMs={120}
                  />
                </div>
                <div className="font-label-caps text-label-caps text-outline mt-2">
                  TOTAL_PRIZES
                </div>
              </div>
              <div className="py-1 pl-4 md:pl-6 border-l border-surface-variant">
                <div className="font-headline-md text-headline-sm md:text-headline-md text-on-surface tabular-nums leading-none whitespace-nowrap">
                  <StatCounter value={ACTIVE_SINCE_YEAR} delayMs={360} durationMs={900} />
                  <span className="text-secondary mx-1">→</span>
                  <StatCounter value={CURRENT_YEAR} delayMs={360} durationMs={900} />
                </div>
                <div className="font-label-caps text-label-caps text-outline mt-2">
                  ACTIVE_RANGE
                </div>
              </div>
            </div>
          </section>

          {/* Hackathon Wins Section */}
          <section
            id="hackathons"
            className="module-border bg-surface-container-lowest/90 backdrop-blur-sm flex flex-col scroll-mt-16"
          >
            <div className="border-b border-surface-variant p-2 px-4 flex items-center bg-surface-container-low justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                SYS_01 // HACKATHON_WINS
              </span>
              <span className="font-label-caps text-label-caps text-outline">
                SORTED_BY_PRIZE
              </span>
            </div>
            <div className="p-module-padding flex flex-col gap-gutter">
              {/* Featured wins */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {FEATURED_WINS.map((win, i) => (
                  <WinCard key={win.name} win={win} index={i} featured />
                ))}
              </div>

              {/* Remaining wins */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {COMPACT_WINS.map((win, i) => (
                  <WinCard key={win.name} win={win} index={i + FEATURED_COUNT} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim dark:bg-surface-dim flex flex-col md:flex-row justify-between items-center w-full px-margin py-4 gap-gutter docked full-width bottom-0 border-t border-outline-variant">
        <div className="font-label-caps text-label-caps text-outline flex items-center gap-3">
          <span>© {new Date().getFullYear()} FURQAAN_NABI</span>
          <span className="text-surface-variant" aria-hidden="true">
            |
          </span>
          <span className="text-outline/70" title="Deployed commit">
            BUILD // <span className="text-secondary/80">{BUILD_HASH}</span>
          </span>
        </div>
        <div className="flex gap-5 flex-wrap justify-center items-center">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              className="text-outline hover:text-secondary transition-colors duration-150"
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(social.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
