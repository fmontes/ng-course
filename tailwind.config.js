/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inconsolata', 'sans-serif'],
      'display': ['Archivo', 'sans-serif'],
    },
    extend: {
      colors: {
        red: {
          '100': '#fee6e5',
          '200': '#fccfd0',
          '300': '#f9a8a9',
          '400': '#f4787c',
          '500': '#eb4852',
          '600': '#d62639',
          '700': '#b61a2f',
          '800': '#98192e',
          '900': '#82192d',
        }
      }
    },
  },
  plugins: [],
}

