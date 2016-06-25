import mongoose from 'mongoose'

import { basicSchemaCtrls, requiredObjectId } from './utils'

const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const groupSchema = new Schema({
  name: String,
  curator: requiredObjectId,
})

groupSchema.statics = basicSchemaCtrls


export default mongoose.model('Group', groupSchema)