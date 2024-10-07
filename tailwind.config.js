/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      smMobile: "300px",
      mobile: "480px",
      lgMobile: "580px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
