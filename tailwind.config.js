/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'lightbox': '14%'
      },
      scale: {
        'custom': '3.00'
      }
    },
  },
  plugins: [],
}
