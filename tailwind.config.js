/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-600':'#2E2532'
      },
      backgroundColor: {
        'transparent-1': '#ffffff23',
        'primary-600':'#2E2532'
      },

    },
  },
  plugins: [],
}

