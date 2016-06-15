const mongoose = require('mongoose')

const app = require('./src')


const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}

const startServer = (port = 8080) => app => {
  app.listen(port, function(){
    console.log('Server is running on port 8000')
  })
}


connectDataBase('mongodb://localhost/educationPlatform')
startServer(process.env.PORT)(app)
