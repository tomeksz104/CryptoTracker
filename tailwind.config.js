/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "dropdown-tippy":
          "-2px 1px 2px rgba(128,138,157,0.12),0px 8px 32px rgba(128,138,157,0.24)",
      },
      colors: {
        "neutral-150": "rgb(237,237,237)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
