import express from 'express'

import migrateDB from '../../migrations/intializeDB'


const setup = express.Router()
setup.route('/')
  .get(function(req,res,next){
    migrateDB()
    res.end()
  })

export default setup