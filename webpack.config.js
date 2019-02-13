'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: "./src/App.js",
  output: {
    filename: "../app.min.js",
    library: "App"
  },
  
  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == "eval",

  /*devServer: {
    host: 'localhost',
    port: 8000
  },*/

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],

  optimization: {
    minimize: false,
    minimizer: [
      new UglifyJsPlugin({uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true, 
          unsafe: true
        }  
      }})
    ]  
  },

  /*resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    moduleDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },*/

  mode: process.env.NODE_ENV || 'development',
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};