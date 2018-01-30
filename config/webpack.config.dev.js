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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ]
  },
  devtool: "eval",
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
    proxy: {
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
