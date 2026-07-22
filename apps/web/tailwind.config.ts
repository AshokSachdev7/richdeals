import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e63946",
          dark: "#c1121f",
          accent: "#f77f00",
        },
        // Amber/orange savings accent + deep ink navy for text/headers.
        savings: {
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        ink: {
          DEFAULT: "#0f172a",
          soft: "#1e293b",
        },
      },
      fontFamily: {
        // Nunito Sans body (default), Rubik for headings via `font-display`.
        sans: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-rubik)", "var(--font-nunito)", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
