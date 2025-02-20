/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
    'primary': '#EEC4BE',
    'secondary': '#72D772',
    'thirdcolor': '#B3F3B3',
    'fourthcolor': '#FCF7DD',
    'fifthcolor': '#D62E2E'
  },
  fontFamily: {
        dancingScript: ['Dancing Script', 'cursive'], // Added Dancing Script font
      },
    },
  },
  plugins: [],
}