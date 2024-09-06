const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {

  mode : "production",
  entry : "./src/index.js",
  output : {
    filename : "main.js",
    path : path.resolve(__dirname,"dist"),
},
  plugins : [
    new HtmlWebpackPlugin({
      filename : "index.html",
      inject : true,
      template : path.resolve(__dirname,'src','template.html'),
    }),
  ],
  module : {
    rules : [
      {
        test : /\.css$/,
        use : ['style-loader','css-loader']
      }
    ]
  }
}
