import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "bubble-in": {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "100%": { opacity: "1", transform: "scaleX(1)" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "30%": { transform: "translateY(-4px)", opacity: "1" },
        },
      },
      animation: {
        "bubble-in": "bubble-in 0.3s ease-out forwards",
        "typing-dot": "typing-dot 1s ease-in-out infinite",
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "ui-sans-serif", "system-ui"],
        body: ["\"Space Grotesk\"", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#111318",
        fog: "#F2F4F8",
        neon: "#65FBD2",
        amber: "#F7C948",
        rose: "#FF6B6B",
        slate: "#39424E",
      },
      boxShadow: {
        glow: "0 0 40px rgba(101, 251, 210, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
