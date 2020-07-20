const path = require('path');

module.exports = {
  entry: { main: './src/scripts/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/shopping-app/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [],
};
