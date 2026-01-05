import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#dc2626",
        background: "#f8fafc",
        text: "#1e293b"
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};