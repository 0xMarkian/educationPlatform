const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes/')
const groups = require('./routes/groups')


const startServer = (port = 8000) => app => {
  app.listen(port, function(){
    console.log('Server is running on port 8000')
  })
}
const connectDataBase = uri => {
  mongoose.connect(uri)

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
    .once('open', function() {
      console.log('we are connected to database now')
    })
}
const configureRoutes = app => {
  app.use('/', routes)
  app.use('/groups', groups)
}
const configureApplication = app => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}

const configureAndStartApplication = app => {
  configureApplication(app)
  configureRoutes(app)
  connectDataBase('mongodb://localhost/educationPlatform')
  startServer(process.env.PORT)(app)
}

configureAndStartApplication(express())

class Foo{
  constructor(){
    this.a = 1
  }
}
