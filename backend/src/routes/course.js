import express from 'express'
import mongoose from 'mongoose'

import Course from '../models/course'
import Student2Course from '../models/student2Course'
import Student from '../models/student'


const courseRoutes = express.Router()
courseRoutes.route('/')

  // ** GET /groups - array of all groups
  .get(function(req,res){
    Course.list()( students => res.json(students) )
  })

  // ** POST /groups/ - create new group
  .post(function(req,res){
    const { teacherId, subjectId, groupId } = req.body

    Course.create({
      teacherId,
      subjectId,
    })( (err, newCourse) => {
      const courseId = newCourse._id
      Student.find({groupId}).select('groupId')
        .exec( (err, studentIds) => {
          studentIds.forEach( studentId => {
            Student2Course.create({
              studentId,
              courseId,
            })( err => {
              if(err) return res.send(err)
              res.send(newCourse)
            })
          })
        })
    })

  })
export default courseRoutes