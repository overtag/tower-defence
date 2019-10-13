const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    app: "./src/App.js"
  },

  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  devServer: {
    overlay: true
  }
};
