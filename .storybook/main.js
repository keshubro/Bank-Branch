const path = require('path');

 

// Export a function. Accept the base config as the only param.

module.exports = {

  webpackFinal: async (config, { configType }) => {

    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'

    // You can change the configuration based on that.

    // 'PRODUCTION' is used when building the static version of storybook.

 

    // Make whatever fine-grained changes you need

    config.module.rules.push({

      test: /\.scss$/,

      use: ['style-loader', 'css-loader', 'sass-loader'],

      include: path.resolve(__dirname, '../'),

    });

    config.module.rules.push({

        test: /\.js$/,

        use: [

        //   {

        //     loader: require.resolve('@open-wc/webpack-import-meta-loader'),

        //   },

          {

            loader: 'babel-loader',

            options: {

              presets: ['@babel/preset-typescript', '@babel/preset-env'],

              plugins: [

                //"@babel/plugin-transform-runtime",

                ['@babel/plugin-proposal-decorators', { legacy: true }],

                ['@babel/plugin-proposal-class-properties', { loose: true }],

                '@babel/plugin-proposal-optional-chaining',

              ],

            },

          },

        ],

       // include: new RegExp(`node_modules(\\/|\\\\)(${['ing-feat-feedback'].join('|')})(.*)\\.js$`),

        //exclude:/node_modules\/(?!ing-feat-feedback)/

      });

    // Return the altered config

    return config;

  },

};