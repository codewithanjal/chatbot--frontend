/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        chat: {
          bg: '#0f111a',
          panel: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
          user: '#4f46e5',
          bot: '#14b8a6'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
