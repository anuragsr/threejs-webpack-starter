const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  // devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
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
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: { url: false, sourceMap: false }
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: 'postcss-loader',
            options: { sourceMap: false }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: { sourceMap: false }
          }
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: '[name].[hash:20].[ext]', limit: 8192 }
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // Inject the js bundle at the end of the body of the given template
      inject: 'body',
    }),
    // new BaseHrefWebpackPlugin({ baseHref: '/platzieren/' }),
    new BaseHrefWebpackPlugin({ baseHref: '/' }),
    new CleanWebpackPlugin(buildPath),
    new CopyWebpackPlugin({
      patterns: [{ from: __dirname + '/public' }]
    }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: { inline: false },
        discardComments: { removeAll: true },
        discardUnused: false
      },
      canPrint: true
    })
  ]
};
