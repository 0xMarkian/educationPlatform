import express from 'express'
import mongoose from 'mongoose'

import Group from '../models/group'
import Teacher from '../models/teacher'


const groupsRouter = express.Router()
groupsRouter.route('/')
  
  // ** GET /groups - array of all groups
  .get(function(req,res){
    Group.list()( groups => res.json(groups) )
  })

  // ** POST /groups/ - create new group
  .post(function(req,res){
    // const { curatorIId } = req.body
    const { curatorIId, name } = req.body

    Teacher.findOne(function(err, teacher){
      const curatorId = teacher._id

      Group.create({
        curatorId,
        name,
      })( (err, newGroup ) => res.json(newGroup) )
    })

  })

export default groupsRouter