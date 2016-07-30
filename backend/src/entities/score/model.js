import mongoose from 'mongoose'

import { requiredObjectId } from '../common/model'

const scoreSchema = new mongoose.Schema({
  scoreValue: { type: Number, required: true},
  group: requiredObjectId,
  student: { ...requiredObjectId, ref:'Student'},
  course: { ...requiredObjectId, ref: 'Course'},
})


export default mongoose.model('Score', scoreSchema)