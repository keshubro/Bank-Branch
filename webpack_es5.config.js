const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');
const BabelPlugin = require('@babel/plugin-proposal-optional-chaining');

const modeConfig = env => require(`./webpack/webpack.${env.mode}.js`)(env);

const webcomponents = './node_modules/@webcomponents/webcomponentsjs';
const polyfils = [
  {
    from: resolve(`${webcomponents}/webcomponents-loader.js`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponents}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const plugins = [
  new webpack.ProgressPlugin(),
<<<<<<< HEAD
  new CopyWebpackPlugin([...polyfils, ...[{from:'src/images', to:'images'}]], {
=======
  new CopyWebpackPlugin([...polyfils,...[{from:'src/images', to:'images'}]], {
>>>>>>> cf4cf49 (Update details comp changed few styles)
    ignore: ['.DS_Store']
  })
];

module.exports = ({ mode }) => {
  return webpackMerge({
    mode,
    resolve: {
      extensions: ['.js']
    },
    entry: {
      'demo-element': ['babel-polyfill', './src/ApplicationContainer.js']
    },
    output: {
      path: resolve(__dirname, 'dist/legacy'),
      filename: '[name]_es5.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'ie 11'
                }
              ]
            ],
            plugins: [["@babel/plugin-proposal-optional-chaining"]],
            
          }
        },
        {
            test: /\.css|\.s(c|a)ss$/,
            use: [{
                loader: 'lit-scss-loader',
                options: {
                minify: true, // defaults to false
                },
            }, 'extract-loader', 'css-loader', 'sass-loader']
            
        },
        {
            test: /\.(sass|scss|css)$/,
            use: ['style-loader','css-loader','sass-loader']
        },
        {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: ['file-loader']
        }
        
      ]
    },
    plugins
  },
  modeConfig({mode}))
}

