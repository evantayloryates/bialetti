const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Where files should be sent once they are bundled
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/bialetti/' : '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
  },
    // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 4200,
    watchContentBase: true,
    historyApiFallback: true,
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      // {
      //   test: /\.woff2?$/i,
      //   type: 'asset/resource',
      //   dependency: { not: ['url'] },
      // }, 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: false,
      template: path.resolve(__dirname, './src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/fonts', to: 'fonts' },
      ],
    }),
  ],
}