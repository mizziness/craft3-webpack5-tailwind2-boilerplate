const paths = require('./paths')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  target: 'web',
  devtool: 'source-map',

  // Spin up a server for quick development
  devServer: {
    https: false,
    historyApiFallback: true,
    contentBase: [paths.src, paths.build, paths.templates],
    watchContentBase: true,
    open: false,
    compress: false,
    hot: true,
    port: 8080,
    host: 'localhost',
    writeToDisk: true,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'normal',
  },

  plugins: [
    // Yummy Hot Reloading in development only
    new webpack.HotModuleReplacementPlugin(),
    new WatchExternalFilesPlugin({
      files: [ '../templates/**/*.*', '../src/**/*.*' ]
    }),
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
