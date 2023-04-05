/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'air': "url('./assets/air.jpg')",
        'air-white': "url('./assets/air-white.png')",
        'bg': "url('./assets/bg.jpg')",
        'air-icon': "url('./assets/air2.png')",
      }
    },
  },
  plugins: [
    require('tailwindcss-filters'),
    require('@kamona/tailwindcss-perspective'),
  ],
}
