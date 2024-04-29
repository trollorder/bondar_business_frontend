/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#FFF7F1',
        'secondary': '#E2B8EA',
        'brand-yellow': '#FFD200',
        'brand-green': '#00C85D',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        title: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
