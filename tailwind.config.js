const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('mobile-only', "@media screen and (max-width: theme('screens.sm'))");
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
