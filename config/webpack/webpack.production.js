const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve("dist"),
    filename: "static/js/[name].[contenthash:8].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash:8].min.css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
};
