import { ImageResponse } from "next/og";
import { HACKATHON_WINS, TOTAL_PRIZE_DISPLAY } from "./data";

export const alt =
  "Furqaan Nabi — Full-Stack Engineer building infrastructure, privacy, and autonomous systems across Web2 and Web3";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COMPETENCIES = [
  "FULL_STACK_ENG",
  "SMART_CONTRACTS_WEB3",
  "INFRA_SYSTEMS_DESIGN",
  "AI_AUTONOMOUS_SYS",
  "CLOUD_DEVOPS",
];

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [monoBold, monoRegular] = await Promise.all([
    loadFont(
      "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Bold.ttf",
    ),
    loadFont(
      "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Regular.ttf",
    ),
  ]);

  const fonts = [
    monoBold && {
      name: "JetBrains Mono",
      data: monoBold,
      weight: 700 as const,
      style: "normal" as const,
    },
    monoRegular && {
      name: "JetBrains Mono",
      data: monoRegular,
      weight: 400 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[];

  const fontFamily = fonts.length ? "JetBrains Mono" : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#131313",
          color: "#e5e2e1",
          fontFamily,
          backgroundImage:
            "linear-gradient(90deg, rgba(68,71,72,0.18) 1px, transparent 1px), linear-gradient(rgba(68,71,72,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 56px",
            borderBottom: "1px solid #353535",
            fontSize: 18,
            letterSpacing: 3,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#ffb693" }}>FURQAAN_NABI</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#00e639",
              }}
            />
            <span style={{ color: "#00e639" }}>STATUS: ONLINE</span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 56px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#8e9192",
              letterSpacing: 4,
              marginBottom: 18,
            }}
          >
            {"> OPERATOR // FULL_STACK_ENGINEER"}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              marginBottom: 26,
            }}
          >
            Furqaan Nabi
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#c4c7c7",
              lineHeight: 1.35,
              maxWidth: 1000,
              marginBottom: 36,
            }}
          >
            Building seamless systems with purpose — infrastructure, privacy,
            and autonomous systems across Web2 and Web3.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {COMPETENCIES.map((c) => (
              <div
                key={c}
                style={{
                  border: "1px solid #444748",
                  backgroundColor: "#1c1b1b",
                  color: "#e5e2e1",
                  padding: "10px 16px",
                  fontSize: 17,
                  letterSpacing: 2,
                  fontWeight: 700,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "26px 56px",
            borderTop: "1px solid #353535",
            fontSize: 20,
            letterSpacing: 3,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#00e639" }}>
            {`${HACKATHON_WINS.length} HACKATHON_WINS // TOTAL_PRIZE ~ ${TOTAL_PRIZE_DISPLAY}`}
          </span>
          <span style={{ color: "#8e9192" }}>furqaannabi.com</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
