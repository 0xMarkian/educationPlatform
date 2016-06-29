import mongoose from 'mongoose'

import { handleError } from '../src/utils'

import Subject from '../src/models/subject'
import Student from '../src/models/student'
import Group from '../src/models/group'
import Course from '../src/models/course'
import Score from '../src/models/score'
import Student2Course from '../src/models/student2Course'
import User from '../src/models/user'

const mode = 'prod'


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

export default () => {
  Subject.create( {name:generateName('Math')}, (err, subject) => {
    handleError(err)
    const subjectId = subject._id
  

    Group.create( {name: '11-D'}, (err, group) => {
      handleError(err)
      const groupId = group._id

      User.create( {name: generateName('Lesia'), password: 'test', group: groupId}, (err, user) => {
        handleError(err)
        const userId = user._id

        Student.create({name: generateName('Stuart'), group}, (err, student) => {
          handleError(err)
          const studentId = student._id
  
          Course.create( { subject,}, (err, course) => {
            handleError(err)
            const courseId = course._id
            
            Student2Course.create( {group: groupId, student: studentId, course: courseId,}, (err) => {
              handleError(err)
            })
  
            Score.create({ scoreValue: 10, group: groupId, student:studentId, course}, (err) => {
              handleError(err)
            })
          })
        })
      })
    })
  })
}