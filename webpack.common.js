const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/js/index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ // generates an HTML5 file, includes all webpack bundled files
      template: "./src/index.html"
    }) 
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" // compiles ECMAScript 2015+ code
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif|mp4|webm)$/, // loads assets into dist
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "assets"
          }
        }
      },
    ]
  }
};