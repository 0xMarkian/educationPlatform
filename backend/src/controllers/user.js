import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import config from '../config'

import User from '../models/user'

import BasicCtrl from './index'

class UserCtrl extends BasicCtrl{
  create(router){
    router.route('/signUp').post( (req,res, next) => {
      const { name, password } = req.body

      User.create({
        name,
        password,
      }, (err, newEntity) => {
        if(err) return next(err)

        res.json(newEntity)
      })

    })
  }
  signIn(router) {
    router.route('/signIn').post((req, res, next) => {
      const {name, password} = req.body

      User.findOne({name}, (err, user) => {
        if (err) return next(err)

        if (!user) return res.status(401).json({success: false, message: 'Authentication failed. User not found.'})

        if (user.password !== password) return res.status(401).json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })

        const token = jwt.sign(user, config.secret)
        res.json({
          success: true,
          token,
        })
      })
    })
  }
}

export default new UserCtrl(User).getRouter()