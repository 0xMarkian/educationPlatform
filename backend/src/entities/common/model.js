import { Schema } from 'mongoose'


export const uniqueName = {
  type: String,
  required: [ true, 'Field {PATH} is required'],
  unique: `This name is already taken`,
}

export const requiredObjectId = {
  type: Schema.Types.ObjectId,
  required: true,
}
