import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom color for primary elements
        secondary: '#4B5563', // Custom color for secondary elements
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Custom font stack
      },
      spacing: {
        '128': '32rem',  // Custom spacing value
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow
      },
      gradientColorStops: {
        'primary': '#1D4ED8',
        'secondary': '#4B5563',
      },
    },
  },
  plugins: [
    // Add custom plugins if needed
  ],
};
export default config;
