/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        rose: {
          950: '#5b0d2e',
          900: '#7f1d4d',
          800: '#9d2762',
          700: '#c2185b',
          600: '#e11d6b',
          500: '#ec4899',
          400: '#f472b6',
          300: '#f9a8d4',
          200: '#fbcfe8',
          100: '#fce7f3',
          50: '#fff1f7',
        },
        cream: {
          50: '#fff9f5',
          100: '#fff3ec',
          200: '#ffe6d6',
        },
        gold: {
          400: '#e0b066',
          500: '#c9962e',
          600: '#a87a1f',
        },
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-110vh) scale(1.2)', opacity: '0' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(225,29,107,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(225,29,107,0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(20px,-30px) rotate(180deg)' },
          '100%': { transform: 'translate(0,0) rotate(360deg)' },
        },
        openFlap: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-60%)', opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        floatUp: 'floatUp 4s linear forwards',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        scaleIn: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        floatY: 'floatY 4s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        openFlap: 'openFlap 0.7s ease-in forwards',
        slideOut: 'slideOut 0.9s ease-out forwards',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        heartBeat: 'heartBeat 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
