import mongoose from 'mongoose'

import basicSchemaCtrls from './index'


const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
  name: String,
  groupId: ObjectId,
})

studentSchema.statics = basicSchemaCtrls


export default mongoose.model('Student', studentSchema)