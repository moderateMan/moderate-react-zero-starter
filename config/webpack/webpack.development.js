const path = require('path')
const proxyConfig = require('../proxy')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    proxy: proxyConfig
  },
  optimization: {
    minimize: false
  }
}
