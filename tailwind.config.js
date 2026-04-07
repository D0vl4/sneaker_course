/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["'Bricolage Grotesque'", "sans-serif"],
      },
      colors: {
        premium: {
          900: '#0c001a',
          800: '#1a0033',
          700: '#2d004d',
          accent: '#9333ea',
        }
      }
    },
  },
  plugins: [],
}
