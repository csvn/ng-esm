const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: './src/main',
    vendor: './src/vendor'
  },
  output: {
    path: root('dist'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  context: root(),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [root()],
        options: {
          configFileName: 'example/tsconfig.json'
        }
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
        include: [root('../dist')]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'ng-esm': root('..')
    }
  },
  watchOptions: {
    ignored: /(node_modules|ng-esm\/src)/
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
};


function root(...paths) {
  return path.resolve(__dirname, 'example', ...paths);
}
