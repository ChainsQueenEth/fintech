const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const devPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
    assetModuleFilename: 'static/media/[hash][ext][query]',
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                  require('postcss-preset-env')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.svg')
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css'
          })
        ]
      : [])
  ],
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    historyApiFallback: true,
    hot: true,
    port: devPort
  }
};
