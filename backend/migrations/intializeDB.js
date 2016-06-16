import mongoose from 'mongoose'

import Subject from '../src/models/subject'
import Teacher from '../src/models/teacher'

const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}
connectDataBase('mongodb://localhost/educationPlatform')

function createDefaultSubjects(){
  Subject.create('Ukrainian')
  Subject.create('Math')
  Subject.create('English')
  Subject.create('Physics')
}

function createInitialTeachers(){
  Teacher.create('Lesia')
}

createDefaultSubjects()
createInitialTeachers()