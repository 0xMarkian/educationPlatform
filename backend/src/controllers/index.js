import express from 'express'


export default class BasicCtrl {
  constructor(Model){
    this.Model = Model

    const router = express.Router()
    this.getRouter = () => router

    const basicProps = Object.getOwnPropertyNames(BasicCtrl.prototype)
    const childProps = Object.getOwnPropertyNames(this.__proto__)
    const props = [...basicProps, ...childProps].filter( (item,pos,self) => self.indexOf(item) === pos)
    props.forEach( prop => {
      if(prop === 'constructor') return

      this[prop](router)
    })
  }
  list(router){
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

      if( Object.keys(req.body).length === 0 ) return next(new Error('The request body is empty'))

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