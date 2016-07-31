import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

import { uniqueName, requiredObjectId } from '../common/model'


const studentSchema = new mongoose.Schema({
  name: uniqueName,
  group: requiredObjectId,
})
studentSchema.plugin(beautifyUnique)

export default mongoose.model('Student', studentSchema)