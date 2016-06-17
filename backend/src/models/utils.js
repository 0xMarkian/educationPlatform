import { Schema } from 'mongoose'

export const basicSchemaCtrls = {
  create(params){
    return cb => {
      const newEntity = new this({
        ...params,
      })
      newEntity.save( (err) => {
        if(err) return cb(err, newEntity)
        return cb(err,newEntity)
      })
    }
  },
  list(cb){
    return cb => this.find( (err, entities) => cb(entities) )
  }
}

export const uniqueName = {
  type:String,
  unique: true,
  required: true,
}

export const requiredObjectId = {
  type: Schema.Types.ObjectId,
  required: true,
}
