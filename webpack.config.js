const path = require('path');

module.exports = {
  entry: './src/App.js',
  mode: 'development',
  output: {
    filename: '../app.min.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    overlay: true,
  },
};
