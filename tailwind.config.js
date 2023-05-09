/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        one: "#B9EDDD",
        two: "#87CBB9",
        three: "#569DAA",
        four: "#577D86"
  
      }
    },
  },
  plugins: [require("daisyui")],
}
