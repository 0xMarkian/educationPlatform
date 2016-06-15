import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
  name: String,
})

teacherSchema.statics = {
  create(name){
    const newTeacher = new this({
      name,
    })
    newTeacher.save()

    return newTeacher
  }
}

export default mongoose.model('Teacher', teacherSchema)
