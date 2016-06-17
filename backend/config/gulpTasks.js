var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodemon = require('nodemon');

const baseConfig = require('./webpack/base')

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

module.exports = gulp => {
  gulp.task('build', function(done) {
    webpack(baseConfig).run(onBuild(done));
  });
  gulp.task('watch', function() {
    webpack(baseConfig).watch(100, function(err, stats) {
      onBuild()(err, stats);
      nodemon.restart();
    });
  });

  gulp.task('run', ['watch'], function() {
    nodemon({
      execMap: {
        js: 'node'
      },
      script: path.join(baseConfig.output.path, baseConfig.output.filename),
      ignore: ['*'],
      watch: ['foo/'],
      ext: 'noop'
    }).on('restart', function() {
      console.log('Restarted!');
    });
  });
}
