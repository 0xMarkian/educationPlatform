const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const groupSchema = new Schema({
  name: String,
  curatorId: ObjectId,
})

module.exports = mongoose.model('Group', groupSchema)