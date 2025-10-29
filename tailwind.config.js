/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3182CE",
          dark: "#2C5282",
          light: "#4299E1",
        },
        charcoal: {
          DEFAULT: "#2D3748",
          light: "#4A5568",
        },
        arctic: "#3182CE",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
};
