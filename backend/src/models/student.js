const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: String,
  scores: {}
})

module.exports = mongoose.model('Student', studentSchema)