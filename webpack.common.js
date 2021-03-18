const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 防止样式闪烁

module.exports = {
  entry: "./src/js/index.ts",
  output: {
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack-template",
      template: "./src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[id].[fullhash].css",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "link",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[fullhash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[fullhash][ext][query]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          "eslint-loader",
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader", "eslint-loader"],
      },
    ],
  },
}
