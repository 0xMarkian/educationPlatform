import { Schema } from 'mongoose'

export const basicSchemaCtrls = {
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
