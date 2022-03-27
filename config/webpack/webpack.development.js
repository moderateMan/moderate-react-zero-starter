const path = require('path')
const proxyConfig = require('../proxy')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    proxy: proxyConfig,
    port: process.env.DEV_SERVER_PORT,
    open: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:8080`]
      },
      // 是否每次都清空控制台
      clearConsole: true
    })
  ]
}
