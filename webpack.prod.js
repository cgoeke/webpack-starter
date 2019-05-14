const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js", // content hash used for cache busting
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extracts CSS files
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(), // minifies CSS
      new TerserPlugin() // minifies JS files
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // cleans up dist folder
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ] 
});