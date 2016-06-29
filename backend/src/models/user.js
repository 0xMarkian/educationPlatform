import mongoose, {Schema} from 'mongoose'

import { basicSchemaCtrls, uniqueName, requiredObjectId } from './utils'


const userSchema = new mongoose.Schema({
  name: uniqueName,
  password: String,
  group: { type: Schema.Types.ObjectId, default: null},
})

userSchema.statics = basicSchemaCtrls


export default mongoose.model('User', userSchema)