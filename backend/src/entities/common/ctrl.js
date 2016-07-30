import express from 'express'
import autobind from 'autobind-decorator'

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

    if( Object.keys(req.body).length === 0 ) return next(new Error('The request body is empty'))

    this.Model.update( { _id}, req.body, err => {
      if(err) return next(err)
      
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
