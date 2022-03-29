const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./paths')

// var
const isEnvDevelopment = process.env.NODE_ENV === 'development'

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    !isEnvDevelopment && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `paths.publicUrlOrPath` can be a relative path
      options: paths.publicUrlOrPath.startsWith('.')
        ? { publicPath: '../../' }
        : {}
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    }
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: cssOptions.sourceMap,
          root: paths.appSrc
        }
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: cssOptions.sourceMap
        }
      }
    )
  }
  return loaders
}

module.exports = {
  getStyleLoaders: getStyleLoaders
}
