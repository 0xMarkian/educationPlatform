const express = require('express')

const router = express.Router()
router.route('/', function(req, res){
  res.json({
    text: 'this is root'
  })
})

module.exports = router