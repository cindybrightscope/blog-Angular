const webpack = require('webpack');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');

module.exports = {
  entry: {
    app: ['./app/index']
  },
  output: {
    path: __dirname,
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'tslint-loader',
      }
    ],

  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        tslint: {
          tsConfigFile: 'tslint.json',
          failOnHint: true,
          typeCheck: true,
          emitErrors: true,
        },
      }
    }),
    new SourceMapDevToolPlugin({
      filename: '[name]-bundle.js.map',
      append: '//# sourceMappingURL=[url]'
    })
  ]
};
