import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://furqaannabi.com";
const TITLE = "Furqaan Nabi";
const DESCRIPTION =
  "Full-stack engineer building high-impact systems across Web2 and Web3 — infrastructure, privacy, and autonomous systems. Multiple-time hackathon winner (Chainlink, ETHGlobal, Lens, QuickNode).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} | Building Seamless Systems with Purpose`,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  authors: [{ name: TITLE, url: SITE_URL }],
  creator: TITLE,
  keywords: [
    "Furqaan Nabi",
    "full-stack engineer",
    "Web3 developer",
    "Solidity",
    "smart contracts",
    "Chainlink CRE",
    "Base",
    "privacy infrastructure",
    "autonomous systems",
    "AI agents",
    "hackathon winner",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: TITLE,
    title: `${TITLE} — Full-Stack Engineer, Web3 & Autonomous Systems`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@0xfurqaan",
    creator: "@0xfurqaan",
    title: `${TITLE} — Full-Stack Engineer, Web3 & Autonomous Systems`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "https://github.com/furqaannabi.png?size=32", sizes: "32x32" },
      { url: "https://github.com/furqaannabi.png?size=192", sizes: "192x192" },
    ],
    apple: "https://github.com/furqaannabi.png?size=180",
    shortcut: "https://github.com/furqaannabi.png?size=64",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}