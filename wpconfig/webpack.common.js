const paths = require("./paths")
const webpack = require("webpack")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const WebpackBar = require("webpackbar")

module.exports = {
  // Entry points for your application will create bundles named the same way
  entry: {
    app: [paths.src + "/app.js"],
  },

  output: {
    path: paths.build,
    publicPath: "/",
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    library: "craft3",
    clean: true,
  },

  resolve: {
    fallback: { "fs": false },
    modules: [ "node_modules" ]
  },

  plugins: [
    new WebpackBar({ fancy: true, profile: true }),

    // Provide jQuery in a custom plugin
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),

    // Generates a manifest.json file for use in Craft CMS with Twigpack
    new WebpackManifestPlugin(),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // Create a separate jQuery chunk
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: [
            {
              globalName: "$",
              moduleLocalName: "jquery",
              override: true,
            },
            {
              globalName: "jQuery",
              moduleLocalName: "jquery",
              override: true,
            },
          ]
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          "svg-url-loader",
          "svg-transform-loader"
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          { loader: "postcss-loader" },
          { loader: "svg-transform-loader/encode-query" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
            }
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/inline",
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline"
      },
    ],
  },
}
