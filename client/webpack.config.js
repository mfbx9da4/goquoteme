const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './app.js',
  output: {path: __dirname, filename: 'bundle.js'},
  module: {
    devtool: 'eval-source-map',
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
  ],
};
