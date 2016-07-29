import mongoose, { Schema } from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

import { uniqueName, requiredObjectId } from '../../lib/model'

const userSchema = new Schema({
  name: uniqueName,
  password: String,
  group: { type: Schema.Types.ObjectId, default: null},
})
userSchema.plugin(beautifyUnique)


const User = mongoose.model('User', userSchema)


export default User