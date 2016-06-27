import url from 'url'
import express from 'express'
import mongoose from 'mongoose'

import Student2Course from '../models/student2Course'

import BasicCtrl from './index'


class Student2CourseCtrl extends BasicCtrl {
  create(router){
    router.post('/', function(req,res, next){
      const { student, course } = req.body

      Student2Course.create({
        student,
        course,
      }, (err, newEntity) => {
        if(err) return next(err)

        res.status(201).json(newEntity)
      })

    })
  }

  list(router){
    router.route('/').get((req, res, next) => {
      // To embed resource representatio(show not only ref to id, but external resources too) use API with query.
      // For example /?embed=student&embed=course
      const { embed ='', group } = req.query

      this.Model
        .find(group ? {group} : '')
        .populate(embed)
        .exec((err, entities) => {
          if (err) return next(err)

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

export default new Student2CourseCtrl(Student2Course).getRouter()
