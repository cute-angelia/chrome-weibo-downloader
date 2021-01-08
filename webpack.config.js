const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { version } = require('./package.json')

const AppPath = __dirname + '/app'
const DistPath = __dirname + '/dist'

module.exports = {
  mode: 'production',
  entry: {
    background: __dirname + '/app/background/background.js',
    inject: __dirname + '/app/inject/inject.js',
  },
  output: {
    path: __dirname + '/app/dist',
    filename: '[name].entry.js',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|gif)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  optimization: {
    //minimizer: [new TerserPlugin()]
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.BannerPlugin('Copyright rose2099.c@gmail.com'),
    new CopyPlugin([
      {
        from: AppPath + '/manifest.json', to: DistPath, transform: (content) => {
          const jsonContent = JSON.parse(content)
          jsonContent.version = version

          // if (config.mode === 'development') {
          //   jsonContent['content_security_policy'] = 'script-src \'self\' \'unsafe-eval\'; object-src \'self\''
          // }

          return JSON.stringify(jsonContent, null, 2)
        },
      },
      {
        from: AppPath + '/public',
        to: DistPath + '/public'
      },
      {
        from: AppPath + '/dist',
        to: DistPath + '/dist'
      }
    ]),
  ]
}