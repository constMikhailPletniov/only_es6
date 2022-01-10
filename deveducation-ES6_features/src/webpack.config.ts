import path from "path";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from 'dotenv-webpack';

module.exports = {
  entry: "./ts/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|jpg)$/i,
        type: 'asset'
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      systemvars: false,
      silent: false,
      expand: false,
      defaults: false,
      ignoreStub: true,
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./ts/*",
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
  stats: {
    errorDetails: true
  }
};

