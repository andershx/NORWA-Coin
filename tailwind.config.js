/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',       /* black base */
        panel: '#0f1520',    /* near-black panels */
        text: '#f5f7fa',
        muted: '#a9b4c8',
        red1: '#ff6b6b',
        red2: '#ff3b3b',
        red3: '#ff1a75'
      },
    },
  },
  plugins: [],
};
