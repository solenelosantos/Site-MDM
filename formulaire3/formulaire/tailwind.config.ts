import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", 
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed", 
        "primary-foreground": "#ffffff",
        background: "#f9fafb",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

