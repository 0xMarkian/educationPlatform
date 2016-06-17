const webpackStream = require('webpack-stream')
const fs = require('fs')
const path = require('path')
const eventStream = require('event-stream')
const spawn = require('child_process').spawn

const migrationsConfig = require('./webpack/migrations')


const nodeEval = () => (
  eventStream.map( function(file, cb) {
    const out = fs.openSync( path.join(migrationsConfig.entry, '../out.log'), 'a'),
      err = out

    const childProcess = spawn('node',['--eval', String(file.contents)],{
      detached: true,
      stdio: [ 'ignore', out, err ],
    })
    childProcess.unref()

    cb(null,null)
  })
)

module.exports = gulp => {
  gulp.task('migrateDB', function () {
    return gulp.src(migrationsConfig.entry)
      .pipe(webpackStream(migrationsConfig))
      .pipe(nodeEval())
  })
}




   
  
 

 


