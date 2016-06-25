import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'

const courseSchema = new mongoose.Schema({
  subject: requiredObjectId,
  // teacher: requiredObjectId,
})
courseSchema.statics = basicSchemaCtrls

export default mongoose.model('Course', courseSchema)