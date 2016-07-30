import mongoose from 'mongoose'

import { uniqueName } from '../common/model'


const subjectSchema = new mongoose.Schema({
  name: uniqueName,
})

export default mongoose.model('Subject', subjectSchema)
