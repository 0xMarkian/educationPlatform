import mongoose, { Schema } from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

import { uniqueName, requiredObjectId } from '../common/model'

const userSchema = new Schema({
  name: uniqueName,
  password: String,
  group: { type: Schema.Types.ObjectId, default: null},
})
userSchema.plugin(beautifyUnique)
userSchema.pre('update', function(next) { this.options.runValidators = true; next() })

export default mongoose.model('User', userSchema)