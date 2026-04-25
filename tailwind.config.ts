import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0b',
        surface: '#111214',
        accent: '#7c5cff'
      }
    }
  },
  plugins: []
};

export default config;
