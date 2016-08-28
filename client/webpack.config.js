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
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          retainLines: true,
          cacheDirectory: true,
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
  devtool: 'source-map',
  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin('./[name].css'),
    // new webpack.SourceMapDevToolPlugin({
    //   // Match assets just like for loaders.
    //   test: /\.js$/,
    //
    //   // `exclude` matches file names, not package names!
    //   exclude: '/node_modules/',
    //
    //   // If filename is set, output to this file.
    //   // See `sourceMapFileName`.
    //   filename: '[file].map',
    //
    //   // This line is appended to the original asset processed. For
    //   // instance '[url]' would get replaced with an url to the
    //   // sourcemap.
    //   append: false,
    //
    //   module: true, // If false, separate sourcemaps aren't generated.
    //
    //   // Use simpler line to line mappings for the matched modules.
    //   // lineToLine: bool | {test, include, exclude}
    // }),
  ],
};
