/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../pages/api/auth/*.{js,ts,jsx,tsx}",
    "../hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        defaultnavheight: '168px',
        navheight: "82px",
      },
      colors: {
        primary: "#222222",
        secondary: "#FF385C",
        tertiary: "#F7F7F7",
      },
      margin: {
        navheight: "82px"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};