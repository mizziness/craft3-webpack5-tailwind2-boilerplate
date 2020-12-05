// tailwind.config.js
// See more information about this file at https://tailwindcss.com/docs/installation#create-your-configuration-file

module.exports = {
  prefix: 'tw-',
  important: true,
  purge: {
    mode: 'all',
    enabled: true, // Turn off to not purge newly-added classes
    content: [
      './src/**/*.js',
      './templates/**/*.twig',
      './templates/**/*.html'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
