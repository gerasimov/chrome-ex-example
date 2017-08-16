const webpack = require("webpack");

module.exports = {
  entry: {
    content: "./src/content.js",
    background: "./src/background.js",
    include: "./src/include.js"
  },
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        CHROME_EX: JSON.stringify(Math.random() + Date.now())
      }
    })
  ]
};
