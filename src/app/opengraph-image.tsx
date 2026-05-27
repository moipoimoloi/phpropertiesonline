import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avida by Abigail — Authorized Property Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #1d1c1c 0%, #2a2828 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              padding: "8px 16px",
              background: "#b3252b",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            AVIDA BY ABIGAIL
          </div>
          <span style={{ fontSize: 22, opacity: 0.7 }}>· Licensed Real Estate Broker</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: -1
            }}
          >
            Your trusted partner for premier Philippine properties.
          </h1>
          <p style={{ fontSize: 28, opacity: 0.85, margin: 0 }}>
            Avida Land developments across Metro Manila, Laguna, and Pampanga
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            opacity: 0.7
          }}
        >
          <span>Abigail S. Natan · REB Lic. 0033432</span>
          <span>phpropertiesonline.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
