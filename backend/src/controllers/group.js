import express from 'express'
import mongoose from 'mongoose'

import Group from '../models/group'
import Teacher from '../models/teacher'

import BasicCtrl from './index'

class GroupCtrl extends BasicCtrl{
  createNewGroup(router){
    router.route('/').post( (req,res, next) => {
      const { curatorId, name } = req.body
      Teacher.findOne(function(err, teacher){
        // const curator = teacher._id

        Group.create({
          curator,
          name,
        }, (err, newGroup ) => {
          if(err) return next(err)

          res.status(201).json(newGroup)
        })
      })

    })
  }
}

export default new GroupCtrl(Group).getRouter()