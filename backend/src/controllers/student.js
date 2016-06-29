import express from 'express'
import mongoose from 'mongoose'

import Student from '../models/student'

import BasicCtrl from './index'

class StudentCtrl extends BasicCtrl{
  create(router){
    router.route('/').post( (req,res) => {
      const { name, group } = req.body

      Student.create({
        name,
        group,
      }, (err, newEntity) => {
        if(err) return next(err)

        res.json(newEntity)
      })

    })
  }
}

export default new StudentCtrl(Student).getRouter()