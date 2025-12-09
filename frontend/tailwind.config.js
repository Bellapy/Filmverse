/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'film-black': '#0B0F14',
        'film-gray': '#13171F',
        'film-red': '#E50914',
        'film-red-hover': '#B00710',
        'film-white': '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}