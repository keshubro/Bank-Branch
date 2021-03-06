const webpack = require('webpack');
const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BabelPlugin = require('@babel/plugin-proposal-optional-chaining');

const modeConfig = env => require(`./webpack/webpack.${env.mode}.js`)(env);

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin()
];

module.exports = ({ mode }) => {
  return webpackMerge(modeConfig({mode}), {
    mode,
    resolve: {
      extensions: ['.js']
    },
    entry: {
      'demo-element': ['./src/ApplicationContainer.js']
    },
    output: {
      path: resolve(__dirname, 'dist/'),
      filename: '[name]_es6.bundle.js'
    },
    plugins
  })
}