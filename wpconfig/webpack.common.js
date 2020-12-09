const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Uncomment to enable Webpackbar
// const WebpackBar = require('webpackbar');

module.exports = {
  entry: {
    app: [paths.src + '/app.js']
  },

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    // Clean up after ourselves
    new CleanWebpackPlugin(),

    // Generates a manifest.json file for use in Craft CMS with Twigpack
    new WebpackManifestPlugin(),

    // Uncomment to enable Webpackbar
    // new WebpackBar(),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    // Uncomment this if you want to generate an html template file
    // new HtmlWebpackPlugin({
    //   title: 'Webpack 5 Boilerplate',
    //   favicon: paths.src + '/images/favicon.png',
    //   template: paths.src + '/template.html', // template file
    //   filename: 'index.html', // output file
    // }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              url: false // Set to true to allow css-loader to resolve urls
            }
          },
          { loader: 'postcss-loader', options: {sourceMap: true} },
          { loader: 'sass-loader', options: {sourceMap: true} },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
    ],
  },
}
