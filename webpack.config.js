const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.7,
      deleteOriginalAssets: false,
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      compressionOptions: { level: 11 },
      minRatio: 0.7,
      deleteOriginalAssets: false,
    })
  ],
  entry: './client/reservation.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    library: 'ReservationsModule',
  },
  module: {
    rules: [
      {
        test: /(\.m?js$|\.m?jsx$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.otf$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};
