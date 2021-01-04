const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 8080,
    open: true,
    contentBase: path.join(__dirname, "build"),
    publicPath: '/',
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader'
        ],
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            loader: 'url-loader',
            options: { name: '[path][name].[ext]?hash=[hash:20]', limit: 8192 }
          }
        ]
      },
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // Inject the js bundle at the end of the body of the given template
      inject: 'body',
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new CopyWebpackPlugin({
      patterns: [{from: __dirname + '/public'}]
    }),
  ]
};
