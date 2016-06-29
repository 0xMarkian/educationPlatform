import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'


const groupSchema = new mongoose.Schema({
  name: String,
})

groupSchema.statics = basicSchemaCtrls


export default mongoose.model('Group', groupSchema)