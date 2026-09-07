export type Win = {
  name: string;
  placement: string;
  event: string;
  date: string;
  prize: string;
  description: string;
  stack: string[];
  href: string;
  proof?: string;
};

export const HACKATHON_WINS: Win[] = [
  {
    name: "SSL — Stealth Settlement Layer",
    placement: "1st Place (Privacy Track)",
    event: "Chainlink Convergence",
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
