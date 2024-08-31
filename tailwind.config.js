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
      background2: {
        800: "#21292e",
        900: "#0e161b",
      },
      primary2: {
        900: "#162022",
        800: "#293334",
      },
      secondary2: {
        500: "#232e30",
        400: "#314048",
      },
      border: {
        700: "#69797d",
        600: "#475657",
        500: "#596262",
      },
    },
    boxShadow: {
      "3xl": "0 0 14px 7px rgba(0, 0, 0, 1)",
      "3xl-hover": "0 0 14px 7px rgba(86, 102, 111, 1)",
    },
    fontFamily: {
      fantasy: ["MainFont", "sans-serif"],
    },
  },
};
export const plugins = [];
