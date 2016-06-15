const Group = require('../models/group')

import { handleError } from '../utils'

class GroupCtrl {
  list(req, res){
      Group
        .find()
        .exec(function(err, groups){
          handleError(res)(err)

          res.json(groups)
        })
  }
  create(req,res){
    const { curatorId } = req.body

    const group = new Group({
      name,
      curatorId,
    })

    group.save(function(err){
      handleError(res)(err)
      res.json(group)
    })
  }
}

const groupCtrl = new GroupCtrl()

module.exports = groupCtrl






function someCode(){
  const { name, students, subjects } = req.body

  const validate = () => {
    Group.find({ name }, (err,docs)=> {
      // if(docs) res.
    })
  }
  validate()

  const group = new Group({
    name,
    students: [],
    subjects: [],
  })

  function createSubjects(){
    subjects.forEach( name => {
      const subject = new Subject({ name })
      group.subjects.push(subject._id)

      subject.save(handleError(res))
    })
  }
  function createStudents(){
    students.forEach( name => {
      const student = new Student({ name })
      group.students.push(student._id)

      student.save(handleError(res))
    })
  }
  createSubjects()
  createStudents()

  group.save(function(err){
    handleError(res)(err)
    res.json(group)
  })
}