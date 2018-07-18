const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // hot: true,
    inline: true,
    stats: {
      colors: true,
    },
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  entry: {
    main: [
      path.join(process.cwd(), 'src', 'web', 'javascript', 'index.js'),
      'webpack-dev-server/client?http://localhost:3000/',
      // 'webpack-hot-middleware/client',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: path.join(process.cwd(), 'src', 'web'),
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: path.join(process.cwd(), 'src', 'web'),
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
            },
          },
          // sharedConfig.loaders.postcss(),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(process.cwd(), 'src', 'web')],
            },
          },
          {
            loader: './scripts/sass-import-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'StatsTable',
      template: './src/web/assets/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
