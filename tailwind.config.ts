import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Noto Serif Tamil'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        earth: {
          50: "#fdf8f0",
          100: "#f9ead5",
          200: "#f1d0a0",
          300: "#e6b068",
          400: "#d9903a",
          500: "#c97520",
          600: "#a85c18",
          700: "#854516",
          800: "#623418",
          900: "#422418",
        },
        leaf: {
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        chili: {
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
