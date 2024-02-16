/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        dancer1: "url('../src/assets/dancer1.png')",
        dancer2: "url('../src/assets/dancer2.png')",
      }
    },
  },
  plugins: [],
}

