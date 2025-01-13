/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#64748B',
        accent: '#38BDF8'
      }
    },
  },
  plugins: [],
} 