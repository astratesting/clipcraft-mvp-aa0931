import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080914',
        electric: '#8b5cf6',
        coral: '#fb7185',
        mint: '#34d399'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(139,92,246,0.35)'
      }
    }
  },
  plugins: [forms]
};

export default config;
