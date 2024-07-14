/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hu" : "url('./assets/hu.png')",
        "en" : "url('./assets/en.png')",
      },
    },
  },
  plugins: [],
}

