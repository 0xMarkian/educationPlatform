import url from 'url'
import express from 'express'
import mongoose from 'mongoose'

import BasicCtrl from '../../lib/ctrl'


class Student2CourseCtrl extends BasicCtrl {
  create(req,res, next){
    const { student, course } = req.body,
      { group } = req.user._doc

    this.Model.create({
      student,
      course,
      group
    }, (err, newEntity) => {
      if(err) return next(err)

      res.status(201).json(newEntity)
    })
  }

  list(req, res, next){
    // To embed resource representatio(show not only ref to id, but external resources too) use API with query.
    // For example /?embed=student&embed=course
    const { embed ='' } = req.query,
      { group } = req.user._doc

    this.Model
      .find({group})
      .populate(embed)
      .exec((err, entities) => {
        if (err) return next(err)

        res.json(entities)
      })
  }
}

export default Student2CourseCtrl
