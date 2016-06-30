import mongoose from 'mongoose'
import config from './config'

import app from './index'


const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}

const startServer = (port) => app => {
  app.listen(port, function(){
    console.log(`Server is running on port ${port}`)
  })
}

connectDataBase(config.databaseURI)
startServer(config.port)(app)