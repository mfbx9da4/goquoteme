const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './app.js',
    'front.style': './styles/main.less',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      // Optionally extract less files
      // or any other compile-to-css language
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"), // eslint-disable-line
      },
      //{
      //   test: /\.css/,
      //   loader: 'style-loader!css-loader',
      // }, {
      //   test: /\.less$/,
      //   loader: 'css-loader!less-loader',
      // },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin('./[name].css'),
  ],
};
