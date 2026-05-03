/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF8E7',
          200: '#FFE9A0',
          300: '#FFD85C',
          400: '#F5C842',
          500: '#D4A017',
          600: '#B8860B',
          700: '#8B6508',
          800: '#5C4205',
          900: '#2E2102',
        },
        obsidian: {
          100: '#2a2a2a',
          200: '#1e1e1e',
          300: '#141414',
          400: '#0d0d0d',
          500: '#080808',
          600: '#040404',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Cinzel', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease forwards',
        'slide-up': 'slideUp 1.2s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,160,23,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(212,160,23,0.7)' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #F5C842 30%, #B8860B 60%, #D4A017 100%)',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #0d0d0d 50%, #000000 100%)',
      }
    },
  },
  plugins: [],
}
