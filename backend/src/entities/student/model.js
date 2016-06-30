import mongoose from 'mongoose'

import { uniqueName, requiredObjectId } from '../../lib/model'


const studentSchema = new mongoose.Schema({
  name: uniqueName,
  group: requiredObjectId,
})

export default mongoose.model('Student', studentSchema)