/** @type {import('tailwindcss').Config} */
export const content = ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        500: "#06c4f9",
        600: "#059dc7",
      },
      secondary: {
        500: "#06b0f9",
        600: "#058dc7",
      },
      background: {
        700: "#434956",
        800: "#2c313a",
      },
      faint: {
        300: "#f8f9fa",
        400: "#adb5bd",
        500: "#6b7280",
      },
      error: {
        500: "#ef4444",
      },
      highlight: {
        400: "#38bdf8",
      },
    },
    dropShadow: {
      "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
      "4xl": ["0 35px 35px rgba(0, 0, 0, 0.25)", "0 45px 65px rgba(0, 0, 0, 0.15)"],
    },
  },
};
export const plugins = [];
