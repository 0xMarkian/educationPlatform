import https from 'https'
import fs from 'fs'
import mongoose from 'mongoose'
import config from './config/index'

import app from './index'

app.listen = (port, cb) => {
  https.createServer({
    key: fs.readFileSync(`${__dirname}/config/server.key`),
    cert : fs.readFileSync(`${__dirname}/config/server.crt`)
  },app).listen(port, cb)
}

const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}


connectDataBase(config.databaseURI)

app.listen(config.port, function(){
  console.log(`Server is running on port ${config.port}`)
})