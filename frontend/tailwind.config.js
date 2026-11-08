/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF7A00', // Primary Devotional Saffron
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#E65100', // Deep Saffron
        },
        gold: {
          50: '#fdfbf2',
          100: '#faf5de',
          200: '#f4e9bc',
          300: '#ebd792',
          400: '#e0c064',
          500: '#D4AF37', // Warm Gold
          600: '#C59B27',
          700: '#9b7318',
          800: '#7e5a19',
          900: '#6a4a19',
        },
        vermilion: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#D32F2F', // Vermilion Red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#C62828', // Deep Crimson
        },
        cream: {
          50: '#FFFDF9',
          100: '#FDFBF7', // Main background
          200: '#FAF5EC',
          300: '#F4ECE0',
          400: '#E9DDD0',
        },
        devotional: {
          brown: '#3E2723', // Deep Brown for headings & high readability
          dark: '#271714',
          muted: '#6D4C41',
        }
      },
      fontFamily: {
        hindi: ['Hind', 'Noto Sans Devanagari', 'sans-serif'],
        display: ['Rozha One', 'Hind', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(212, 175, 55, 0.15)',
        'saffron': '0 10px 25px -3px rgba(255, 122, 0, 0.25)',
        'elevation': '0 10px 30px -5px rgba(62, 39, 35, 0.08), 0 4px 12px -2px rgba(62, 39, 35, 0.04)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

