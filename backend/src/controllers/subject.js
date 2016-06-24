import express from 'express'
import mongoose from 'mongoose'

import Subject from '../models/subject'

import BasicCtrl from './index'


class SubjectCtrl extends BasicCtrl {
  create(router){
    router.post('/', function(req,res){
      const { name } = req.body

      Subject.create({
        name,
      }, (err, newSubject ) => res.json(newSubject) )

    })
  }
}

export default new SubjectCtrl(Subject).getRouter()