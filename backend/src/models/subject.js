import mongoose from 'mongoose'

import { basicSchemaCtrls, uniqueName } from './utils'


const subjectSchema = new mongoose.Schema({
  name: uniqueName,
})

subjectSchema.statics = basicSchemaCtrls

export default mongoose.model('Subject', subjectSchema)
