import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'

const scoreSchema = new mongoose.Schema({
  scoreValue: { type: Number, required: true},
  studentId: requiredObjectId,
  courseId: requiredObjectId,
})

scoreSchema.statics = basicSchemaCtrls

export default mongoose.model('Score', scoreSchema)