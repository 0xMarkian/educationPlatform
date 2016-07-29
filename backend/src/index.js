import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import expressJWT from 'express-jwt'
import cookieParser from 'cookie-parser'

import config from './config/index'

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
  app.use( (req, res, next) => {
    const { origin } = req.headers

    res.header("Access-Control-Allow-Credentials", true)
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Content-Type, *')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')

    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    }
    else {
      next()
    }
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(morgan('dev'))

  app.use(expressJWT({
    secret: config.secret,
    getToken: req => req.cookies.accessToken,
  }).unless({ path: ['/users/register','/users/login', '/setup'] }) )


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