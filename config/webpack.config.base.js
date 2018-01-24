const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  devtool: "eval",
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
    new HtmlWebpackPlugin({
      // favicon: paths.appFavIcon,
      title: "MonoToday",
      template: paths.appHtml
    })
  ],
};
