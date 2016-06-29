import express from 'express'
import mongoose from 'mongoose'

import Group from '../models/group'

import BasicCtrl from './index'

class GroupCtrl extends BasicCtrl{
  createNewGroup(router){
    router.route('/').post( (req,res, next) => {
      const { curator, name } = req.body

      Group.create({
        curator,
        name,
      }, (err, newGroup ) => {
        if(err) return next(err)

        res.status(201).json(newGroup)
      })
    })

  }
}

export default new GroupCtrl(Group).getRouter()