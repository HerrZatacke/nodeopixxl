const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: false,
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  entry: {
    main: [
      path.join(process.cwd(), 'src', 'web', 'javascript', 'index.js'),
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
    // new webpack.NamedModulesPlugin(),
  ],
};
