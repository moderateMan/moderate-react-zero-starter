const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getStyleLoaders } = require('./utils')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const ESLintPlugin = require('eslint-webpack-plugin')
const { resolveApp } = require('./utils')

// var
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true'
const disableESLintPlugin = true

// style files regexes
const cssRegex = /\.(css|less)$/
const cssModuleRegex = /\.module\.(css|less)$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

// flags
// Source maps are resource heavy and can cause out of memory issue for large source files.
const isSourceMap = !isEnvDevelopment
  ? process.env.GENERATE_SOURCEMAP !== 'false'
  : false

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@COMMON': path.resolve('src/common')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: require.resolve('babel-loader')
        },
        exclude: [/node_modules/]
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
    new HtmlWebpackPlugin({
      template: 'tpl/index.html'
    }),
    disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
        failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
        context: resolveApp('src'),
        cache: true,
        cacheLocation: path.resolve(
          resolveApp('node_modules'),
          '.cache/.eslintcache'
        )
      })
  ].filter(Boolean)
}
