/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C8A96A',
        black: '#0B0B0B',
        white: '#FFFFFF',
        softgray: '#F5F5F5',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}

