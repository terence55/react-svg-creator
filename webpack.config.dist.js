var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'lib/index.js',
    publicPath: '',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: 'production' }
    })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  externals: ['react', 'react-dom', 'prop-types'],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
};
