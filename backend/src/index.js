import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes'
import mongoose from 'mongoose'

const app = express()
function configurateExpress(app){
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}

const startServer = (port = 8080) => app => {
  app.listen(port, function(){
    console.log(`Server is running on port ${port}`)
  })
}

configurateExpress(app)
connectDataBase('mongodb://localhost/educationPlatform')
startServer(process.env.PORT)(app)

app.use('/', routes)

import '../migrations/intializeDB'