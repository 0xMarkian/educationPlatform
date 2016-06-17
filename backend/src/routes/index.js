const express = require('express')

import groupRoutes from './group'
import studentRoutes from './student'
import courseRoutes from './course'
import scoreRoutes from './score'


const router = express.Router()

router.route('/', function(req, res){
  res.json({
    text: 'this is root'
  })
})

router.use('/groups', groupRoutes)
router.use('/students', studentRoutes)
router.use('/courses', courseRoutes)
router.use('/scores', scoreRoutes)

export default router