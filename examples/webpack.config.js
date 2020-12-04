const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    open: true,
    inline: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.ProvidePlugin({
      three: 'THREE',
      THREE: 'three'
    })
  ]
};
