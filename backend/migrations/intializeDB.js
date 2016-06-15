import mongoose from 'mongoose'

import Subject from '../src/models/subject'
import Teacher from '../src/models/teacher'

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