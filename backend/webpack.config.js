var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const outputPath = path.join(__dirname, 'dist')

module.exports = {
  target:'node',
  entry: './server.js',
  output: {
    path: outputPath,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  loaders: [
    {
      test: /\.js?/,
      loaders: [
        'babel'
      ],
      include: 'index.js',
      query: {
        presets: [
          'es2015'
        ]
      }
    },
    {
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'sass'
      ]
    }
  ],
  externals: nodeModules,
}