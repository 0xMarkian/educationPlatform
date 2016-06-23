import express from 'express'
import mongoose from 'mongoose'

import Group from '../models/group'
import Teacher from '../models/teacher'

import BasicCtrl from './index'

class GroupCtrl extends BasicCtrl{
  createNewGroup(router){
    router.route('/').post( (req,res) => {
      const { curatorId, name } = req.body
      Teacher.findOne(function(err, teacher){
        const curatorId = teacher._id

        Group.create({
          curatorId,
          name,
        }, (err, newGroup ) => res.json(newGroup) )
      })

    })
  }
}

export default new GroupCtrl(Group).getRouter()