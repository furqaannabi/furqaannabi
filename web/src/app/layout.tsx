import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furqaan Nabi",
  description:
    "Furqaan Nabi — full-stack engineer building high-impact systems across Web2 and Web3, with a focus on infrastructure, privacy, and autonomous systems.",
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