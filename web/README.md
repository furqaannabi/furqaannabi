# furqaannabi.com

Personal portfolio site for Furqaan Nabi — full-stack engineer focused on infrastructure, privacy, and autonomous systems. Built with Next.js and Tailwind CSS.

## Selected Projects & Awards

Hackathon wins across leading Web3 ecosystems (~$43K in combined prizes).

### SSL — Stealth Settlement Layer · $10K

**1st Place (Privacy Track) — Chainlink Convergence**

A privacy-preserving, sybil-resistant dark pool for tokenized Real World Assets (RWAs). Public chains leak trading activity, exposing institutional traders to front-running and strategy theft. SSL matches client-side-encrypted orders confidentially inside a Chainlink CRE TEE, fetches live prices via Confidential HTTP without leaking API credentials, enforces compliance on-chain through World ID and Chainlink ACE, and settles to single-use shield addresses — so identity is verified while orders and settlement stay invisible.

- Stack: Solidity, Chainlink CRE / ACE / Confidential HTTP, World ID, TEE, Ethereum Sepolia
- Source: https://github.com/furqaannabi/ssl

### Memed.Fun · $20K

**1st Place — Lens Spring**

Where social influence meets token economics. Creators mint their own meme tokens, challenge rivals to 24-hour token battles on Lens, and reward their communities. Battles are scored on live engagement metrics (follows, likes, mirrors, comments, stake weight) via smart-contract snapshots; supporters stake behind memes to boost their heat score and earn a share of battle wins and engagement rewards, distributed through merkle trees.

- Stack: Solidity, OpenZeppelin, Node.js, Express, MongoDB, Lens Protocol, The Graph, Wagmi, IPFS
- Source: https://github.com/furqaannabi/memed

### RepCheck · $7K

**Winner — QuickNode**

An on-chain DeFi reputation system that automatically monitors and rewards user activity across DeFi protocols. Built on RepChain — a custom Avail-powered rollup — it uses QuickNode Streams to watch Uniswap swaps and Aave lending in real time and QuickNode Functions to score and attribute reputation points automatically, with PYUSD staking unlocking point multipliers. All reputation is stored on-chain for transparency and immutability.

- Stack: Solidity, QuickNode Streams & Functions, Avail rollup, PYUSD
- Source: https://github.com/furqaannabi/repcheck

### ArcFlow · $2.5K

**Track Winner — ETHGlobal HackMoney (Arc Track)**

Cross-chain payroll that turns idle reserves into yield. Companies normally let payroll funds sit dead for weeks; ArcFlow parks deposited USDC in a Uniswap V4 LP position (USDC/USDT) to earn fees until payday, then an AI agent autonomously removes liquidity, returns yield to the employer, and bridges principal through Circle Gateway to Arc Chain for distribution to employees. Supports ENS recipients, automated scheduling, and cross-chain APY rebalancing — no manual bridging or DeFi expertise required.

- Stack: Solidity, Uniswap V4, Circle Gateway, Arc Chain, ENS
- Source: https://github.com/furqaannabi/arcflow

### SAVR · $2.5K

**Winner — Lens**

A decentralized Rotating Savings and Credit Association (ROSCA) platform that streamlines group savings on-chain. A group contract on the Lens Chain handles creation, contribution settings, and member invites, while a pool contract on Ethereum Sepolia deposits contributions into Aave to generate yield — coordinated cross-chain over Chainlink CCIP. Each cycle disburses the pooled amount to a member, and accrued interest is distributed when the group completes.

- Stack: Solidity, Aave, Chainlink CCIP, Lens Chain, Ethereum Sepolia
- Source: https://github.com/furqaannabi/savr

### DealForge · $1K

**2nd Place — Synthesis (EigenCloud Track)**

A trustless protocol where AI agents negotiate, escrow funds, and settle deals on-chain — without a single human in the loop. One agent posts a job, another submits a proposal, and an LLM evaluates offers and generates counters autonomously. Once agreed, funds lock in escrow on Base, a decentralized verifier network validates the delivered work inside a TEE, and funds auto-release on consensus. No middleman, no invoices.

- Stack: Solidity, Base (L2), LLM, TEE
- Source: https://github.com/furqaannabi/DealForge

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

A downloadable CV (`furqaan-nabi-cv.pdf`) and its source (`cv.html`) live in `public/`.
