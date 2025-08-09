import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14',
        panel: '#0f1520',
        text: '#eaf0ff',
        muted: '#a8b3c7',
        grad1: '#7cf6ff',
        grad2: '#6b9dff',
        grad3: '#b36bff',
      },
    },
  },
  plugins: [],
}
export default config
