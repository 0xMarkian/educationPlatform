import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'


const student2CourseSchema = new mongoose.Schema({
  student: requiredObjectId,
  course: requiredObjectId,
})

student2CourseSchema.statics = basicSchemaCtrls

export default mongoose.model('Student2Course', student2CourseSchema)
