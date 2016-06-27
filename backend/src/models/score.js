import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'

const scoreSchema = new mongoose.Schema({
  scoreValue: { type: Number, required: true},
  group: requiredObjectId,
  student: { ...requiredObjectId, ref:'Student'},
  course: { ...requiredObjectId, ref: 'Course'},
})

scoreSchema.statics = basicSchemaCtrls

export default mongoose.model('Score', scoreSchema)