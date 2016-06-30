import mongoose, {Schema} from 'mongoose'

import { uniqueName, requiredObjectId } from '../../lib/model'


const userSchema = new mongoose.Schema({
  name: uniqueName,
  password: String,
  group: { type: Schema.Types.ObjectId, default: null},
})


export default mongoose.model('User', userSchema)