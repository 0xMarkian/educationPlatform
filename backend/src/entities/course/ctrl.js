import autobind from 'autobind-decorator'

import Student2Course from '../student2Course/model'
import Student from '../student/model'
import { findCurrUserGroup } from '../user/utils'

import Studets2CourseCtrl from '../student2Course/ctrl'


class CourseCtrl extends Studets2CourseCtrl {
  @autobind
  create(req, res, next){
    const { subject } = req.body
    const { _id: userId } = req.user

    findCurrUserGroup(userId).then( group => {
      this.Model.create({
        subject,
        group,
      }, (err, newCourse) => {
        if (err) return next(err)

        Student
          .find({group})
          .select('_id')
          .exec((err, findedStudents) => {
            if (err) return next(err)

            findedStudents.forEach(student => {
              Student2Course.create({
                group,
                student: student._id,
                course: newCourse._id,
              }, err => {
                if (err) return next(err)
                res.status(201).json(newCourse)
              })
            })
          })
      })
    })
  }
}


export default CourseCtrl