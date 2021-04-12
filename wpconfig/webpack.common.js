const paths = require('./paths')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const WebpackBar = require('webpackbar')
// const jQuery = require("jquery")

module.exports = {
  entry: {
    app: [paths.src + '/app.js'],
  },

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    library: 'new_library', // Name your library if you like
  },

  // externals: {
  //   jquery: 'jQuery'
  // }

  plugins: [
    // new WebpackBar({ fancy: true, profile: true }),

    // Clean up after ourselves
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [ paths.build ]
    }),

    // Generates a manifest.json file for use in Craft CMS with Twigpack
    new WebpackManifestPlugin(),

    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    // Uncomment this if you want to generate an html template file
    // Use this if you really want http://localhost:8080/ to serve *something*.
    //
    // new HtmlWebpackPlugin({
    //   title: 'Webpack 5 Boilerplate',
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
