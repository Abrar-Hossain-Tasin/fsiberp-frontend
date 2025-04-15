/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "linear-gradient(90deg, rgba(42,40,124,1) 0%, rgba(0,118,58,1) 100%, rgba(255,255,255,1) 100%)",
        "custom-gradient": "linear-gradient(to right, #183C1C, #16134A)",
        "custom-gradient-hover": "linear-gradient(to left, #183C1C, #16134A)",
      },
      colors: {
        "custom-border-color": "#686D76",
      },
      fontFamily: {
        Noto: ["Noto Sans Bengali"],
        Tiro: ["Tiro Bengala"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".border-custom-color": {
          borderColor: "#686D76",
        },
      });
    },
  ],
};
