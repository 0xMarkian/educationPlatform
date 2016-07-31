import express from 'express'

import migrateDB from './setupDB'


const setup = express.Router()
setup.route('/')
  .get(function(req,res,next){
    migrateDB()
    res.end()
  })

export default setup