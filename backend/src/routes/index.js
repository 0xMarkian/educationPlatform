const express = require('express')

import groupRoutes from '../controllers/group'
import studentRoutes from '../controllers/student'
import courseRoutes from '../controllers/course'
import scoreRoutes from '../controllers/score'
import subjectRoutes from '../controllers/subject'


const router = express.Router()

router.route('/').get( function(req, res, next){
  res.json({
    text: 'this is root'
  })
  next()
})

router.use('/groups', groupRoutes)
router.use('/students', studentRoutes)
router.use('/courses', courseRoutes)
router.use('/scores', scoreRoutes)
router.use('/subjects', subjectRoutes)

export default router