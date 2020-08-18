const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/scripts/pages/index.js',
    cart: './src/scripts/pages/cart.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/shopping-app/',
  },
  devServer: {
    port: 8080,
    openPage: 'shopping-app/',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff2|woff)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: 'src/cart.html',
      chunks: ['cart'],
    }),
    new MiniCssExtractPlugin(),
  ],
};
