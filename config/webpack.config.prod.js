const webpack = require("webpack")
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseConf = require('./webpack.config.base')
const paths = require("./paths")

const extractCSS = new ExtractTextPlugin({
  filename: "static/css/[name].[hash:8].css"
});

module.exports = merge.smart(baseConf, {
  entry: {
    main: paths.appIndex,
    vendor: [
      "axios",
      "history",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-dom",
      "react-router-redux",
      "redux-actions",
    ],
  },
  output: {
    path: paths.appBuildProd,
    filename: 'static/js/[name]-bundle-[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ]
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin([paths.appBuildProd], {
      root: process.cwd(),
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,   // enable source maps to map errors (stack traces) to modules
      output: {
        comments: false, // remove all comments
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["common", "vendor"],
      minChunks: 2,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    extractCSS,
  ],
})
