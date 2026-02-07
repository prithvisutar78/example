/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1e3a5f",
          teal: "#0d9488",
          amber: "#f59e0b",
          emerald: "#10b981"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 23, 42, 0.08)",
        subtle: "0 1px 2px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
