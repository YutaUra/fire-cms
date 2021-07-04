module.exports = {
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@fire-cms/*/dist/*/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
