import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RavenDOS — Intelligence, Architected.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: 24,
            display: "flex",
          }}
        >
          <span>RAVEN</span>
          <span style={{ color: "#FF7C48" }}>DOS</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            display: "flex",
          }}
        >
          Intelligence, Architected.
        </div>
      </div>
    ),
    { ...size }
  );
}
