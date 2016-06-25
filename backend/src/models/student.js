import mongoose from 'mongoose'

import { basicSchemaCtrls, uniqueName, requiredObjectId } from './utils'


const studentSchema = new mongoose.Schema({
  name: uniqueName,
  group: requiredObjectId,
})

studentSchema.statics = basicSchemaCtrls


export default mongoose.model('Student', studentSchema)