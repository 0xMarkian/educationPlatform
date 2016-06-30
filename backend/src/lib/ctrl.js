import express from 'express'


export default class BasicCtrl {
  constructor(Model){
    this.Model = Model
  }

  getOne(req, res, next){
    const { id: _id } = req.params
    this.Model.findById(_id, (err, entity) => {
      if (err) next(err)
      res.json(entity)
    })
  }

  update(req,res, next){
    const { id: _id } = req.params

    if( Object.keys(req.body).length === 0 ) return next(new Error('The request body is empty'))

    this.Model.update( { _id}, req.body, err => {
      if(err) return next(err)
      
      res.sendStatus(200)
    })
  }

  deleteOneById(req,res, next){
    const { id: _id } = req.params

    this.Model.remove( {_id}, err => {
      if(err) return next(err)
      res.sendStatus(200)
    })
  }
}