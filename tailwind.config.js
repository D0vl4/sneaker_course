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
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.4s cubic-bezier(0.16,1,0.3,1)',
        'accordion-up': 'accordion-up 0.35s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
