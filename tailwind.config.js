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
        124: '31rem',
        128: '32rem',
        132: '33rem',
        136: '34rem',
        140: '35rem',
        144: '36rem',
        148: '37rem',
        152: '38rem',
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
            text: '#151702',
            bg: '#fbfef1',
            primary: '#d4ff02',
            secondary: '#7eb4f1',
            accent: '#7f5ce0',
          },
          dark: {
            text: '#fbfde8',
            bg: '#0b0e01',
            primary: '#cff122',
            secondary: '#0e4481',
            accent: '#421fa3',
          }
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
