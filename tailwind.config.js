/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const colors = require('tailwindcss/colors')


// COLORS GENERATED WITH: https://tailwindshades.app/

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inconsolata", "sans-serif"],
      display: ["Archivo", "sans-serif"],
    },
    container: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1080px',
      },
    },
    extend: {
      colors: {
        red: {
          50: "#FDF4F5",
          100: "#FBE9EB",
          200: "#F5C9CE",
          300: "#EFA8B0",
          400: "#E26774",
          500: "#D62639",
          600: "#C12233",
          700: "#801722",
          800: "#60111A",
          900: "#400B11",
        },
        primary: colors.red,
        black: '#050605',
        gray: {
          50: "#FCFCFC",
          100: "#FAFAF9",
          200: "#F2F2F1",
          300: "#E9EAE9",
          400: "#D9DBD8",
          500: "#C9CBC7",
          600: "#B5B7B3",
          700: "#797A77",
          800: "#5A5B5A",
          900: "#3C3D3C",
        }
      },
    },
  },
  plugins: [],
};
