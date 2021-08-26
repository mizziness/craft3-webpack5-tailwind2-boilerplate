// tailwind.config.js
// See more information about this file at https://tailwindcss.com/docs/installation#create-your-configuration-file

module.exports = {
  prefix: 'tw-',
  important: true,
  mode: 'jit',
  purge: {
    mode: 'all',
    enabled: true,
    content: [
      './src/**/*.js',
      './templates/**/*.twig',
      './templates/**/*.html'
    ],
    options: {
      keyframes: true,
      fontFace: true,
    }
  },
  darkMode: 'media', // See https://tailwindcss.com/docs/dark-mode
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
