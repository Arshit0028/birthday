/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dreamy fairytale palette
        blush: {
          50: '#fff5f9',
          100: '#ffe9f2',
          200: '#ffd1e3',
          300: '#ffb3d1',
          400: '#ff8fbb',
          500: '#f76ca5',
        },
        lavender: {
          100: '#f2ecff',
          200: '#e3d6ff',
          300: '#cbb4ff',
          400: '#b090ff',
          500: '#9a70f5',
        },
        champagne: {
          100: '#fdf6e6',
          200: '#f6e7c1',
          300: '#efd79b',
          400: '#e6c672',
          500: '#d4af5a',
        },
        pearl: '#fffdfb',
        midnight: '#1a1230',
        plum: '#2a1a45',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dream-gradient':
          'linear-gradient(135deg, #fff5f9 0%, #f2ecff 35%, #fdf6e6 70%, #ffe9f2 100%)',
        'dream-gradient-dark':
          'linear-gradient(160deg, #1a1230 0%, #2a1a45 45%, #3a2159 75%, #241640 100%)',
        'glow-radial':
          'radial-gradient(circle at 50% 30%, rgba(255,179,209,0.35), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,179,209,0.45)',
        'glow-lavender': '0 0 50px rgba(176,144,255,0.4)',
        'glow-gold': '0 0 45px rgba(230,198,114,0.5)',
        glass: '0 8px 32px rgba(31,23,55,0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(6deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px) rotate(-3deg)' },
          '40%': { transform: 'translateX(8px) rotate(3deg)' },
          '60%': { transform: 'translateX(-6px) rotate(-2deg)' },
          '80%': { transform: 'translateX(6px) rotate(2deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
    },
  },
  plugins: [],
};
