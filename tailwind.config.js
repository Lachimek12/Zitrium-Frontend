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
      gray: {
        300: "#f8f9fa",
        400: "#adb5bd",
      },
    },
  },
};
export const plugins = [];
