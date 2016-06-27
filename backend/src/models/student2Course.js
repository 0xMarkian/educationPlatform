import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'


const student2CourseSchema = new mongoose.Schema({
  group: requiredObjectId,
  student: { ...requiredObjectId, ref:'Student'},
  course: { ...requiredObjectId, ref: 'Course'},
})

student2CourseSchema.statics = basicSchemaCtrls

export default mongoose.model('Student2Course', student2CourseSchema)
