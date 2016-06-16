var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');

var deepmerge = DeepMerge(function(target, source, key) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

var defaultConfig = {
  entry: './server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: nodeModules,
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
  defaultConfig.devtool = '#eval-source-map';
  defaultConfig.debug = true;
}


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// tasks

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('build', function(done) {
  webpack(defaultConfig).run(onBuild(done));
});

gulp.task('watch', function() {
  webpack(defaultConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/backend'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});

//migrations

var webpackStream = require('webpack-stream')
const eventStream = require('event-stream')
const spawn = require('child_process').spawn

const migrationConfig = config({
  entry: './migrations/intializeDB',
  watch: false,
})

gulp.task('migrateDB', function() {
  return gulp.src(migrationConfig.entry)
    .pipe(webpackStream(migrationConfig))
    .pipe(nodeEval())
})

const nodeEval = (git ) => (
  eventStream.map( function(file, cb) {
    const out = fs.openSync('./out.log', 'a'),
      err = out

    const childProcess = spawn('node',['--eval', String(file.contents)],{
      detached: true,
      stdio: [ 'ignore', out, err ],
    })
    childProcess.unref()

    cb(null,null)
    // fs.writeFile('./migrations/tmp.js', file.contents)
  })
)
