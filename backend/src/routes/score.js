import express from 'express'
import mongoose from 'mongoose'

import Score from '../models/score'


const scoreRoutes = express.Router()
scoreRoutes.route('/')

// ** GET /groups - array of all groups
  .get(function(req,res){
    Score.list()( students => res.json(students) )
  })

  // ** POST /groups/ - create new group
  .post(function(req,res){
    const { scoreValue, studentId, courseId } = req.body

    Score.create({
      scoreValue,
      studentId,
      courseId,
    })( (err, newScore) => res.json(newScore) )

  })

export default scoreRoutes