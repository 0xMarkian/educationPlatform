import express from 'express'
import mongoose from 'mongoose'

import Student from '../models/student'

import BasicCtrl from './index'

class StudentCtrl extends BasicCtrl{
  create(router){
    router.route('/').post( (req,res) => {
      const { name, groupId } = req.body

      Student.create({
        name,
        groupId,
      }, (err, newStudent) => res.json(newStudent) )

    })
  }
}

export default new StudentCtrl(Student).getRouter()