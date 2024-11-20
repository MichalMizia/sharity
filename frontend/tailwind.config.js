/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "bg-bg": "#F6FDFA",
        "text-700": "#495159",
        "bg-100": "#a1e8cc",
        "bg-200": "#C5DECD",
        almond: "#E5D4C0",
        "almond-500": "#FAC9B8",
        "almond-600": "#CDA497",
        "almond-650": "#B69286",
        "almond-700": "#9F8075",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
