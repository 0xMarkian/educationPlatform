import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes'

const app = express()

function configurateExpress(app){
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}
configurateExpress(app)

app.use('/', routes)

export default app
