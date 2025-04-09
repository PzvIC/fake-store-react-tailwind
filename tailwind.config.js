// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // o según tu estructura
  ],
  safelist: [
    "h-64", "h-72", "h-80", "h-96",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
