import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

import { uniqueName } from '../common/model'


const subjectSchema = new mongoose.Schema({
  name: uniqueName,
})
subjectSchema.plugin(beautifyUnique)

export default mongoose.model('Subject', subjectSchema)
