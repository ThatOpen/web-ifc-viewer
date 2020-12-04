const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    open: true,
    inline: true,
    hot: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'models'), to: 'models' }
      ]
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.ProvidePlugin({
      three: 'THREE',
      THREE: 'three'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ifc$/i,
        use: 'raw-loader'
      }
    ]
  }
};
