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
        'air-black': "url('./assets/air-black.png')",
        'bg': "url('./assets/bg.jpg')",
        'air-icon': "url('./assets/air2.png')",
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-filters'),
    require('@kamona/tailwindcss-perspective'),
  ],
}
