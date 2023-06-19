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
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          color: theme("colors.white"),
          backgroundColor: theme("colors.black"),
          fontSize: "1.125rem",

          "&:after": {
            content: "''",
            position: "fixed",
            top: '-50%',
            left: 0,
            width: "100%",
            height: "100%",
            background: `${theme("colors.black")} radial-gradient(circle, ${theme("colors.primary.500")} 0%, ${theme("colors.black")} 50%) no-repeat`,
            zIndex: -1,
            opacity: 0.35,
          }
        },
        h1: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.5xl"),
          fontWeight: theme("fontWeight.bold"),
          marginBottom: theme("spacing.4"),
        },
        h2: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.4xl"),
          fontWeight: theme("fontWeight.bold"),
          marginBottom: theme("spacing.4"),
        },
        h3: {
          fontFamily: theme("fontFamily.display"),
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.bold"),
          marginBottom: theme("spacing.4"),
        },
        label: {
          color: theme("colors.gray.100"),
          marginBottom: theme("spacing.1"),
        },
        "button, [type='button'], [type='reset'], [type='submit'], .btn": {
          appearance: "none",
          color: theme("colors.white"),
          backgroundColor: theme("colors.primary.500"),
          display: "inline-flex",
          alignItems: "center",
          height: "2.5rem",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          transirionProperty: "background-color",
          transitionDuration: "150ms",
          transitionTimingFunction: "ease-in-out",
          "&:hover": {
            backgroundColor: theme("colors.primary.400"),
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
          backgroundColor: theme("colors.black"),
          border: "1px solid",
          borderColor: theme("colors.gray.300"),
          paddingLeft: theme("spacing.3"),
          paddingRight: theme("spacing.3"),
          height: "2.5rem",
          "&:hover": {
            borderColor: theme("colors.gray.300"),
          },
          "&:focus": {
            backgroundColor: theme("colors.primary.950"),
            borderColor: theme("colors.white"),
          },
          "&::placeholder": {
            color: theme("colors.gray.800"),
          }
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
