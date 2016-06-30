import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import expressJWT from 'express-jwt'
import cookieParser from 'cookie-parser'

import config from './config'

import courseRoutes from './entities/course'
import groupRoutes from './entities/group'
import scoreRoutes from './entities/score'
import studentRoutes from './entities/student'
import student2CourseRoutes from './entities/student2Course'
import subjectRoutes from './entities/subject'
import userRoutes from './entities/user'

import setupRoute from '../migrations/setupRouter'

const app = express()

function configureMiddelware(app){
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(morgan('dev'))

  app.use(expressJWT({
    secret: config.secret,
    getToken: req => req.cookies.accessToken,
  }).unless({ path: ['/users/signUp','/users/signIn', '/setup'] }) )

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
}

const configureRoutes = app => {
  app.use('/groups', groupRoutes)
  app.use('/students', studentRoutes)
  app.use('/courses', courseRoutes)
  app.use('/scores', scoreRoutes)
  app.use('/students2Courses', student2CourseRoutes)
  app.use('/subjects', subjectRoutes)
  app.use('/users', userRoutes)

  if(process.env.NODE_ENV !== 'production') app.use('/setup', setupRoute)
}

configureMiddelware(app)
configureRoutes(app)

export default app


// import fetch from 'node-fetch'
// const handleError = response => {
//   if(!response.ok) console.error(response)
//   return response
// }
// const parseJSON = response => response.json()
//
// fetch('https://na25.salesforce.com/v37.0/')
//   .then(handleError)
//   .then(parseJSON)
//   .then(response => console.log(response))