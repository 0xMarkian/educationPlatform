import express from 'express'
import mongoose from 'mongoose'

import Score from '../models/score'

import BasicCtrl from './index'


class ScoreCtrl extends BasicCtrl {
  create(router){
    router.post('/', function(req,res){
      const { scoreValue, studentId, courseId } = req.body

      Score.create({
        scoreValue,
        studentId,
        courseId,
      }, (err, newScore) => res.json(newScore) )

    })
  }
}

export default new ScoreCtrl(Score).getRouter()