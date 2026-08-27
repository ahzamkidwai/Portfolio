import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base neutrals — off-white paper, near-black ink (not pure #000/#fff).
        // Backed by CSS variables (defined in globals.css) so values swap
        // automatically between light and dark themes.
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        "paper-dim": "rgb(var(--color-paper-dim) / <alpha-value>)",
        // Elevated card/panel surface — white in light mode, a raised dark
        // panel in dark mode. Use for card backgrounds instead of bg-white.
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-strong": "rgb(var(--color-line-strong) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        // Single accent: "signal" — a confident engineering blue, not the
        // common terracotta/cream or acid-green AI-portfolio defaults.
        signal: {
          DEFAULT: "rgb(var(--color-signal) / <alpha-value>)",
          soft: "rgb(var(--color-signal-soft) / <alpha-value>)",
          dim: "rgb(var(--color-signal-dim) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,18,20,0.04), 0 8px 24px -12px rgba(18,18,20,0.10)",
        "card-hover": "0 2px 4px rgba(18,18,20,0.05), 0 16px 32px -12px rgba(18,18,20,0.16)",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
