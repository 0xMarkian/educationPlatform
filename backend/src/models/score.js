import mongoose from 'mongoose'

import basicSchemaCtrls from './index'

const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const scoreSchema = new Schema({
  scoreValue: Number,
  studentId: ObjectId,
  courseId: ObjectId,
})

scoreSchema.statics = basicSchemaCtrls

export default mongoose.model('Group', scoreSchema)