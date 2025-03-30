/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          darkest: '#050914',
          dark: '#0A0E29',
          primary: '#1a1f3c',
          accent: '#6366f1',
          star: '#f0f0ff',
          nebula: '#9333ea',
        }
      },
    },
  },
  plugins: [],
}

