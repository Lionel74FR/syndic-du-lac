/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3a6577",
          light: "#4d7a8c",
          dark: "#284a5e",
        },
        secondary: {
          DEFAULT: "#1e846a",
          light: "#2f9c7d",
          dark: "#16604c",
        },
        accent: {
          DEFAULT: "#f5f5f5",
        },
      },
    },
  },
  plugins: [],
};