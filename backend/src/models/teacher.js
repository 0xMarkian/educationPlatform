import mongoose from 'mongoose'

import { basicSchemaCtrls, uniqueName } from './utils'

const teacherSchema = new mongoose.Schema({
  name: uniqueName,
})

teacherSchema.statics = basicSchemaCtrls

export default mongoose.model('Teacher', teacherSchema)
