/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3f51b5",
          light: "#757de8",
          dark: "#002984",
        },
        secondary: {
          DEFAULT: "#6c757d",
          light: "#9fa8da",
          dark: "#343a40",
        },
        background: {
          DEFAULT: "#f8f9fa",
          dark: "#e9ecef",
        },
        text: {
          primary: "#333333",
          secondary: "#666666",
        },
      },
    },
  },
  plugins: [],
  important: true,
};
