/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-600": "#2E2532"
      },
      backgroundColor: {
        "transparent-1": "#ffffff23",
        // "transparent-2": "#000000d2",
        "primary-600": "#2E2532"
      }
    }
  },
  plugins: []
}

