const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: "umd",
    }
  },
  module: {
    rules: [
       {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
       }
    ]
  }
};