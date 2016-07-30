import mongoose from 'mongoose'

import { requiredObjectId } from '../common/model'


const student2CourseSchema = new mongoose.Schema({
  group: requiredObjectId,
  student: { ...requiredObjectId, ref:'Student'},
  course: { ...requiredObjectId, ref: 'Course'},
})


export default mongoose.model('Student2Course', student2CourseSchema)
