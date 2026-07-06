import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf6f0",
          100: "#f3ead9",
          200: "#e7d4b5",
          300: "#d9ba8b",
        },
        terracotta: {
          400: "#d98a5f",
          500: "#c96f43",
          600: "#b25630",
        },
        sea: {
          500: "#2f7d8c",
          600: "#256574",
          700: "#1d4f5c",
          800: "#163b45",
          900: "#0f2a31",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
