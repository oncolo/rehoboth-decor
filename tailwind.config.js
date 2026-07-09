/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        cream: "#FAF9F6",
        charcoal: "#121212",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        ethiopic: ["Noto Sans Ethiopic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
