import { Schema } from 'mongoose'

export const basicSchemaCtrls = {

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