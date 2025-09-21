const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

// Export a function so we can read argv.mode reliably (Webpack doesn't set process.env.NODE_ENV for the config runtime)
/** @type {(env: any, argv: { mode?: 'development' | 'production' | 'none' }) => import('webpack').Configuration} */
module.exports = (env = {}, argv = {}) => {
  const mode = argv.mode || process.env.WEBPACK_MODE || 'development';
  const isProduction = mode === 'production';
  const devPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  return {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
    chunkFilename: isProduction
      ? 'static/js/[name].[contenthash].chunk.js'
      : 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[hash][ext][query]',
    clean: true,
    // Reason: Use relative URLs for GitHub Pages to avoid absolute-root 404s.
    // 'auto' makes Webpack compute publicPath at runtime based on current location.
    publicPath: isProduction ? 'auto' : '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...(isProduction && process.env.USE_PREACT === 'true'
        ? {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat'
          }
        : {})
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
    // Also emit a 404.html for GitHub Pages SPA fallback
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: '404.html',
      favicon: path.resolve(__dirname, 'public/favicon.svg')
    }),
    new Dotenv({
      systemvars: true // allow CI/prod env vars to pass through
    }),
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || ''),
      __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL || ''),
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css'
          })
        ]
      : [])
    .concat(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  devtool: isProduction ? false : 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      // Encourage Webpack to split large chunks into smaller pieces
      minSize: 20000,
      maxSize: 244000,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // Create a separate vendor chunk for react/react-dom and heavy libs
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|framer-motion|@tanstack)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 20
        },
        // Default group for the rest of node_modules
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    historyApiFallback: true,
    hot: true,
    port: devPort
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxEntrypointSize: 512000, // 500 KB
    maxAssetSize: 512000
  }
  };
};
