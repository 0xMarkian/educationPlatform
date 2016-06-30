const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const backendRoot = path.join(__dirname, '../../')
const srcPath = path.join(backendRoot, './src/server')

function configureExternals(){
  const nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });
  return nodeModules
}
const externals = configureExternals()



var base = {
  entry: srcPath,
  target: 'node',
  output: {
    path: path.join(backendRoot, './build'),
    filename: 'backend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: externals,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
    ]
  }
};

if(process.env.NODE_ENV !== 'production') {
  base.devtool = '#source-map';
  base.debug = true;
}

module.exports = base