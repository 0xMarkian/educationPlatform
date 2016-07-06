import autobind from 'autobind-decorator'

import Student2Course from '../student2Course/model'
import Student from '../student/model'
import { findCurrUserGroup } from '../user/utils'

import BasicCtrl from '../../lib/ctrl'


class CourseCtrl extends BasicCtrl {
  @autobind
  create(req, res, next){
    const { subject } = req.body,
      { _id: userId } = req.user

    this.Model.create({
      subject,
    }, (err, newCourse) => {
      if(err) return next(err)

      findCurrUserGroup(userId).then( group => {
        Student
          .find({group})
          .select('_id')
          .exec( (err, findedStudents) => {
            if(err) return next(err)

            findedStudents.forEach( student => {
              Student2Course.create({
                group,
                student: student._id,
                course: newCourse._id,
              }, err => {
                if(err) return next(err)
                res.status(201).json(newCourse)
              })
            })
          })
      })
    })
  }
}


export default CourseCtrl