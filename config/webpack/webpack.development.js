const path = require("path");
const proxyConfig = require('../proxy')

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/bundle.js",
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
    compress: true,
    proxy:proxyConfig
  },
};
