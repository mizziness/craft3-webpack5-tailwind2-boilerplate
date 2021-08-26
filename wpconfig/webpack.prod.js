const common = require("./webpack.common.js")
const { merge } = require("webpack-merge")

const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const TerserPlugin = require("terser-webpack-plugin")

var singleBundle = merge(common, {
  mode: "production",
  devtool: "source-map", // Change to false to disable
  name: "bundle",
  target: "web",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    chunkLoading: "jsonp",
    environment: { module: false }
  },
  resolve: {
    modules: [ "node_modules" ]
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"]
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: { esmodules: true }, //For ES6 supporting browsers
                useBuiltIns: false
              }],
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-transform-runtime", { "corejs": 3 }],
              ["@babel/plugin-syntax-dynamic-import"]
            ],
          },
        }
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
          MiniCssExtractPlugin.loader,
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
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
      }
    },
    runtimeChunk: {
      name: "chunk-vendors",
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  performance: {
    hints: false,
  }
});

// Use a common object between the bundles so we used the same
// generated CSS for both instead of making it twice.
let MANIFEST_SEED = {}

var legacyBundle = merge(common, {
  mode: "production",
  devtool: "source-map", // Change to false to disable
  name: "legacy-bundle",
  target: "web",
  output: {
    filename: "js/[name].[chunkhash].es5.js",
    chunkFilename: "js/[name].[chunkhash].es5.js",
    chunkLoading: "jsonp",
    clean: false,
    environment: { module: false }
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"]
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                  targets: { browsers: ["safari >= 7"] },
                  bugfixes: true,
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-transform-runtime", { "corejs": 3 }],
              ["@babel/plugin-syntax-dynamic-import"]
            ],
          },
        }
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true
            }
          },
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
  resolve: {
    modules: [ "node_modules" ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
    }),
    new WebpackManifestPlugin({
      fileName: "manifest-legacy.json",
      seed: MANIFEST_SEED,
    }),
  ],
  optimization: {
    removeEmptyChunks: true,
    providedExports: true,
    splitChunks: {
      chunks: "initial",
      hidePathInfo: true,
      cacheGroups: {
        jquery: {
          name: "chunk-jquery",
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          priority: 10,
          filename: "js/[name].[chunkhash].es5.js"
        },
        vendors: {
          name: "chunk-vendors",
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "js/[name].[chunkhash].es5.js"
        },
      }
    },
    usedExports: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

var modernBundle = merge(common, {
  mode: "production",
  devtool: "source-map", // Change to false to disable
  name: "modern-bundle",
  target: "web",
  output: {
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    chunkLoading: "jsonp",
    clean: false,
    environment: { module: false }
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"]
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: { esmodules: true }, //For ES6 supporting browsers
                useBuiltIns: false
              }],
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-transform-runtime", { "corejs": 3 }],
              ["@babel/plugin-syntax-dynamic-import"]
            ],
          },
        }
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true
            }
          },
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
  resolve: {
    modules: [ "node_modules" ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css"
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      // seed: MANIFEST_SEED,
      filter: ({name, path}) => !name.match(/es5/gi) || !path.match(/es5/gi),
    }),
  ],
  optimization: {
    removeEmptyChunks: true,
    providedExports: true,
    splitChunks: {
      chunks: "initial",
      hidePathInfo: true,
      cacheGroups: {
        jquery: {
          name: "chunk-jquery",
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          priority: 10,
          filename: "js/[name].[chunkhash].js"
        },
        vendors: {
          name: "chunk-vendors",
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "js/[name].[chunkhash].js"
        },
      }
    },
    usedExports: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

// module.exports = [ singleBundle ];
module.exports = [ legacyBundle, modernBundle, ];

