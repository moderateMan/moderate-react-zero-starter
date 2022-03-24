const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { getStyleLoaders } = require("./utils");
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const isEnvDevelopment = process.env.NODE_ENV === "development";

// style files regexes
const cssRegex = /\.(css|less)$/;
const cssModuleRegex = /\.module\.(css|less)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// flags
// Source maps are resource heavy and can cause out of memory issue for large source files.
const isSourceMap = !isEnvDevelopment
  ? process.env.GENERATE_SOURCEMAP !== "false"
  : false;

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: require.resolve("babel-loader"),
        },
        exclude: [/node_modules/],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isSourceMap,
        }),
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isSourceMap,
          modules: {
            mode: "local",
            getLocalIdent: getCSSModuleLocalIdent,
          },
        }),
        sideEffects: true,
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isSourceMap,
            modules: {
              mode: "icss",
            },
          },
          "sass-loader"
        ),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isSourceMap,
            modules: {
              mode: "local",
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          "sass-loader"
        ),
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "tpl/index.html",
    }),
  ],
};
