const paths = require("./paths")
const webpack = require("webpack")
const common = require("./webpack.common.js")
const { merge } = require("webpack-merge")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: "development",
  target: "web",
  devtool: "source-map",
  stats: "normal",
  cache: false,
  infrastructureLogging: {
    colors: true,
    level: "verbose",
  },
  output: {
    publicPath: "https://localhost:8080/",
  },

  // Spin up a server for quick development
  devServer: {
    https: true,
    historyApiFallback: false,
    watchFiles: [paths.src, paths.build, paths.templates],
    hot: 'only',
    port: 8080,
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    // Add your local domains to allow access
    allowedHosts: [
      "localhost",
      ".local",
      "craft.local"
    ],
    // Denote the templates and src folders as static content to watch
    static: [
      {
        directory: paths.templates,
        serveIndex: false,
        watch: true,
      },
      {
        directory: paths.src,
        serveIndex: false,
        watch: true,
      },
      {
        directory: paths.webpack,
        serveIndex: false,
        watch: true,
      }
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"}
        ],
      }
    ]
  },

  plugins: [
    // Yummy Hot Reloading in development only
    new webpack.HotModuleReplacementPlugin(),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    // Uncomment this if you want to generate an html template file
    // Use this if you really want http://localhost:8080/ to serve *something*, and
    // uncomment the template line to include your own template that index.html uses
    // new HtmlWebpackPlugin({
      // title: "Webpack 5 Boilerplate",
      // template: paths.src + "/template.html", // your template file
      // filename: "index.html", // output file
    // }),

    // Spits out the manifest json file so that Twigpack can get to it
    new WebpackManifestPlugin({
      writeToFileEmit: true
    }),

    // Bundle Analyzer will spit out a stats.json file but not run in analyzer mode
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true
    }),
  ],

  // Creates our chunk-vendors file
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
        common: {
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true
        }
      }
    },
  }
})
