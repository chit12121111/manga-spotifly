/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#000000',
          dark: '#121212',
          gray: '#282828',
          lightGray: '#b3b3b3',
          green: '#1DB954',
          greenHover: '#1ed760',
        },
        manga: {
          bg: '#0d0d0d',
          surface: '#1a1a1a',
          card: '#242424',
          muted: '#a0a0a0',
          accent: '#e63946',
          accentHover: '#f0505c',
        },
        creators: {
          bg: '#0f1419',
          header: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      animationFillMode: {
        forwards: 'forwards',
      },
    },
  },
  plugins: [],
}
