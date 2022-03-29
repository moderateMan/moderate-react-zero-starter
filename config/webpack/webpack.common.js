const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getStyleLoaders } = require('./utils')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const WebpackBar = require('webpackbar')
const webpack = require('webpack')
const { ESBuildMinifyPlugin, ESBuildPlugin } = require('esbuild-loader')
const { getClientEnvironment } = require('../env')
const paths = require('../utils/paths')

// style files regexes
const cssRegex = /\.(css|less)$/
const cssModuleRegex = /\.module\.(css|less)$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

// flags
const isSourceMap = process.env.GENERATE_SOURCEMAP === 'true'
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true'
const disableESLintPlugin = process.env.ESLINT_DISABLE === 'true'
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const shouldUseReactRefresh = process.env.shouldUseReactRefresh === 'true'

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
module.exports = {
  entry: './src/index.tsx',
  resolve: {
    alias: {
      '@': paths.appSrc,
      '@COMMON': paths.appCommon,
      '@STORE': paths.appStore
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   use: {
      //     loader: require.resolve('esbuild-loader'),
      //     options: {
      //       loader: 'jsx',
      //       target: 'es2015',
      //       jsxFactory: 'React.createElement',
      //       jsxFragment: 'React.Fragment'
      //     }
      //   },
      //   exclude: [/node_modules/]
      // },
      // {
      //   test: /\.(ts|tsx)$/,
      //   use: {
      //     loader: require.resolve('esbuild-loader'),
      //     options: {
      //       loader: 'jsx',
      //       target: 'es2015',
      //       jsxFactory: 'React.createElement',
      //       jsxFragment: 'React.Fragment'
      //     }
      //   },
      //   exclude: [/node_modules/]
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: require.resolve('babel-loader')
        },
        exclude: [/node_modules/]
      },
      isSourceMap && {
        enforce: 'pre',
        exclude: [/@babel(?:\/|\\{1,2})runtime/, /@antv/, /inversify/],
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve('source-map-loader')
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isSourceMap
        })
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isSourceMap,
          modules: {
            mode: 'local',
            getLocalIdent: getCSSModuleLocalIdent
          }
        }),
        sideEffects: true
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isSourceMap,
            modules: {
              mode: 'icss'
            }
          },
          'sass-loader'
        ),
        sideEffects: true
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isSourceMap,
            modules: {
              mode: 'local',
              getLocalIdent: getCSSModuleLocalIdent
            }
          },
          'sass-loader'
        )
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new ESBuildPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    isEnvDevelopment &&
      shouldUseReactRefresh &&
      new ReactRefreshWebpackPlugin({
        overlay: {
          entry: paths.webpackDevClientEntry,
          module: paths.reactRefreshOverlayEntry,
          sockIntegration: false
        }
      }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new WebpackBar(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml
        },
        !isEnvDevelopment
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),
    !disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: paths.eslintFormatter,
        eslintPath: paths.eslintPath,
        emitError: emitErrorsAsWarnings,
        failOnError: emitErrorsAsWarnings,
        context: paths.appSrc,
        cache: true,
        cacheLocation: paths.eslintPluginCache
      })
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        minifyWhitespace: true,
        css: true
      })
    ]
  }
}
