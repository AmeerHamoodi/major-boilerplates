const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let getV = () => {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 4; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

let v = getV();

let PACKAGE = require("./package.json");

module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    path: __dirname + "./devBuild/client/js",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname + "/src/client/index.html"),
      filename: resolve(__dirname + "./devBuild/client/index.html"),
      inject: false,
      version: v,
      changeVersion: PACKAGE.version,
      source: `<script src="./js/bundle.js?version=${v}`
    })
  ]
};
