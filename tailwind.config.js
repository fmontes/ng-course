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
          50: "#feeced",
          100: "#fde7e9",
          200: "#fdd3d6",
          300: "#faa8ae",
          400: "#f35862",
          500: "#D62639",
          600: "#c2242e",
          700: "#931a22",
          800: "#6a1519",
          900: "#4e1317",
          950: "#2c0709",
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

          "&:after": {
            content: "''",
            position: "fixed",
            top: '-50%',
            left: 0,
            width: "100%",
            height: "100%",
            background: `${theme("colors.black.950")} radial-gradient(circle, ${theme("colors.red.500")} 0%, ${theme("colors.black.950")} 50%) no-repeat`,
            zIndex: -1,
            opacity: 0.35,
          }
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
        label: {
          color: theme("colors.gray.100"),
        },
        "button, [type='button'], [type='reset'], [type='submit'], .btn": {
          appearance: "none",
          color: theme("colors.white"),
          backgroundColor: theme("colors.red.500"),
          display: "inline-flex",
          alignItems: "center",
          height: "2.5rem",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          transirionProperty: "background-color",
          transitionDuration: "150ms",
          transitionTimingFunction: "ease-in-out",
          "&:hover": {
            backgroundColor: theme("colors.red.400"),
          },
        },
        "button.link": {
          all: "inherit",
          display: 'inline',
          cursor: 'pointer',
        },
        "input[type='text'], input[type='password'], input[type='email'], input[type='url']": {
          appearance: "none",
          color: theme("colors.white"),
          backgroundColor: theme("colors.black.950"),
          border: "1px solid",
          borderColor: theme("colors.gray.300"),
          paddingLeft: theme("spacing.3"),
          paddingRight: theme("spacing.3"),
          height: "2.5rem",
          "&:hover": {
            borderColor: theme("colors.gray.300"),
          },
          "&:focus": {
            backgroundColor: theme("colors.red.950"),
            borderColor: theme("colors.white"),
          },
        },
        ".form-group": {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: theme("spacing.5"),
          marginBottom: theme("spacing.5"),
        },
      });
    }),
  ],
};
