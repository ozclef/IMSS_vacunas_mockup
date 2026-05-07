/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'imss-green': '#006455',
        'imss-light-green': '#2AA89A',
        'imss-wine': '#611232',
        'imss-dark-wine': '#3A0B1F',
        'imss-cream': '#B38E5D',
      }
    },
  },
  plugins: [],
}

