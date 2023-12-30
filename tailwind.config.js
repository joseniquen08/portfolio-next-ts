/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        poppins: "Poppins, 'sans-serif'",
      },
      height: {
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
      },
      colors: {
        'dark-blue': {
          50: '#00406c',
          100: '#003a61',
          200: '#003356',
          300: '#002e4e',
          400: '#002945',
          500: '#00253e',
          600: '#002137',
          700: '#001a2c',
          800: '#001523',
          900: '#00111c',
        },
        'light-blue': {
          50: '#a9d6e5',
          100: '#89c2d9',
          200: '#61a5c2',
          300: '#468faf',
          400: '#2c7da0',
          500: '#2a6f97',
          600: '#014f86',
          700: '#01497c',
          800: '#013a63',
          900: '#012a4a',
        },
        custom: {
          ligth: {
            text: '#080420',
            bg: '#fbfbfe',
            primary: '#5347bd',
            secondary: '#877cee',
            accent: '#e75087',
          },
          dark: {
            text: '#e3dffb',
            bg: '#010104',
            primary: '#4e42b8',
            secondary: '#1c1183',
            accent: '#af184f',
          }
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
