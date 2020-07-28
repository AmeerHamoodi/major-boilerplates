const { resolve } = require("path");
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

module.exports = {
  entry: "./src/client/js/main.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/react"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "./dist/client/js")
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./src/client/index.html"),
      filename: resolve(__dirname, "./dist/client/index.html"),
      inject: false,
      version: v,
      changeVersion: PACKAGE.version,
      source: `<script src="./js/bundle.js?version=${v}`
    })
  ]
};
