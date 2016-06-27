import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'


const groupSchema = new mongoose.Schema({
  name: String,
  curator: requiredObjectId,
})

groupSchema.statics = basicSchemaCtrls


export default mongoose.model('Group', groupSchema)