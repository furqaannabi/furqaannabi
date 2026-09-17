export type Win = {
  name: string;
  placement: string;
  event: string;
  org: string;
  date: string;
  prize: string;
  description: string;
  stack: string[];
  href: string;
  proof?: string;
};

export const HACKATHON_WINS: Win[] = [
  {
    name: "ArcAsset",
    placement: "Prize Winner",
    event: "ETHGlobal ETHOnline — World Selfie Check",
    org: "ETHGLOBAL",
    date: "Sep 2026",
    prize: "$1.17K",
    description:
      "Autonomous agents servicing tokenized private credit on Arc — World ID-gated originators and borrowers, a bounded-authority agent that advances periods, marks delinquency, and distributes coupons in native USDC, with the repayment record sold per query over HTTP 402.",
    stack: ["SOLIDITY", "ARC", "WORLD_ID", "THE_GRAPH", "X402"],
    href: "https://github.com/furqaannabi/arcasset",
    proof: "https://ethglobal.com/showcase/arcasset-av1gr",
  },
  {
    name: "SSL — Stealth Settlement Layer",
    placement: "1st Place (Privacy Track)",
    event: "Chainlink Convergence",
    org: "CHAINLINK",
    date: "Mar 2026",
    prize: "$10K",
    description:
      "Privacy-preserving dark pool for tokenized RWAs — orders are matched confidentially inside a Chainlink CRE TEE, with World ID + ACE compliance and single-use shield addresses for private settlement.",
    stack: ["SOLIDITY", "CHAINLINK_CRE", "WORLD_ID", "ACE", "TEE"],
    href: "https://github.com/furqaannabi/ssl",
    proof: "https://blog.chain.link/convergence-hackathon-winners/",
  },
  {
    name: "DealForge",
    placement: "2nd Place",
    event: "Synthesis — EigenCloud Track",
    org: "SYNTHESIS",
    date: "Apr 2026",
    prize: "$1K",
    description:
      "Trustless protocol where AI agents negotiate, escrow funds, and settle deals on-chain — LLM-driven negotiation with a TEE-attested verifier network on Base, no human in the loop.",
    stack: ["SOLIDITY", "BASE", "LLM", "TEE"],
    href: "https://github.com/furqaannabi/DealForge",
    proof: "https://synthesis.md/projects/#project/dealforge-9b3f",
  },
  {
    name: "ArcFlow",
    placement: "Track Winner",
    event: "ETHGlobal HackMoney — Arc Track",
    org: "ETHGLOBAL",
    date: "Feb 2026",
    prize: "$2.5K",
    description:
      "Cross-chain payroll with yield — idle USDC earns via Uniswap V4 LP positions, then an AI agent auto-bridges payouts through Circle Gateway to Arc Chain on payday.",
    stack: ["SOLIDITY", "UNISWAP_V4", "CIRCLE_GATEWAY", "ENS"],
    href: "https://github.com/furqaannabi/arcflow",
    proof: "https://ethglobal.com/showcase/arcflow-rwysr",
  },
  {
    name: "Memed.Fun",
    placement: "1st Place",
    event: "Lens Spring",
    org: "LENS",
    date: "May 2025",
    prize: "$20K",
    description:
      "Creators mint their own meme tokens, battle for supremacy on Lens, and reward communities through a staking and engagement-rewards ecosystem.",
    stack: ["SOLIDITY", "LENS", "NODE.JS", "THE_GRAPH", "IPFS"],
    href: "https://github.com/furqaannabi/memed",
    proof: "https://x.com/i/status/1929966819940676062",
  },
  {
    name: "SAVR",
    placement: "Honorable Mention",
    event: "Lens Holiday",
    org: "LENS",
    date: "Jan 2025",
    prize: "$2.5K",
    description:
      "Decentralized ROSCA for group savings — smart contracts pool contributions, earn yield via Aave, and coordinate disbursements cross-chain over Chainlink CCIP.",
    stack: ["SOLIDITY", "AAVE", "CHAINLINK_CCIP", "LENS_CHAIN"],
    href: "https://github.com/furqaannabi/savr",
    proof: "https://x.com/i/status/1879908057700016179",
  },
  {
    name: "RepCheck",
    placement: "2nd Place",
    event: "QuickNode Build On",
    org: "QUICKNODE",
    date: "Nov 2024",
    prize: "$7K",
    description:
      "On-chain DeFi reputation protocol on RepChain (an Avail rollup) — tracks Uniswap/Aave activity in real time via QuickNode Streams & Functions, with PYUSD staking multipliers.",
    stack: ["SOLIDITY", "QUICKNODE", "AVAIL", "PYUSD"],
    href: "https://github.com/furqaannabi/repcheck",
    proof: "https://devfolio.co/projects/repcheck-0e48",
  },
];

function parsePrizeK(prize: string): number {
  const match = prize.match(/\$([0-9]+(?:\.[0-9]+)?)\s*K/i);
  return match ? parseFloat(match[1]) : 0;
}

export function formatTotalPrize(wins: Win[]): string {
  const total = wins.reduce((sum, w) => sum + parsePrizeK(w.prize), 0);
  const rounded = Number.isInteger(total) ? total.toString() : total.toFixed(1);
  return `$${rounded}K`;
}

export const TOTAL_PRIZE_DISPLAY = formatTotalPrize(HACKATHON_WINS);

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** Parses "Sep 2026" → Date */
export function parseWinDate(date: string): Date {
  const [mon, year] = date.split(" ");
  return new Date(Number(year), MONTHS[mon] ?? 0, 1);
}


/** Wins largest prize → smallest */
export const WINS_BY_PRIZE: Win[] = [...HACKATHON_WINS].sort(
  (a, b) => parsePrizeK(b.prize) - parsePrizeK(a.prize),
);

export const TOTAL_PRIZE_K = HACKATHON_WINS.reduce(
  (sum, w) => sum + parsePrizeK(w.prize),
  0,
);


/** Active range: building since 2022 → current year */
export const ACTIVE_SINCE_YEAR = 2022;
export const CURRENT_YEAR = new Date().getFullYear();

export const LATEST_WIN: Win = [...HACKATHON_WINS].sort(
  (a, b) => parseWinDate(b.date).getTime() - parseWinDate(a.date).getTime(),
)[0];
