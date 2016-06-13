const express = require('express')
const mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId

const Group = require('../models/group')
const Student = require('../models/student')
const Subject = require('../models/subject')


const saveCb = entity => res => err => {
  if(err) res.send(err)
  res.json(entity)
}

const router = express.Router()
router.route('/')
  .put(function(req,res){
    const { name, students, subjects } = req.body

    const group = new Group({
      name,
      students: [],
      subjects: [],
    })

    subjects.forEach( name => {
      const _id = new ObjectId()
      const subject = new Subject({
        _id,
        name,
      })
      group.subjects.push(_id)
      subject.save(function(err){
        console.log('Subject saved')
      })
    })

    students.forEach( name => {
      const _id = new ObjectId()
      const student = new Student({
        _id,
        name,
      })
      group.students.push(_id)
      student.save(function(err){
        console.log('Student saved')
      })
    })

    group.save()
  })
  .get(function(req,res){
    Group.find(function(err, groups){
      if(err) res.send(err)

      res.json(groups)
    })

  })



router.route('/:id')
  .get(function(req,res){
    Group.findById(req.params.id, function(err,group){
      if(err) res.send(err)
      res.json(group)
    })
  })
  .post(function(req,res){
    const id = req.params.id
    Group.findById(id, function(err, group){
      if(err) res.send(err)

      const name = req.body.name
      group.name = name

      group.save(saveCb(group)(res))
    })
  })
  .delete(function(req,res){
    const id = req.params.id
    Group.remove({_id: id}, function(err){
      if(err) res.send(err)

      res.json({message: 'Succesfully deleted'})
    })
  })

router.route('/:id/scores/:student_id')
  .post(function(req,res){
    const { id, student_id } = req.params

    Group.findById(req.params.id, function(err,group){
      if(err) res.send(err)
      const student = group.students.id(student_id)
      student.score = {}
      req.body.forEach( subject => {
        student.score[subject.id] = subject.score
      })
      console.log(group)
      group.save(saveCb(group)(res))
    })
  })

module.exports = router