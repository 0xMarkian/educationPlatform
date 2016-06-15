const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()

function configurateExpress(app){
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}
configurateExpress(app)

app.use('/', routes)

module.exports = app