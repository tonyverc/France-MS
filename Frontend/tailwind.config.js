/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ],
  daisyui: {
    themes: ["entreprise","dark"], // ou ton thème custom
  },
}
