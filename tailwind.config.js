/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inconsolata", "sans-serif"],
      display: ["Archivo", "sans-serif"],
    },
    extend: {
      colors: {
        red: {
          50: "#fef2f2",
          100: "#fee6e5",
          200: "#fccfd0",
          300: "#f9a8a9",
          400: "#f4787c",
          500: "#eb4852",
          600: "#d62639",
          700: "#b61a2f",
          800: "#98192e",
          900: "#82192d",
          950: "#490813",
        },
        black: {
          50: "#f6f7f6",
          100: "#e2e6e1",
          200: "#c4cdc2",
          300: "#9fac9c",
          400: "#7a8a77",
          500: "#5f6f5d",
          600: "#4b5849",
          700: "#3e483d",
          800: "#343c33",
          900: "#2e342d",
          950: "#050605",
        },
        gray: {
          50: "#f8f8f8",
          100: "#f0f1ef",
          200: "#e4e5e3",
          300: "#c9cbc7",
          400: "#b4b7b2",
          500: "#9a9d96",
          600: "#81857d",
          700: "#6b6e67",
          800: "#5a5c58",
          900: "#4e504c",
          950: "#282926",
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          color: theme("colors.white"),
          backgroundColor: theme("colors.black.950"),
          fontSize: "1.125rem",
        },
        h1: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.5xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h2: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.4xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h3: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.bold"),
        },
      });
    }),
  ],
};
