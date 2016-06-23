import express from 'express'

export const deleteCtrl = Entity => (req,res, next) => {
  const _id = req.params.id

  Entity.remove( {_id}, err => {
    if(err) return next(err)
    res.sendStatus(200)
  })
}

export const getAllCtrl = Entity => (req, res, next) => {
  Entity.find((err, entities) => {
    if (err) next(err)
    res.json(entities)
  })
}


export const getOneByIdCtrl = Entity => (req, res, next) => {
  const _id = req.params.id
  Entity.findById(_id, (err, entity) => {
    if (err) next(err)
    res.json(entity)
  })
}


export const patchOneById = Entity => (req,res, next) => {
  const { id: _id } = req.params
  Entity.update( { _id}, req.body, err => {
    if(err) return next(err)
    res.sendStatus(200)

  })
}



export default class BasicCtrl {
  constructor(Model){
    this.Model = Model

    const router = express.Router()
    this.getRouter = () => router

    const basicProps = Object.getOwnPropertyNames(BasicCtrl.prototype)
    const childProps = Object.getOwnPropertyNames(this.__proto__)
    const props = [...basicProps, ...childProps]
    props.forEach( prop => {
      if(prop === 'constructor') return

      this[prop](router)
    })
  }
  getAll(router){
    router.route('/').get((req, res, next) => {
      this.Model.find((err, entities) => {
        if (err) next(err)
        res.json(entities)
      })
    })
  }
  getOneById(router){
    router.route('/:id').get((req, res, next) => {
      const { id: _id } = req.params
      this.Model.findById(_id, (err, entity) => {
        if (err) next(err)
        res.json(entity)
      })
    })
  }

  updateOneById(router){
    router.route('/:id').patch( (req,res, next) => {
      const { id: _id } = req.params
      this.Model.update( { _id}, req.body, err => {
        if(err) return next(err)
        res.sendStatus(200)

      })
    })
  }

  deleteById(router){
    router.route('/:id').delete( (req,res, next) => {
      const { id: _id } = req.params

      this.Model.remove( {_id}, err => {
        if(err) return next(err)
        res.sendStatus(200)
      })
    })
  }
}