/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        brown: {
          50: '#F8F4F1',
          100: '#E8DED5',
          200: '#D8C8B8',
          300: '#C8B2A1',
          400: '#B89C89',
          500: '#A68672',
          600: '#8A6F5E',
          700: '#6B4E3D', // Primary brown
          800: '#5A4233',
          900: '#493629',
        },
      },
    },
  },
  plugins: [],
};