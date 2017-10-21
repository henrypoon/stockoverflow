/**
 * @fileOverview Webpack basic configuration file.
 */

'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './front/js/app.js',
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },  
  output: {
    path: path.resolve(__dirname, 'public/dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          configFile: './.eslintrc',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-node-env-inline'
          ],
          env: {
            development: {
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&minimize!sass-loader?sourceMap',
        }),
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { removeTitle: false }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ],
  },
};
