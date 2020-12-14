const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  target: 'web',
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: [paths.src, paths.build, paths.templates],
    watchContentBase: true,
    open: false, // Set to true to auto-open the asset url
    compress: true, // Enable local gzip compression
    hot: true,
    port: 8080,
    host: 'localhost',
    writeToDisk: true, // Allow creation of new files
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },

  plugins: [
    // Yummy Hot Reloading in development only
    new webpack.HotModuleReplacementPlugin(),
  ],

  // Creates our chunk-vendors file
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
  }
})
