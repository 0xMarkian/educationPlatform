import mongoose from 'mongoose'

import basicSchemaCtrls from './index'

const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const groupSchema = new Schema({
  name: String,
  curatorId: ObjectId,
})

groupSchema.statics = basicSchemaCtrls

export default mongoose.model('Group', groupSchema)