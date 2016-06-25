import express from 'express'
import mongoose from 'mongoose'

import Course from '../models/course'
import Student2Course from '../models/student2Course'
import Student from '../models/student'

import BasicCtrl from './index'


class CourseCtrl extends BasicCtrl{
  create(router){
    router.post('/', (req,res, next) => {
      const { subject, group } = req.body

      Course.create({
        subject,
      }, (err, newCourse) => {
        if(err) return next(err)

        Student
          .find({group})
          .select('_id')
          .exec( (err, findedStudents) => {
            if(err) return next(err)

            findedStudents.forEach( student => {
              Student2Course.create({
                student: student._id,
                course: newCourse._id,
              }, err => {
                if(err) return next(err)
                res.status(201).json(newCourse)
              })
            })
          })
      })

    })
  }
}


export default new CourseCtrl(Course).getRouter()