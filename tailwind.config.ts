import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      colors: {
        bg: "#09090b",
        surface: "#0d0d12",
        "surface-2": "#14141d",
        border: "#1f2230",
        "border-light": "#2d3246",
        text: "#fafafa",
        muted: "#94a3b8",
        dim: "#64748b",
        accent: "#3b82f6",
        "accent-cyan": "#06b6d4",
        "accent-dim": "#2563eb",
        "accent-violet": "#8b5cf6",
      },
    },
  },
  plugins: [],
};
export default config;
