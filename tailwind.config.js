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
        poppins: ['var(--font-poppins)'],
      },
      height: {
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
