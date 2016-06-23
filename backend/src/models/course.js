import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'

const courseSchema = new mongoose.Schema({
  subjectId: requiredObjectId,
  // teacherId: requiredObjectId,
})
courseSchema.statics = basicSchemaCtrls

export default mongoose.model('Course', courseSchema)