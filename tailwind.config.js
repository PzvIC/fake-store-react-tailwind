export default {
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      screens:{
        '3xl': '2400px',
        '4xl': '3500px'
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}
