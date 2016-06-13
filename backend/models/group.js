const mongoose = require('mongoose'),
  Schema = mongoose.Schema


const groupSchema = new Schema({
  name: String,
  students: [Schema.Types.ObjectId],
  subjects: [Schema.Types.ObjectId],
})

module.exports = mongoose.model('Group', groupSchema)