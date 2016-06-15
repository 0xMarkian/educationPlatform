const express = require('express')

import groupRoutes from './group'


const router = express.Router()

router.route('/', function(req, res){
  res.json({
    text: 'this is root'
  })
})

router.use('/groups', groupRoutes)

export default router