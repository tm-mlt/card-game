const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../assets"),
    publicPath: "/",
    hot: true,
    host: "0.0.0.0",
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new CleanWebpackPlugin({
    //  root: path.resolve(__dirname, "../"),
    //}),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(false),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.ProvidePlugin({
      Phaser: "phaser",
    }),
    new Dotenv(),
  ],
};
