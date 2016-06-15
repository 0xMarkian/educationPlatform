import express from 'express'
import mongoose from 'mongoose'

import Student from '../models/student'


const studentRouter = express.Router()
studentRouter.route('/')

  // ** GET /groups - array of all groups
  .get(function(req,res){
    Student.list()( students => res.json(students) )
  })

  // ** POST /groups/ - create new group
  .post(function(req,res){
    const { name, groupId } = req.body

    Student.create({
      name,
      groupId,
    })( newStudent => res.json(newStudent) )

  })

export default studentRouter