import url from 'url'
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

  getAll(router){
    router.route('/').get((req, res, next) => {
      // To embed resource representatio(show not only ref to id, but external resources too) use API with query.
      // For example /?embed=student&embed=course
      const { embed ='' } = req.query

      this.Model
        .find()
        .populate(embed)
        .exec((err, entities) => {
          if (err) next(err)
          res.json(entities)
        })
    })
  }

  getOneById(router){
    router.route('/:id').get((req, res, next) => {
      const { id: _id } = req.params

      // To embed resource representatio(show not only ref to id, but external resources too) use API with query.
      // For example /:id?embed=student&embed=course
      const { embed ='' } = req.query

      this.Model
        .findById(_id)
        .populate(embed)
        .exec((err, entity) => {
        if (err) next(err)
        res.json(entity)
      })
    })
  }
}

export default new ScoreCtrl(Score).getRouter()
