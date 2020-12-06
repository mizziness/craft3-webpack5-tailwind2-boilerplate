## Craft CMS 3 Boilerplate
**(with Webpack 5, Tailwind 2, PostCSS 8, and HMR, and other goodies)**

A real-world boilerplate for Craft CMS 3 projects that leverages Wepback 5, Tailwind 2, PostCSS 8, and Twigpack. Also included is a hot-reload dev environment. I created this as a starting point for Craft CMS 3 / Webpack 5 projects.

### What's Included

* [Craft CMS 3](https://github.com/craftcms/cms) - My CMS of choice, and the app which will consume assets from Webpack.
* [Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/) - Bundling, optimizing, and serving your assets
* [Twigpack](https://github.com/nystudio107/craft-twigpack) - The bridge between Craft CMS and Webpack
* [TailwindCSS 2](https://tailwindcss.com) - Awesome CSS framework that makes dev speedy
* [SASS](https://sass-lang.com/) - SASS/SCSS Support
* [PostCSS](https://postcss.org/) - Post-processing CSS Files

### Other included tools/plugins
#### Webpack
* [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
* [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for webpack
* [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for webpack
* [`webpack-merge`](https://github.com/survivejs/webpack-merge) - Simplify development/production configuration
* [`cross-env`](https://github.com/kentcdodds/cross-env) - Cross platform configuration

#### Transpiling
* [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript
* [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - Use properties directly on a class (an example Babel config)
* [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel
* [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and webpack

#### Loaders, Sass, Plugins
* [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) - Load SCSS and compile to CSS
* [`sass`](https://github.com/sass/dart-sass) - Dart Sass
* [`fibers`](https://www.npmjs.com/package/fibers) - Increase Dart Sass performance (see [note here](https://github.com/sass/dart-sass/blob/master/README.md#javascript-api)
* [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - Process CSS with PostCSS
* [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - Sensible defaults for PostCSS
* [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolve CSS imports
* [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM
* [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders
* [`webpack-manifest-plugin`](https://www.npmjs.com/package/webpack-manifest-plugin) - Create Manifest.json file with chunks
* [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template
* [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
* [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) - Optimize and minimize CSS assets

### Get Started

First, finish up installing Craft CMS locally for your development environment:

```
$ composer install
$ ./craft setup
```

Then install our other packages and run the HMR development server:

```
$ yarn install
$ yarn dev
```
(I use `yarn` for my project, but you don't need to - use the tool of your choice.)

Webpack assets are set up to serve from `localhost:8080` by default. 

You can include your chunked/hashed assets in Craft CMS templates by using [Twigpack](https://nystudio107.com/docs/twigpack/)'s features:

```
{{ craft.twigpack.includeCssModule("app.css", true) }}
{{ craft.twigpack.includeJsModule("app.js", true, {"type": "module"}) }}
{{ craft.twigpack.includeJsModule("chunk-vendors.js", true) }}
```
### Make it Yours

This project comes pre-configured out of the box to work with Craft CMS templates, but there are plenty of ways you can customize the way this works to suit your own needs.  It tries to make no assumptions about your toolkit, other than the minimum required configuration to work with the tools included.

- Tailwind has been set up with with a default configuration, and I highly suggest modifying it for your project. (You can overwrite it with an existing `tailwind.config.js` file, if you have one, to import all your custom styling quickly.)
- devServer options can be changed and extended as needed - for example, by default auto `open` for the served url is turned off, but if you're using a custom generated template, then you might want it on, instead.
- Go to town! Fork it and have at it :)

### Scripts

As you can see in the `package.json` file, there are 3 included scripts for convenience:

* `yarn dev` - Runs the HMR development server
* `yarn build` - Creates a production-ready build for deployment (asset output is in `web/dist`)
* `yarn clean` - A quick way to clear Craft CMS caches while you code

### Inspired By

And used as a starting point: https://github.com/taniarascia/webpack-boilerplate

### License

This project is open source and available under the [MIT License](https://github.com/taniarascia/webpack-boilerplate/blob/master/LICENSE).
