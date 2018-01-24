const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

const PORT = 5080

module.exports = {
  entry: paths.appIndex,
  output: {
    path: paths.appBuildDev,
    filename: "static/js/[name]-bundle-[hash:8].js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)$/,
        loader: "tslint-loader",
        include: paths.appSrc
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        include: paths.appSrc
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
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
        test: /\.(ico|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin([paths.appBuildDev], {
      root: process.cwd()
    }),
    new HtmlWebpackPlugin({
      // favicon: paths.appFavIcon,
      title: "MonoToday",
      template: paths.appHtml
    })
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
};
