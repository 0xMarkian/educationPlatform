const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const courseSchema = new Schema({
  name: String,
  subjectId: ObjectId,
  teacherId: ObjectId,
})