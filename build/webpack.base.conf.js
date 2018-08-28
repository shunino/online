var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loaders:[
          {
            loader: path.resolve(__dirname, 'cssPathResolver')
          },
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('icons/[name].[hash:7].[ext]'),
            }
          }]
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        // }
      }
    ]
  },
  plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.ProvidePlugin({
		jQuery: "jquery",
		$: "jquery"
		})
		]
}
