import mongoose, {Schema} from 'mongoose'

import { uniqueName, requiredObjectId } from '../../lib/model'


const userSchema = new mongoose.Schema({
  name: uniqueName,
  password: String,
})


export default mongoose.model('User', userSchema)