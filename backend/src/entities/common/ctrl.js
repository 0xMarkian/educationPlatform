import express from 'express'
import autobind from 'autobind-decorator'

import { filterValidationErrObj } from '../common/utils'


export default class BasicCtrl {
  constructor(Model){
    this.Model = Model
  }

  @autobind
  listAll(req, res, next){
    this.Model.find({}, (err, data) => {
      if(err) return next(err)

      res.json({ data, })
    })
  }

  @autobind
  getOne(req, res, next){
    const { id: _id } = req.params
    this.Model.findById(_id, (err, data) => {
      if (err) next(err)
      res.json({ data,})
    })
  }

  @autobind
  update(req,res, next){
    const { id: _id } = req.params
    
    this.Model.update( { _id}, req.body, errObj => {
      if(errObj) return res.status(400).json( { message: filterValidationErrObj(errObj.errors) })
      
      res.sendStatus(200)
    })
  }

  @autobind
  deleteById(req, res, next){
    const { id: _id } = req.params

    this.Model.remove( {_id}, err => {
      if(err) return next(err)
      res.sendStatus(200)
    })
  }
}
