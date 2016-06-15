const express = require('express')
const mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId

const Group = require('../models/group')

const groupCtrl = require('../controllers/group')


const groupsRouter = express.Router()
groupsRouter.route('/')
  // ** GET /groups - array of all groups
  .get(groupCtrl.list)

  // ** POST /groups/ - create new group
  .post(groupCtrl.create)



groupsRouter.route('/:id')
  .get(function(req,res){
    Group.findById(req.params.id)
      .populate('students subjects')
      .exec( function(err,group){
        handleError(res)(err)
        res.json(group)
      })
  })
  .post(function(req,res){
    const id = req.params.id
    Group.findById(id, function(err, group){
      if(err) res.send(err)

      const name = req.body.name
      group.name = name

      group.save()
    })
  })
  .delete(function(req,res){
    const id = req.params.id
    Group.remove({_id: id}, function(err){
      if(err) res.send(err)

      res.json({message: 'Succesfully deleted'})
    })
  })

groupsRouter.route('/:id/scores/:student_id')
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
      group.save()
    })
  })

module.exports = groupsRouter