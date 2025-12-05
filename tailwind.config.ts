import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-primary',
    'bg-primary-light',
    'bg-primary-dark',
    'bg-accent',
    'bg-accent-light',
    'bg-accent-dark',
    'text-primary',
    'text-primary-light',
    'text-primary-dark',
    'text-accent',
    'text-accent-light',
    'text-accent-dark',
    'border-primary',
    'border-accent',
    'ring-primary',
    'ring-accent',
    'hover:bg-primary-dark',
    'hover:bg-accent',
    'hover:text-accent',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B387A',
          light: '#2647A0',
          dark: '#142960'
        },
        accent: {
          DEFAULT: '#F49E00',
          light: '#FFB52E',
          dark: '#CC8400'
        }
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        scroll: 'scroll 25s linear infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
