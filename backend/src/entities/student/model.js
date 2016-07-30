import mongoose from 'mongoose'

import { uniqueName, requiredObjectId } from '../common/model'


const studentSchema = new mongoose.Schema({
  name: uniqueName,
  group: requiredObjectId,
})

export default mongoose.model('Student', studentSchema)