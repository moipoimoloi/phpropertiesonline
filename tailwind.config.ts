import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b3252b",
        "primary-container": "#8a1d22",
        "primary-fixed": "#f4cdcf",
        secondary: "#6d6f70",
        "secondary-container": "#d6d7d8",
        "on-secondary-container": "#2a2b2c",
        tertiary: "#585a5c",
        background: "#f7f6f5",
        surface: "#f7f6f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eeeded",
        "surface-container": "#e3e3e3",
        "surface-container-high": "#d8d8d8",
        "surface-light": "#eeeded",
        "on-surface": "#1d1c1c",
        "on-surface-variant": "#4a4949",
        outline: "#7e7d7d",
        "outline-variant": "#cfcece",
        charcoal: "#1d1c1c",
        "alviera-teal": "#2b8170"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        gutter: "24px",
        base: "8px"
      },
      maxWidth: {
        "container-max": "1280px"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    }
  },
  plugins: [forms]
};

export default config;
