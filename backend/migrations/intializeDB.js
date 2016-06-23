import mongoose from 'mongoose'

import { handleError } from '../src/utils'

import Subject from '../src/models/subject'
import Teacher from '../src/models/teacher'
import Student from '../src/models/student'
import Group from '../src/models/group'
import Course from '../src/models/course'
import Score from '../src/models/score'
import StudentToCourse from '../src/models/student2Course'

const mode = 'dev'


const connectDataBase = uri => {
  mongoose.connect(uri)
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ...`);
  })
}
// connectDataBase('mongodb://localhost/educationPlatform')


const string2ObjectInArray = propName => valueArr => valueArr.map( value => ({ [propName] : value}))
const generateName = baseName => mode === 'dev' ? baseName + Math.random() : baseName

const createEntities = Entity => entitieConfigs => entitieConfigs.forEach( config => Entity.create(config)( err => err))


Subject.create( {name:generateName('Math')}, (err, subject) => {
  handleError(err)
  const subjectId = subject._id

  Teacher.create( {name: generateName('Lesia')}, (err, teacher) => {
    handleError(err)
    const teacherId = teacher._id

    Group.create( {name: '11-D', curatorId: teacherId}, (err,group) => {
      handleError(err)
      const groupId = group._id

      Student.create({name: generateName('Stuart'), groupId}, (err, student) => {
        handleError(err)
        const studentId = student._id

        Course.create( { subjectId,}, (err, course) => {
          handleError(err)
          const courseId = course._id
          
          StudentToCourse.create( {studentId, courseId,}, (err) => {
            handleError(err)
          })

          Score.create({ scoreValue: 10, studentId, courseId}, (err) => {
            handleError(err)
          })
        })
      })
    })
  })
})


