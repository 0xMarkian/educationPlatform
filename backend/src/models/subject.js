import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  name: String,
})

subjectSchema.statics = {
  create(name){
    const newSubject = new this({
      name,
    })
    newSubject.save()

    return newSubject
  }
}

export default mongoose.model('Subject', subjectSchema)
