const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../web/dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../web'),

  templates: path.resolve(__dirname, '../templates'),

  storage: path.resolve(__dirname, '../storage/webpack'),

  webpack: path.resolve(__dirname)
}
