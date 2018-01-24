const webpack = require("webpack")
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConf = require('./webpack.config.base')
const paths = require("./paths")

const PORT = 5080

module.exports = merge.smart(baseConf, {
  entry: paths.appIndex,
  output: {
    path: paths.appBuildDev,
    filename: "static/js/[name]-bundle-[hash:8].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin([paths.appBuildDev], {
      root: process.cwd()
    }),
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    port: PORT,
    inline: true,
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://dcsp-qa.chinaeast.cloudapp.chinacloudapi.cn',
    //     changeOrigin: true,
    //   }
    // }
  }
})
