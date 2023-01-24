/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'deep': {  DEFAULT: '#050505',  50: '#787E77',  100: '#5F645E',  200: '#383F36',  300: '#30362F',  400: '#292E28',  500: '#222621',  600: '#1B1E1A',  700: '#131613',  800: '#0C0E0C',  900: '#050505'},
      }
    },
  },
  plugins: [],
}
